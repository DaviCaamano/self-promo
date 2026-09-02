'use client';
import { Play, Pause } from 'phosphor-react';
import styles from '../styles/motion-toggle.module.scss';

interface MotionToggleProps {
  onChange: (play: boolean) => void;
  play: boolean;
}

/**
 * The way back into the animation for a device that has asked not to have it.
 *
 * Shown only when that preference is set, so it is not clutter for everyone
 * else. The deck turns for as long as the page is open and has no other pause,
 * which is exactly the case the preference exists for — so it stays honoured by
 * default and this is an opt in, never the reverse.
 */
export const MotionToggle = ({ onChange, play }: MotionToggleProps) => (
  <button
    type={'button'}
    className={styles.toggle}
    onClick={() => onChange(!play)}
    aria-pressed={play}
    /* Says what pressing it does, rather than what state it is in — the label
       and `aria-pressed` together would otherwise contradict each other. */
    aria-label={play ? 'Stop the preview animation' : 'Play the preview animation'}
  >
    {play ? <Pause weight={'fill'} /> : <Play weight={'fill'} />}
    <span>{play ? 'Stop animation' : 'Play animation'}</span>
  </button>
);
