'use client';
import { RefObject, useEffect, useRef } from 'react';

/**
 * Plays each piece of a section as it reaches the viewport, rather than the
 * whole section the moment its top edge does. Projects is several screens tall,
 * so one trigger ran the entire stagger while most of the cards were still
 * below the fold and the reader arrived to find them already settled.
 *
 * One observer per section watching every piece that carries the reveal class,
 * rather than a hook per card: the sections stay plain markup, and passing the
 * class in keeps this off the hashed name CSS modules actually emit.
 *
 * Each element is unobserved once it has arrived — a piece that replayed every
 * time it scrolled past would read as a glitch, and on the way back up it would
 * play while the reader is already looking at it.
 */
export const useScrollReveal = <T extends HTMLElement>(revealClass: string): RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.getElementsByClassName(revealClass));
    if (!items.length) return;

    /* The held state hides these until something says otherwise, so a browser
       without the observer has to be shown everything rather than nothing. */
    if (typeof IntersectionObserver === 'undefined') {
      items.forEach((item) => item.setAttribute('data-revealed', 'true'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-revealed', 'true');
          observer.unobserve(entry.target);
        });
      },
      /* No insets and no threshold: a piece arrives the moment any part of it
         would be on screen, so its entrance starts with it rather than a tenth
         of a screen later. */
      { rootMargin: '0px', threshold: 0 },
    );

    items.forEach((item) => observer.observe(item));

    /**
     * A held piece is only hidden by opacity, so its buttons and links are still
     * focusable while invisible. Tab can therefore reach one before the observer
     * has caught up, and the focus ring would land on nothing anyone can see.
     * Revealing the piece the focus is inside closes that gap.
     */
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const piece = items.find((item) => item.contains(target));
      if (piece) piece.setAttribute('data-revealed', 'true');
    };

    root.addEventListener('focusin', onFocusIn);

    return () => {
      observer.disconnect();
      root.removeEventListener('focusin', onFocusIn);
    };
  }, [revealClass]);

  return ref;
};
