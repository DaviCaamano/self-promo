'use client';
import { useRef } from 'react';
import styles from '../styles/selfie.module.scss';
import { Section, sectionIds } from '@components/landing/landing.interface';
import { ProjectDeck } from '@components/landing/selfie/ProjectDeck';
import { Greeting } from '@components/landing/selfie/Greeting';
import { JobTitle } from '@components/landing/selfie/JobTitle';
// Hidden for now, along with its use below — restore both to bring the hand back.
// import { Wave } from '@components/landing/selfie/Wave';
import { Socials } from '@components/landing/selfie/Socials';
import { PullQuote } from '@components/landing/selfie/PullQuote';
import { ScrollCue } from '@components/landing/selfie/ScrollCue';
import { useCardSilhouette } from '@components/landing/hooks/useCardSilhouette';
import { Project } from '@components/landing/landing.interface';

/**
 * The one preview dark enough to need light lettering rather than dark. Quelliv
 * is a photograph across its middle, which is where the job title's first two
 * lines land; the third crosses onto the white panel below it and stays dark
 * like every other card's.
 */
const DARK_ARTWORK = [Project.quelliv] as const;
const LINES_OVER_DARK_ARTWORK = [0, 1];

interface SelfieProps {
  isLandscape: boolean;
  onScrollDown: () => void;
  onShowLetter: (id: string) => void;
}
export const Selfie = ({ isLandscape, onScrollDown, onShowLetter }: SelfieProps) => {
  const silhouette = useRef<HTMLDivElement>(null);
  useCardSilhouette(silhouette);

  const overDarkArtwork = useRef<HTMLDivElement>(null);
  useCardSilhouette(overDarkArtwork, DARK_ARTWORK);

  return (
    // Carries `landscape` too: the pull quote is sized against the stage,
    // whose width follows a different ladder in that orientation.
    <div id={sectionIds[Section.socials]} className={`${styles.selfie} ${isLandscape && styles.landscape}`}>
      <div className={`${styles.responsive} ${isLandscape && styles.landscape}`}>
        {/* Square stage the whole composition is measured against: the deck is
            centred in it and the caption and job title are placed as fractions
            of it, so the arrangement holds at every breakpoint. */}
        <div className={`${styles.stage} ${isLandscape && styles.landscape}`}>
          <ProjectDeck />
          <Greeting isLandscape={isLandscape} />
          <JobTitle isLandscape={isLandscape} />
          {/* The caption a second time in dark, clipped to whatever shape the
              cards are making, and painted over the light copy underneath. It
              is the same words twice, so it is kept out of the accessibility
              tree entirely. */}
          <div ref={silhouette} className={styles.silhouette} aria-hidden>
            <Greeting isLandscape={isLandscape} tone={'text-void'} />
            <JobTitle isLandscape={isLandscape} tone={'text-void'} />
          </div>
          {/* And a third time in white, clipped to the one card whose artwork is
              too dark for the copy above to be read against. Last, so it covers
              that copy for the lines it carries. */}
          <div ref={overDarkArtwork} className={styles.silhouette} aria-hidden>
            <JobTitle isLandscape={isLandscape} tone={'text-latte'} inked={LINES_OVER_DARK_ARTWORK} />
          </div>
          {/* Hidden on purpose while we see whether the page reads cleaner
              without it — put this back to restore the waving hand. */}
          {/* <Wave isLandscape={isLandscape} /> */}
        </div>
      </div>
      <PullQuote onShowLetter={onShowLetter} />
      <Socials isLandscape={isLandscape} />
      <ScrollCue onScrollDown={onScrollDown} />
    </div>
  );
};
