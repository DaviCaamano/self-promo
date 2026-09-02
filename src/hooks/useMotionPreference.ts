'use client';
import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';
const STORAGE_KEY = 'play-motion';

/**
 * Whether this device has asked to be spared motion.
 *
 * Watched rather than read once, because the setting can be changed while the
 * page is open — and false until the first effect, so the server and the first
 * client render agree.
 */
export const useReducedMotion = () => {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    const query = matchMedia(QUERY);
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
};

/**
 * Whether the reader has asked for the motion back anyway.
 *
 * The device preference wins by default, and this is the way out of it for
 * someone who wants the animation regardless — a phone left on "remove
 * animations" for battery, say. Remembered, so the choice is made once.
 */
export const usePlayMotion = () => {
  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => setPlay(localStorage.getItem(STORAGE_KEY) === 'true'), []);

  const choose = (next: boolean) => {
    setPlay(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  };

  return [play, choose] as const;
};
