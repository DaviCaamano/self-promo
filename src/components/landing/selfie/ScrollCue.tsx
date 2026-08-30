'use client';
import { useEffect, useState } from 'react';
import { CaretDown } from 'phosphor-react';
import { Section, sectionIds } from '@components/landing/landing.interface';
import { LANDING_INTRO_ENDS_MS } from '@components/landing/intro';
import styles from '../styles/scroll-cue.module.scss';

/** Two seconds past the sequence, so it reads as an offer to a reader who has
 *  stopped rather than as the last beat of the intro. */
const APPEAR_AFTER_MS = LANDING_INTRO_ENDS_MS + 2000;

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
    const about = document.getElementById(sectionIds[Section.about]);
    if (!about) return;

    /**
     * Watches the section it points at rather than the scroll position: the
     * landing screen is a whole viewport tall at minimum but can be taller, so
     * "scrolled at all" and "the next section is showing" are not the same
     * moment. A zero threshold makes this the instant any of About appears.
     */
    const observer = new IntersectionObserver(([entry]) => setTaken(entry.isIntersecting), { threshold: 0 });
    observer.observe(about);
    return () => observer.disconnect();
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
      <CaretDown weight={'bold'} />
    </button>
  );
};
