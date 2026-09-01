'use client';
import { useRef } from 'react';
import styles from '../styles/selfie.module.scss';
import { Greeting } from '@components/landing/selfie/Greeting';
import { JobTitle } from '@components/landing/selfie/JobTitle';
import { useCardSilhouette } from '@components/landing/hooks/useCardSilhouette';
import { Project } from '@components/landing/landing.interface';

interface LightCaptionProps {
  /** Paint the name light over this card as well as the lines. */
  greeting?: boolean;
  /** Job title lines to paint. Omit for all of them, empty for none. */
  inked?: number[];
  isLandscape: boolean;
  /** The one preview this copy is clipped to. */
  project: Project;
}

/**
 * The caption once more in white, clipped to a single card.
 *
 * Most previews are light artwork the dark copy reads well against. A few are
 * photographs, and dark lettering disappears into them — so each of those gets
 * its own copy of whichever pieces land on the dark part, painted last so it
 * covers the dark copy for exactly those pieces and nowhere else.
 *
 * One component per card rather than one layer for all of them: a clip takes a
 * single path, and no two of these want the same pieces.
 */
export const LightCaption = ({ greeting, inked, isLandscape, project }: LightCaptionProps) => {
  const layer = useRef<HTMLDivElement>(null);
  useCardSilhouette(layer, project);

  return (
    <div ref={layer} className={styles.silhouette} aria-hidden>
      {greeting && <Greeting isLandscape={isLandscape} tone={'text-latte'} />}
      <JobTitle isLandscape={isLandscape} tone={'text-latte'} inked={inked} />
    </div>
  );
};
