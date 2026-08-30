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
import { Project, Section, sectionIds } from '@components/landing/landing.interface';
import { useIsLandscape } from '@hooks/mobile/useIsLandscape';
import { letterAnchorId } from '@components/landing/letters';
import { LANDING_INTRO_ENDS_MS, SECTION_REVEAL_ENDS_MS } from '@components/landing/intro';

interface LandingProps {
  /** Section the requested route opens the page scrolled to. */
  initialSection: Section;
  isMobile: boolean;
}
export const Landing = ({ initialSection, isMobile }: LandingProps) => {
  const isLandscape = useIsLandscape(isMobile);

  /**
   * The nav arrives last, once whatever the page opened on has finished. On the
   * landing route that is the whole opening sequence; on a deep link it is only
   * the one section, which reveals as soon as the page lands on it.
   */
  const navIntroDelayMs =
    initialSection === Section.socials ? LANDING_INTRO_ENDS_MS : SECTION_REVEAL_ENDS_MS;
  const active = useActiveSection(initialSection);

  /** Which letter card the About section should flash, set by the landing quote. */
  const [highlighted, setHighlighted] = useState<string | undefined>(undefined);

  /** Which project the Projects section should flash, set by an Experience entry. */
  const [flashedProject, setFlashedProject] = useState<Project | undefined>(undefined);

  const showProject = (project: Project) => {
    document.getElementById(project)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    /* Cleared before it is set again so a second jump to the same project
       replays the flash — React would otherwise leave the class in place and
       the animation would never restart. The re-set goes in a fresh task so
       React commits the removal first; a rAF would tie it to a frame, which a
       backgrounded tab never delivers. */
    setFlashedProject(undefined);
    setTimeout(() => setFlashedProject(project), 0);
  };

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
      <Experience onShowProject={showProject} />
      <Projects flashed={flashedProject} setFlashed={setFlashedProject} />

      <SideNav active={active} isMobile={isMobile} introDelayMs={navIntroDelayMs} onSelect={scrollToSection} />
      <MobileNav active={active} introDelayMs={navIntroDelayMs} onSelect={scrollToSection} />
    </div>
  );
};
