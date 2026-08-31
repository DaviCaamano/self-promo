'use client';
import Image from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';
import styles from '../styles/project-deck.module.scss';
import { projectPreviews } from '@components/landing/project-previews';
import { DECK_ATTR, DECK_CARD_ATTR } from '@components/landing/hooks/useCardSilhouette';
import { LANDING_INTRO_ENDS_MS } from '@components/landing/intro';

/** A second past the page's own opening, so the first preview is there to be
 *  read while the rest of the screen is still arriving. */
const TURN_STARTS_MS = LANDING_INTRO_ENDS_MS + 1000;

/**
 * The landing screen's centrepiece: each project's preview turns past the
 * reader in sequence, arriving edge-on and close, swinging square to the
 * screen, then carrying on until it is edge-on again and receding. One card's
 * exit is the next one's entrance, and the sequence restarts after the last.
 *
 * It opens on the first preview held square to the reader instead of mid-turn,
 * so the page lands on something legible. When the wait is up that card is
 * already where its turn would have put it — the animation starts a step in,
 * by way of a negative delay — so it carries straight on into leaving without
 * a jump, and the second card arrives behind it as usual.
 *
 * Hidden from assistive technology. It is the Projects section's own artwork on
 * a loop, and that section names, describes and links every one of them — read
 * out here it would be five unlabelled images ahead of the page's first
 * heading, announced in an order that keeps changing.
 */
export const ProjectDeck = () => {
  const [turning, setTurning] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setTurning(true), TURN_STARTS_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    /* Marked rather than styled: the caption's dark copy is clipped to whatever
       shape these cards are making, and the hook that measures them cannot see a
       CSS module's hashed class names. */
    <div className={styles.deck} {...{ [DECK_ATTR]: '' }} data-turning={turning} aria-hidden>
      {projectPreviews.map(({ id, lg }, index) => (
        <div key={id} className={styles.card} {...{ [DECK_CARD_ATTR]: id }} style={{ '--i': index } as CSSProperties}>
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
