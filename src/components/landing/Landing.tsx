'use client';
import { useEffect, useState } from 'react';
import { Selfie } from '@components/landing/selfie/Selfie';
import { AboutMe } from '@components/landing/AboutMe';
import { Experience } from '@components/landing/Experience';
import { Projects } from '@components/landing/Projects';
import { Technologies } from '@components/landing/Technologies';
import { SideNav } from '@components/landing/navbar/SideNav';
import { MobileNav } from '@components/landing/navbar/MobileNav';
import { scrollToSection, useActiveSection } from '@components/landing/hooks/useActiveSection';
import { Section, sectionIds } from '@components/landing/landing.interface';
import { useIsLandscape } from '@hooks/mobile/useIsLandscape';
import { letterAnchorId } from '@components/landing/letters';

interface LandingProps {
  /** Section the requested route opens the page scrolled to. */
  initialSection: Section;
  isMobile: boolean;
}
export const Landing = ({ initialSection, isMobile }: LandingProps) => {
  const isLandscape = useIsLandscape(isMobile);
  const active = useActiveSection(initialSection);

  /** Which letter card the About section should flash, set by the landing quote. */
  const [highlighted, setHighlighted] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (initialSection === Section.socials) return;

    /* Jumped, not glided: the page has only just appeared, so there is nothing
       yet for a smooth scroll to read as movement through. It has to be
       `instant` — `auto` defers to the stylesheet, which sets scroll-behavior
       to smooth for the whole document. */
    document.getElementById(sectionIds[initialSection])?.scrollIntoView({ behavior: 'instant', block: 'start' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showLetter = (id: string) => {
    setHighlighted(id);
    document.getElementById(letterAnchorId(id))?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    /* Left padding clears the fixed rail, so the sections centre in the space
       beside it rather than sliding underneath. */
    <div id={'landing'} className={'w-full md:pl-[4.5rem]'}>
      <Selfie
        isLandscape={isLandscape}
        onScrollDown={() => scrollToSection(Section.about)}
        onShowLetter={showLetter}
      />
      <AboutMe highlighted={highlighted} setHighlighted={setHighlighted} />
      <Technologies />
      <Experience />
      <Projects />

      <SideNav active={active} isMobile={isMobile} onSelect={scrollToSection} />
      <MobileNav active={active} onSelect={scrollToSection} />
    </div>
  );
};
