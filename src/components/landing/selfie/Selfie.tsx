import styles from '../styles/selfie.module.scss';
import { Section, sectionIds } from '@components/landing/landing.interface';
import { Portrait } from '@components/landing/selfie/Portrait';
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
    // Carries `landscape` too: the pull quote is sized against the portrait,
    // whose width follows a different ladder in that orientation.
    <div id={sectionIds[Section.socials]} className={`${styles.selfie} ${isLandscape && styles.landscape}`}>
      <div className={`${styles.responsive} ${isLandscape && styles.landscape}`}>
        {/* Square stage matching the portrait's own canvas. Everything that
            has to line up with the drawn circle is positioned inside it, so
            the clip can be written once as a fraction of this box. */}
        <div className={`${styles.stage} ${isLandscape && styles.landscape}`}>
          <Portrait />
          {/* Inside the stage, not the column below it: the stage is what the
              artwork is measured against, so the name stays glued under the
              circle at every breakpoint instead of drifting with the scale. */}
          <span className={styles.name}>Davi Caamano</span>
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
