'use client';
import { RefObject, useEffect } from 'react';

/** Set by the deck on its root and on every card, so this can find them without
 *  either side importing the other's hashed CSS module class names. */
export const DECK_ATTR = 'data-deck';
export const DECK_CARD_ATTR = 'data-deck-card';

/**
 * Clips an element to the silhouette of the turning cards.
 *
 * The caption over the stage is drawn twice: a light copy underneath, and a
 * dark copy on top clipped by this to exactly where a card is. A letter that
 * crosses a card's edge therefore changes colour mid-stroke, staying legible
 * against the page on one side and against the artwork on the other.
 *
 * The old portrait let this be one static `clip-path: circle()`. A turning card
 * is a rectangle under perspective, so its outline is a trapezoid that changes
 * every frame and has to be measured rather than declared. All of it is done in
 * the stage's own layout coordinates — never `getBoundingClientRect`, which
 * reports screen pixels and would be wrong at every breakpoint that scales the
 * stage down.
 */
export const useCardSilhouette = (target: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const layer = target.current;
    if (!layer) return;

    const deck = document.querySelector<HTMLElement>(`[${DECK_ATTR}]`);
    if (!deck) return;

    /* The deck's perspective origin is its centre, which is also where every
       card sits before it is transformed, so one origin serves all of them. */
    const depth = parseFloat(getComputedStyle(deck).perspective);

    const outline = (card: HTMLElement, originX: number, originY: number) => {
      const matrix = new DOMMatrix(getComputedStyle(card).transform);
      const halfWidth = card.offsetWidth / 2;
      const halfHeight = card.offsetHeight / 2;

      const corners = [
        [-halfWidth, -halfHeight],
        [halfWidth, -halfHeight],
        [halfWidth, halfHeight],
        [-halfWidth, halfHeight],
      ].map(([x, y]) => {
        const point = matrix.transformPoint(new DOMPoint(x, y, 0, 1));
        /* The parent's perspective is not part of the card's own matrix, so the
           divide is applied here. A card never travels closer than
           --card-near plus half its width, which stays well short of the
           perspective distance, so this cannot pass through the camera. */
        const scale = depth / (depth - point.z);
        return `${(originX + point.x * scale).toFixed(2)} ${(originY + point.y * scale).toFixed(2)}`;
      });

      return `M ${corners[0]} L ${corners[1]} L ${corners[2]} L ${corners[3]} Z`;
    };

    const paint = () => {
      const cards = deck.querySelectorAll<HTMLElement>(`[${DECK_CARD_ATTR}]`);
      /* The layer fills the stage, so its own centre is the deck's centre. */
      const originX = layer.offsetWidth / 2;
      const originY = layer.offsetHeight / 2;

      /* One path holding every card as its own subpath: `clip-path` takes a
         single shape, and subpaths are how two overlapping cards become one. A
         card turned edge-on contributes a zero-width sliver and shows nothing. */
      const shapes = Array.from(cards, (card) => outline(card, originX, originY));
      layer.style.clipPath = `path("${shapes.join(' ')}")`;
    };

    let frame = 0;
    const run = () => {
      paint();
      frame = requestAnimationFrame(run);
    };

    /* Only while the stage is on screen. The deck turns for as long as the page
       is open, and there is no reason to measure it from four sections away. */
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !frame) run();
      else if (!entry.isIntersecting && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(deck);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);
};
