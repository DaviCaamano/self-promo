'use client';
import { useRef } from 'react';
import styles from '../styles/selfie.module.scss';
import { JobTitle } from '@components/landing/selfie/JobTitle';
import { useCardSilhouette } from '@components/landing/hooks/useCardSilhouette';
import { Project } from '@components/landing/landing.interface';

interface LightCaptionProps {
  /** Lines to paint. Omit for all of them. */
  inked?: number[];
  isLandscape: boolean;
  /** The one preview this copy is clipped to. */
  project: Project;
}

/**
 * The job title once more in white, clipped to a single card.
 *
 * Most previews are light artwork the dark copy reads well against. A few are
 * photographs, and dark lettering disappears into them — so each of those gets
 * its own copy of the lines that land on the dark part, painted last so it
 * covers the dark copy underneath for exactly those lines and nowhere else.
 *
 * One component per card rather than one layer for all of them: a clip takes a
 * single path, and these need different lines inked from each other.
 */
export const LightCaption = ({ inked, isLandscape, project }: LightCaptionProps) => {
  const layer = useRef<HTMLDivElement>(null);
  useCardSilhouette(layer, project);

  return (
    <div ref={layer} className={styles.silhouette} aria-hidden>
      <JobTitle isLandscape={isLandscape} tone={'text-latte'} inked={inked} />
    </div>
  );
};
