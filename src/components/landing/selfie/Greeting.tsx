import styles from '../styles/greeting.module.scss';
import stage from '../styles/selfie.module.scss';

interface GreetingsProps {
  isLandscape: boolean;
}
export const Greeting = ({ isLandscape }: GreetingsProps) => (
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
/** Same rule as the job title: both copies render identical text at identical
 *  metrics, and only colour and clip differ, or the seam doubles. */
const Copy = ({ isLandscape, tone, clipped }: CopyProps) => (
  <div className={`${stage.layer}${clipped ? ` ${stage.clipped}` : ''}`}>
    <div className={`${styles.greeting} ${isLandscape && styles.landscape} ${tone}`}>It&apos;s Me, Davi</div>
  </div>
);
