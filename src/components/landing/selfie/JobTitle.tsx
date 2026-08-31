import { CSSProperties } from 'react';
import styles from '../styles/job-title.module.scss';
import stage from '../styles/selfie.module.scss';

const LINES = ['[Web]', '[Mobile]', '[Fullstack]'];

interface JobTitleProps {
  isLandscape: boolean;
}
/**
 * Drawn once, in one colour — same reason as the greeting: the second, dark
 * copy existed only to turn these lines dark where they crossed the portrait's
 * white circle, and that circle is gone.
 */
export const JobTitle = ({ isLandscape }: JobTitleProps) => (
  <div className={stage.layer}>
    <div className={`${styles.jobTitle} ${isLandscape && styles.landscape} text-sea`}>
      {LINES.map((label, index) => (
        <div key={label} className={styles.line} style={{ '--i': index } as CSSProperties}>
          {label}
        </div>
      ))}
    </div>
  </div>
);
