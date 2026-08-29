import { CSSProperties } from 'react';
import styles from '../styles/job-title.module.scss';
import stage from '../styles/selfie.module.scss';

const LINES = ['[Web]', '[Mobile]', '[Fullstack]'];

interface JobTitleProps {
  isLandscape: boolean;
}
export const JobTitle = ({ isLandscape }: JobTitleProps) => (
  <>
    <Copy isLandscape={isLandscape} tone={'text-sea'} />
    <Copy isLandscape={isLandscape} tone={'text-void'} clipped />
  </>
);

interface CopyProps {
  isLandscape: boolean;
  tone: string;
  /** Paints this copy only inside the portrait's circle. */
  clipped?: boolean;
}
/** The two copies have to render identical text at identical metrics — only
 *  the colour and the clip may differ. Any divergence shows up as a doubled
 *  glyph right on the circle's edge, which is the one place anyone looks. */
const Copy = ({ isLandscape, tone, clipped }: CopyProps) => (
  <div className={`${stage.layer}${clipped ? ` ${stage.clipped}` : ''}`}>
    <div className={`${styles.jobTitle} ${isLandscape && styles.landscape} ${tone}`}>
      {LINES.map((label, index) => (
        <div key={label} className={styles.line} style={{ '--i': index } as CSSProperties}>
          {label}
        </div>
      ))}
    </div>
  </div>
);
