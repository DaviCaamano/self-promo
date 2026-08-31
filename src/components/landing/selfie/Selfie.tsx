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

interface SelfieProps {
  isLandscape: boolean;
  onScrollDown: () => void;
  onShowLetter: (id: string) => void;
}
export const Selfie = ({ isLandscape, onScrollDown, onShowLetter }: SelfieProps) => {
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
          {/* Inside the stage, not the column below it: the stage is what the
              artwork is measured against, so the name stays glued under it at
              every breakpoint instead of drifting with the scale. */}
          <h1 className={styles.name}>Davi Caamano</h1>
          <Greeting isLandscape={isLandscape} />
          <JobTitle isLandscape={isLandscape} />
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
