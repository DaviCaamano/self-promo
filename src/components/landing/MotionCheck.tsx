'use client';
import { useEffect, useState } from 'react';

/**
 * TEMPORARY. Works out why the deck is not turning on a device that cannot be
 * reproduced locally, and says so in a sentence rather than leaving a field
 * dump to be interpreted.
 *
 * The Force button is the important part: it outranks the reduced-motion rule,
 * so if the cards start turning when it is pressed, the cause was that
 * preference and nothing else. One tap settles what three rounds of reasoning
 * from a desktop could not.
 *
 * Renders only for `?motion-check`. Delete this file, its import in `Landing`
 * and the element there once the answer is in.
 */
export const MotionCheck = () => {
  const [verdict, setVerdict] = useState<string | undefined>(undefined);
  const [lines, setLines] = useState<string[]>([]);
  const [forced, setForced] = useState<boolean>(false);

  useEffect(() => {
    if (!new URLSearchParams(location.search).has('motion-check')) return;

    const read = () => {
      const deck = document.querySelector<HTMLElement>('[data-deck]');
      const cards = [...document.querySelectorAll<HTMLElement>('[data-deck-card]')];
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const settled = performance.now() > 3000;

      const detail = [`reduced-motion: ${reduced}`, `turning: ${deck?.dataset.turning}`];
      const names = new Set<string>();
      let anyTransform = false;
      cards.forEach((card, index) => {
        const s = getComputedStyle(card);
        const name = s.animationName.replace(/^project-deck_/, '').replace(/__.*$/, '');
        names.add(name);
        if (s.transform !== 'none') anyTransform = true;
        detail.push(
          `${index} ${card.getAttribute('data-deck-card')} n=${name} d=${s.animationDuration}` +
            ` w=${s.animationDelay} p=${s.animationPlayState} op=${(+s.opacity).toFixed(2)}` +
            ` t=${s.transform === 'none' ? 'none' : 'SET'}`,
        );
      });
      detail.push(`getAnimations: ${document.getAnimations().length}`);
      detail.push(navigator.userAgent);

      const say = () => {
        if (!deck) return 'The deck is not on the page at all.';
        if (reduced) return 'REDUCED MOTION IS ON. That is why nothing turns. Tap Force to prove it.';
        if (settled && deck.dataset.turning !== 'true') return 'The deck never started: the page script did not run.';
        if (names.has('none')) return 'No animation was applied to the cards at all.';
        if (names.has('cardFade') || names.has('cardHold')) return 'The no-motion keyframes are in play.';
        if (settled && !anyTransform) return 'Animation is running but this browser is ignoring the transform.';
        return 'The deck is turning normally here.';
      };

      setVerdict(say());
      setLines(detail);
    };

    read();
    const timer = setInterval(read, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!verdict) return null;

  const force = () => {
    const deck = document.querySelector<HTMLElement>('[data-deck]');
    if (!deck) return;
    const on = deck.dataset.force !== 'true';
    deck.dataset.force = String(on);
    setForced(on);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        zIndex: 99999,
        padding: '10px',
        background: 'rgba(0,0,0,0.94)',
        color: '#9cff9c',
        font: '11px/1.4 monospace',
      }}
    >
      <p style={{ margin: '0 0 8px', color: '#fff', fontSize: '13px', fontWeight: 700 }}>{verdict}</p>
      <button
        type={'button'}
        onClick={force}
        style={{
          padding: '10px 16px',
          marginBottom: '8px',
          background: forced ? '#9cff9c' : '#263e79',
          color: forced ? '#000' : '#fff',
          border: '1px solid #9cb6ff',
          borderRadius: '6px',
          font: '13px monospace',
        }}
      >
        {forced ? 'Forcing rotation — ON' : 'Force rotation'}
      </button>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{lines.join('\n')}</pre>
    </div>
  );
};
