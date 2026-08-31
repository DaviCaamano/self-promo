import styles from '../styles/greeting.module.scss';
import stage from '../styles/selfie.module.scss';

interface GreetingsProps {
  isLandscape: boolean;
  /** The copy painted over the cards, in place of the one under them. */
  dark?: boolean;
}

/**
 * The page's one h1, sitting over the stage.
 *
 * Drawn twice and stacked: this light copy, and a dark one the silhouette layer
 * clips to the turning cards, so a letter crossing a card's edge changes colour
 * mid-stroke. Both copies render identical text at identical metrics and run
 * the same animation on the same delay — anything that differs but the colour
 * shows up as a doubled glyph right on the edge, which is where the eye goes.
 *
 * Only the light copy is the heading. The dark one is the same words a second
 * time, and a screen reader announcing the name twice is worse than the seam it
 * exists to hide.
 */
export const Greeting = ({ isLandscape, dark }: GreetingsProps) => {
  const Text = dark ? 'div' : 'h1';

  return (
    <div className={stage.layer}>
      <Text className={`${styles.greeting} ${isLandscape && styles.landscape} ${dark ? 'text-void' : 'text-sea'}`}>
        Davi Caamano
      </Text>
    </div>
  );
};
