'use client';
import { RefObject, useEffect, useRef } from 'react';

/** Everything the browser will let Tab reach, in DOM order. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Focus handling for a dialog that is already rendered and merely shown or
 * hidden: move focus in on open, keep Tab inside while it is open, and put
 * focus back on whatever opened it on close.
 *
 * Without the restore, closing a dialog drops focus at the top of the body and
 * a keyboard user has to walk the whole page back to where they were. Without
 * the trap, focus wanders the page behind a dialog that visually covers it —
 * the half-modal, which is among the most common serious accessibility bugs in
 * apps like this one.
 *
 * The caller still owns Escape and the visual state; this owns only focus.
 */
export const useDialogFocus = (ref: RefObject<HTMLElement | null>, open: boolean) => {
  /** Whatever had focus when the dialog opened, so it can be handed back. */
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;

    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));

    /* Somewhere inside, or the panel itself when it holds nothing focusable. */
    const first = focusable()[0] ?? dialog;
    if (first === dialog) dialog.setAttribute('tabindex', '-1');
    first.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const targets = focusable();
      if (!targets.length) {
        event.preventDefault();
        return;
      }

      const edge = event.shiftKey ? targets[0] : targets[targets.length - 1];
      if (document.activeElement !== edge) return;

      /* Wrap rather than letting focus escape to the page behind. */
      event.preventDefault();
      (event.shiftKey ? targets[targets.length - 1] : targets[0]).focus();
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      opener.current?.focus();
    };
  }, [open, ref]);
};
