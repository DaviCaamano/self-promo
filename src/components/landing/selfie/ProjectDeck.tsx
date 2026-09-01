'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/project-deck.module.scss';
import { projectPreviews } from '@components/landing/project-previews';
import { DECK_ATTR, DECK_CARD_ATTR } from '@components/landing/hooks/useCardSilhouette';
import { DECK_OPENING_MS } from '@components/landing/intro';

/** One step of the loop, in seconds, for the delays written onto each card. */
const STEP_SECONDS = DECK_OPENING_MS / 1000;

/**
 * The landing screen's centrepiece: each project's preview turns past the
 * reader in sequence, arriving edge-on and close, swinging square to the
 * screen, then carrying on until it is edge-on again and receding. One card's
 * exit is the next one's entrance, and the sequence restarts after the last.
 *
 * The page lands on the first preview alone, square to the reader, and it turns
 * away by itself with nothing arriving behind it. Only that once: when it has
 * gone the deck falls into its loop, the second preview starts arriving on the
 * very next frame, and from there every exit overlaps the next entrance.
 *
 * Hidden from assistive technology. It is the Projects section's own artwork on
 * a loop, and that section names, describes and links every one of them — read
 * out here it would be five unlabelled images ahead of the page's first
 * heading, announced in an order that keeps changing.
 */
export const ProjectDeck = () => {
  const [turning, setTurning] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setTurning(true), DECK_OPENING_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    /* Marked rather than styled: the caption's dark copy is clipped to whatever
       shape these cards are making, and the hook that measures them cannot see a
       CSS module's hashed class names. */
    <div className={styles.deck} {...{ [DECK_ATTR]: '' }} data-turning={turning} aria-hidden>
      {projectPreviews.map(({ id, lg }, index) => (
        <div
          key={id}
          className={styles.card}
          {...{ [DECK_CARD_ATTR]: id }}
          /**
           * The delay, as a plain value rather than a custom property the
           * stylesheet multiplies out. Its place in the cadence, not in the
           * deck: the first card has just left on its own, so it drops to the
           * back and the rest each move up one.
           *
           * Only once the loop starts — during the opening the first card runs
           * its solo exit, and a delay here would hold that back too.
           */
          style={
            turning
              ? { animationDelay: `${((index + projectPreviews.length - 1) % projectPreviews.length) * STEP_SECONDS}s` }
              : undefined
          }
        >
          <Image
            src={lg}
            alt={''}
            className={styles.art}
            fill
            sizes={'(min-width: 480px) 30rem, 20rem'}
            /* Eager, every one of them. A card spends most of the loop turned
               edge-on, which is zero area on screen and so never trips a lazy
               loader — the first turn would show an empty frame. */
            loading={'eager'}
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
};
