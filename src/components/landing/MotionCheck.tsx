'use client';
import { useEffect, useState } from 'react';

/**
 * TEMPORARY. A readout of what this browser actually did with the deck's
 * animations, for a device that cannot be reproduced locally.
 *
 * Renders only for `?motion-check` — nothing ships to an ordinary visitor. It
 * reads the live cards rather than a copy, because the question is what the
 * real rules resolved to here, not what they resolve to in a test page.
 *
 * Delete this file, its import in `Landing`, and the element there once the
 * Android report is settled.
 */
export const MotionCheck = () => {
  const [lines, setLines] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    if (!new URLSearchParams(location.search).has('motion-check')) return;

    const read = () => {
      const out: string[] = [];
      out.push(`reduced-motion: ${matchMedia('(prefers-reduced-motion: reduce)').matches}`);

      const deck = document.querySelector<HTMLElement>('[data-deck]');
      if (!deck) {
        out.push('DECK NOT FOUND');
      } else {
        const cs = getComputedStyle(deck);
        out.push(`turning: ${deck.dataset.turning}`);
        out.push(`--card-step: "${cs.getPropertyValue('--card-step').trim()}"`);
        out.push(`--card-count: "${cs.getPropertyValue('--card-count').trim()}"`);
        out.push(`deck anim: ${cs.animationName} ${cs.animationDuration}`);
      }

      document.querySelectorAll<HTMLElement>('[data-deck-card]').forEach((card, index) => {
        const s = getComputedStyle(card);
        const name = s.animationName.replace(/^project-deck_/, '').replace(/__.*$/, '');
        out.push(
          `${index} ${card.getAttribute('data-deck-card')}` +
            ` n=${name} d=${s.animationDuration} w=${s.animationDelay}` +
            ` p=${s.animationPlayState} f=${s.animationFillMode}` +
            ` op=${(+s.opacity).toFixed(2)} turn="${s.getPropertyValue('--turn').trim()}"`,
        );
      });

      /* What the engine believes is actually running, as opposed to declared. */
      const running = document.getAnimations();
      out.push(`getAnimations: ${running.length}, states: ${[...new Set(running.map((a) => a.playState))].join('/')}`);
      out.push(`time: ${Math.round(performance.now())}ms`);
      out.push(navigator.userAgent);
      setLines(out);
    };

    read();
    const timer = setInterval(read, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!lines) return null;

  return (
    <pre
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        zIndex: 99999,
        margin: 0,
        padding: '8px',
        background: 'rgba(0,0,0,0.92)',
        color: '#9cff9c',
        font: '10px/1.35 monospace',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
      }}
    >
      {lines.join('\n')}
    </pre>
  );
};
