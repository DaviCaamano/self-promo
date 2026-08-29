'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@components/shared/motion';
import { ArrowSquareOut, DownloadSimple, MagnifyingGlassMinus, MagnifyingGlassPlus, X } from 'phosphor-react';
import styles from './pdf-dialog.module.scss';

/**
 * Widths for the viewer, as a percentage of the frame it sits in. The PDF is
 * asked to fit its own width, so widening the viewer past the frame is what
 * enlarges the page — and it re-renders at that size rather than being scaled
 * up, so the text stays sharp. 100 is therefore the fitted page.
 */
const ZOOM_STEPS = [50, 75, 100, 125, 150, 200, 300, 400];
const FIT_ZOOM = 100;

/**
 * Shared between a trigger card and this dialog so framer-motion treats the two
 * as one element: the card's border box grows into the dialog on open and
 * shrinks back into the card on close.
 */
export const pdfLayoutId = (id: string) => `pdf-frame-${id}`;

/** Inline so framer-motion can read it and undo the stretch mid-animation. */
export const pdfFrameStyle = { borderBottomRightRadius: '0.75rem' };

export interface PdfDialogProps {
  /** Public path, written with real spaces; encoded once here. */
  url: string;
  /** Matches the trigger card's id, which is what pairs the two frames. */
  id: string;
  onClose: () => void;
  open: boolean;
  subtitle?: string;
  title: string;
}

/**
 * A PDF preview in a dialog that grows out of whichever card opened it.
 *
 * Portalled to the body on purpose: the cards that open it are transformed —
 * by their section's scroll entrance, and by framer-motion while the frame
 * grows. A transformed ancestor becomes the containing block for
 * position:fixed, so a dialog rendered in place would be pinned to the card
 * instead of the viewport.
 */
export const PdfDialog = ({ id, onClose, open, subtitle, title, url }: PdfDialogProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  const [zoom, setZoom] = useState<number>(FIT_ZOOM);

  /**
   * Every opening starts fitted, however the last one was left. Kept apart from
   * the effect below because that one re-runs whenever `onClose` is rebuilt,
   * which would drop the zoom mid-read on any re-render of the page behind us.
   */
  useEffect(() => {
    if (!open) setZoom(FIT_ZOOM);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);

    // Restored to '' rather than a literal so the stylesheet's own overflow wins again.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const href = encodeURI(url);

  /** Clamped rather than wrapped; the ends are where the buttons go dead. */
  const stepZoom = (direction: number) =>
    setZoom((current) => {
      const index = ZOOM_STEPS.indexOf(current) + direction;
      return ZOOM_STEPS[Math.min(Math.max(index, 0), ZOOM_STEPS.length - 1)];
    });

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <MotionDiv
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          {/* Lets clicks fall through to the backdrop everywhere but the frame itself. */}
          <div className={styles.positioner}>
            <MotionDiv
              layoutId={pdfLayoutId(id)}
              style={pdfFrameStyle}
              className={styles.frame}
              role={'dialog'}
              aria-modal={'true'}
              aria-label={title}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              {/* Held back until the frame has nearly finished growing, so the
                  contents are never seen mid-stretch. */}
              <MotionDiv
                className={styles.inner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.18, duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                <header className={styles.header}>
                  <div className={styles.heading}>
                    <span className={styles.title}>{title}</span>
                    {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
                  </div>
                  <div className={styles.actions}>
                    <a href={href} download className={styles.action} aria-label={`Download ${title}`}>
                      <DownloadSimple size={24} weight={'regular'} />
                    </a>
                    <a
                      href={href}
                      target={'_blank'}
                      rel={'noreferrer'}
                      className={styles.action}
                      aria-label={`Open ${title} in a new tab`}
                    >
                      <ArrowSquareOut size={24} weight={'regular'} />
                    </a>
                    <button type={'button'} onClick={onClose} className={styles.action} aria-label={'Close preview'}>
                      <X size={24} weight={'regular'} />
                    </button>
                  </div>
                </header>
                <div className={styles.viewport}>
                  <div className={styles.scroller}>
                    {/* Safari on iOS refuses to inline a PDF in an iframe; the
                        open-in-new-tab action above is the way out when it does. */}
                    <iframe
                      className={styles.viewer}
                      style={{ width: `${zoom}%` }}
                      src={`${href}#view=FitH&toolbar=0&navpanes=0`}
                      title={title}
                    />
                  </div>
                  <div className={styles.zoomBar}>
                    <button
                      type={'button'}
                      onClick={() => stepZoom(-1)}
                      disabled={zoom === ZOOM_STEPS[0]}
                      className={styles.zoomButton}
                      aria-label={'Zoom out'}
                    >
                      <MagnifyingGlassMinus size={22} weight={'regular'} />
                    </button>
                    <button
                      type={'button'}
                      onClick={() => setZoom(FIT_ZOOM)}
                      className={styles.zoomLevel}
                      aria-label={'Reset zoom to fit the page'}
                    >
                      {zoom}%
                    </button>
                    <button
                      type={'button'}
                      onClick={() => stepZoom(1)}
                      disabled={zoom === ZOOM_STEPS[ZOOM_STEPS.length - 1]}
                      className={styles.zoomButton}
                      aria-label={'Zoom in'}
                    >
                      <MagnifyingGlassPlus size={22} weight={'regular'} />
                    </button>
                  </div>
                </div>
              </MotionDiv>
            </MotionDiv>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};
