'use client';
import { useEffect, useState } from 'react';
import { Section, SECTIONS, sectionIds, sectionRoutes } from '@components/landing/landing.interface';

/**
 * Which section the reader is looking at, and the address bar kept in step with
 * it.
 *
 * The observer's root is squeezed to a thin band across the middle of the
 * viewport, so a section only counts once it reaches the centre of the screen.
 * Sections are a screen tall apiece, which means at most one can be in that
 * band at a time and the nav never flickers between two of them.
 */
export const useActiveSection = (initial: Section) => {
  const [active, setActive] = useState<Section>(initial);

  useEffect(() => {
    const observed = SECTIONS.map((section) => ({ section, element: document.getElementById(sectionIds[section]) }));

    /**
     * Which sections currently reach the band, kept as a set rather than read
     * off each callback: a batch only carries the sections that just changed,
     * and two of them can be in the band at once on the boundary between the
     * two. Resolving through page order makes the winner the same every time,
     * where trusting the entry order let the section being left behind win.
     */
    const inBand = new Set<Section>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const match = observed.find(({ element }) => element === entry.target);
          if (!match) return;
          if (entry.isIntersecting) inBand.add(match.section);
          else inBand.delete(match.section);
        });

        const first = SECTIONS.find((section) => inBand.has(section));
        if (first !== undefined) setActive(first);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );

    observed.forEach(({ element }) => element && observer.observe(element));

    /* The band can miss the top of the page on a short landing screen, and
       being scrolled to the very top is unambiguous anyway. */
    const onScroll = () => window.scrollY === 0 && setActive(SECTIONS[0]);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    /**
     * Swapping the path rather than navigating to it: a router push would
     * remount the page and throw away the reader's scroll position.
     */
    const route = sectionRoutes[active];
    if (window.location.pathname !== route) window.history.replaceState(null, '', route);
  }, [active]);

  return active;
};

/** Used by the nav and by the landing quote's jump into the letters. */
export const scrollToSection = (section: Section) =>
  document.getElementById(sectionIds[section])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
