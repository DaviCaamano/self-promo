import { CSSProperties } from 'react';
import styles from '../styles/job-title.module.scss';
import stage from '../styles/selfie.module.scss';

const LINES = ['[Web]', '[Mobile]', '[Fullstack]'];

interface JobTitleProps {
  isLandscape: boolean;
  /** The copy painted over the cards, in place of the one under them. */
  dark?: boolean;
}

/**
 * Drawn twice for the same reason as the greeting: a light copy against the
 * page and a dark one clipped to the cards, so these lines stay legible over
 * whichever preview is turning behind them. The two must match in everything
 * but colour — a given line uses the same index in both, or its light and dark
 * halves slide apart mid-stagger.
 */
export const JobTitle = ({ isLandscape, dark }: JobTitleProps) => (
  <div className={stage.layer}>
    <div className={`${styles.jobTitle} ${isLandscape && styles.landscape} ${dark ? 'text-void' : 'text-sea'}`}>
      {LINES.map((label, index) => (
        <div key={label} className={styles.line} style={{ '--i': index } as CSSProperties}>
          {label}
        </div>
      ))}
    </div>
  </div>
);
