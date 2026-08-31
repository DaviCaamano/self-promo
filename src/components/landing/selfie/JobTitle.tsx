import { CSSProperties } from 'react';
import styles from '../styles/job-title.module.scss';
import stage from '../styles/selfie.module.scss';

const LINES = ['[Web]', '[Mobile]', '[Fullstack]'];

interface JobTitleProps {
  isLandscape: boolean;
  /** Text colour class. Defaults to the light copy that sits under the cards. */
  tone?: string;
  /**
   * Which lines carry ink. The rest still render, blank, because this block is
   * centred on its own height — drop a line and every other one moves off the
   * copy underneath.
   */
  inked?: number[];
}

/**
 * Drawn more than once and stacked: a light copy against the page, and copies
 * over the cards clipped to them, so these lines stay legible over whichever
 * preview is turning behind them. Every copy must match in all but colour — a
 * given line uses the same index in each, or its halves slide apart mid-stagger.
 */
export const JobTitle = ({ isLandscape, tone = 'text-sea', inked }: JobTitleProps) => (
  <div className={stage.layer}>
    <div className={`${styles.jobTitle} ${isLandscape && styles.landscape} ${tone}`}>
      {LINES.map((label, index) => (
        <div
          key={label}
          className={`${styles.line} ${inked && !inked.includes(index) ? styles.blank : ''}`}
          style={{ '--i': index } as CSSProperties}
        >
          {label}
        </div>
      ))}
    </div>
  </div>
);
