import Image from 'next/image';
import { CSSProperties } from 'react';
import styles from '../styles/project-deck.module.scss';
import { projectPreviews } from '@components/landing/project-previews';
import { DECK_ATTR, DECK_CARD_ATTR } from '@components/landing/hooks/useCardSilhouette';

/**
 * The landing screen's centrepiece: each project's preview turns past the
 * reader in sequence, arriving edge-on and close, swinging square to the
 * screen, then carrying on until it is edge-on again and receding. One card's
 * exit is the next one's entrance, and the sequence restarts after the last.
 *
 * Hidden from assistive technology. It is the Projects section's own artwork on
 * a loop, and that section names, describes and links every one of them — read
 * out here it would be five unlabelled images ahead of the page's first
 * heading, announced in an order that keeps changing.
 */
export const ProjectDeck = () => (
  /* Marked rather than styled: the caption's dark copy is clipped to whatever
     shape these cards are making, and the hook that measures them cannot see a
     CSS module's hashed class names. */
  <div className={styles.deck} {...{ [DECK_ATTR]: '' }} aria-hidden>
    {projectPreviews.map(({ id, lg }, index) => (
      <div key={id} className={styles.card} {...{ [DECK_CARD_ATTR]: '' }} style={{ '--i': index } as CSSProperties}>
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
