'use client';
import { RefObject, useEffect } from 'react';
import { Project } from '@components/landing/landing.interface';

/** Set by the deck on its root, and on every card with that card's project as
 *  its value, so this can find them without either side importing the other's
 *  hashed CSS module class names. */
export const DECK_ATTR = 'data-deck';
export const DECK_CARD_ATTR = 'data-deck-card';

/** Clips a layer down to nothing. See the note where it is used. */
export const EMPTY_CLIP = 'M 0 0 Z';

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
 *
 * Pass `only` to clip to a single preview rather than all of them, which is how
 * a card whose artwork needs a different colour gets its own copy.
 */
export const useCardSilhouette = (target: RefObject<HTMLElement | null>, only?: Project) => {
  useEffect(() => {
    const layer = target.current;
    if (!layer) return;

    const deck = document.querySelector<HTMLElement>(`[${DECK_ATTR}]`);
    if (!deck) return;

    const selector = only ? `[${DECK_CARD_ATTR}="${only}"]` : `[${DECK_CARD_ATTR}]`;

    /* The deck's perspective origin is its centre, which is also where every
       card sits before it is transformed, so one origin serves all of them. */
    const depth = parseFloat(getComputedStyle(deck).perspective);

    const outline = (card: HTMLElement, originX: number, originY: number) => {
      const { transform } = getComputedStyle(card);
      /* `none` before the deck starts turning, which DOMMatrix will not parse. */
      const matrix = new DOMMatrix(transform === 'none' ? undefined : transform);
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
      const cards = deck.querySelectorAll<HTMLElement>(selector);
      /* Where a card sits before it is transformed, and where the perspective
         is centred. Read off the deck rather than assumed to be the middle of
         the layer: the two share a containing block but the deck is offset
         within it, and a clip measured from the wrong centre misses by exactly
         that offset. */
      const originX = deck.offsetLeft + deck.offsetWidth / 2 - layer.offsetLeft;
      const originY = deck.offsetTop + deck.offsetHeight / 2 - layer.offsetTop;

      /* One path holding every card as its own subpath: `clip-path` takes a
         single shape, and subpaths are how two overlapping cards become one.
         A card waiting its turn is hidden but still square to the reader, so it
         is skipped by opacity rather than trusted to be edge-on. */
      const shapes = Array.from(cards)
        .filter((card) => getComputedStyle(card).opacity !== '0')
        .map((card) => outline(card, originX, originY));
      /* A single point when nothing is showing, never the empty path: browsers
         reject `path("")` as invalid, and a rejected clip is no clip at all —
         the whole copy would be painted over the page. */
      layer.style.clipPath = `path("${shapes.join(' ') || EMPTY_CLIP}")`;
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
  }, [target, only]);
};
