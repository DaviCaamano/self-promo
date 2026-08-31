import styles from '../styles/greeting.module.scss';
import stage from '../styles/selfie.module.scss';

interface GreetingsProps {
  isLandscape: boolean;
}
/**
 * Drawn once, in one colour. It used to be two stacked copies with the dark one
 * clipped to the portrait's circle, so the line turned dark where it crossed
 * onto the white artwork. There is no circle behind it any more, and a dark
 * copy over the page would just be unreadable.
 */
export const Greeting = ({ isLandscape }: GreetingsProps) => (
  <div className={stage.layer}>
    <div className={`${styles.greeting} ${isLandscape && styles.landscape} text-sea`}>It&apos;s Me, Davi</div>
  </div>
);
