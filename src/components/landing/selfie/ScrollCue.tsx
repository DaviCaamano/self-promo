'use client';
import { useEffect, useState } from 'react';
import { LANDING_INTRO_ENDS_MS, NAV_INTRO_MS } from '@components/landing/intro';
import styles from '../styles/scroll-cue.module.scss';

/** Two seconds past the last thing on the page to move, the nav rail included,
 *  so it reads as an offer to a reader who has stopped rather than as the
 *  intro's own last beat. */
const APPEAR_AFTER_MS = LANDING_INTRO_ENDS_MS + NAV_INTRO_MS + 2000;

interface ScrollCueProps {
  onScrollDown: () => void;
}

/**
 * The nudge that there is more page below. It waits out the landing sequence
 * before appearing, and leaves the moment the reader takes the hint.
 */
export const ScrollCue = ({ onScrollDown }: ScrollCueProps) => {
  const [due, setDue] = useState<boolean>(false);
  const [taken, setTaken] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setDue(true), APPEAR_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    /**
     * The first scroll takes it, and it does not come back until the page is
     * loaded again. It used to watch the About section and follow it both ways,
     * so scrolling back to the top brought the cue with it — which is an offer
     * to do something the reader has already done.
     */
    const onScroll = () => setTaken(true);
    window.addEventListener('scroll', onScroll, { once: true, passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shown = due && !taken;

  return (
    <button
      type={'button'}
      onClick={onScrollDown}
      className={styles.cue}
      data-shown={shown}
      aria-label={'Scroll to About Me'}
      /* Out of the tab order while hidden, so it is never a stop that focuses
         something the reader cannot see. */
      tabIndex={shown ? undefined : -1}
    >
      <ScrollMouse />
    </button>
  );
};

/**
 * A mouse drawn in outline, with its wheel running down the body on a loop —
 * the gesture the page is asking for, rather than a generic arrow.
 *
 * Hand drawn rather than taken from the icon set: the wheel has to be its own
 * element for the animation to move it independently of the shell.
 */
const ScrollMouse = () => (
  <svg className={styles.mouse} viewBox={'0 0 28 44'} fill={'none'} aria-hidden focusable={'false'}>
    <rect x={1} y={1} width={26} height={42} rx={13} stroke={'currentColor'} strokeWidth={1.5} />
    <line
      className={styles.wheel}
      x1={14}
      y1={11}
      x2={14}
      y2={16}
      stroke={'currentColor'}
      strokeWidth={4}
      strokeLinecap={'round'}
    />
  </svg>
);
