'use client';
import { useSyncExternalStore } from 'react';

export enum MobileOrientation {
  landscape = 'landscape',
  portrait = 'portrait',
}

const subscribe = (onChange: () => void) => {
  window.addEventListener('orientationchange', onChange);
  return () => window.removeEventListener('orientationchange', onChange);
};

const getOrientation = () => window.screen?.orientation?.type ?? '';

/** Nothing is known about the screen while rendering on the server, and an
 *  empty string is not a landscape one, so the first paint reads as portrait. */
const getServerOrientation = () => '';

/**
 * Whether this is a phone held sideways.
 *
 * `useSyncExternalStore` rather than state kept in sync by an effect. The
 * previous version rebuilt its listener on every render and then listed it as a
 * dependency, so the effect tore the listener down and put it back each time,
 * and a second effect copied the orientation into state — a setState during an
 * effect, which is the cascading render React warns about. This is what the
 * hook is for: subscribe, read, and let React handle the server snapshot.
 */
export const useIsLandscape = (isMobile: boolean) => {
  const orientation = useSyncExternalStore(subscribe, getOrientation, getServerOrientation);

  return isMobile && orientation.startsWith(MobileOrientation.landscape);
};
