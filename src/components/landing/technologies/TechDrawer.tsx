'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowSquareOut, X } from 'phosphor-react';
import { techDetails } from './tech-details';
import { TechName, techIcons } from './tech-icons';
import { TechMark } from './TechBadge';
import styles from '../styles/tech-drawer.module.scss';

interface TechDrawerProps {
  onClose: () => void;
  /** The badge that was clicked, or undefined when the drawer is shut. */
  tech: TechName | undefined;
}

/**
 * The panel that opens off the right edge when a badge is clicked, and covers
 * the screen on a phone where there is no room to sit beside anything.
 *
 * Portalled to the body: the badges sit inside a section whose contents carry
 * transforms from their scroll entrance, and a transformed ancestor would
 * become the containing block for this panel's position:fixed.
 */
export const TechDrawer = ({ onClose, tech }: TechDrawerProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!tech) return;

    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);

    // Restored to '' rather than a literal so the stylesheet's own overflow wins again.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [tech, onClose]);

  if (!mounted) return null;

  const icon = tech && techIcons[tech];
  const detail = tech && techDetails[tech];
  const open = Boolean(tech);

  return createPortal(
    <>
      <div className={styles.scrim} data-open={open} onClick={onClose} aria-hidden />

      <aside
        className={styles.drawer}
        data-open={open}
        role={'dialog'}
        aria-modal={open ? 'true' : undefined}
        aria-label={icon ? `About ${icon.title}` : undefined}
        aria-hidden={open ? undefined : true}
      >
        {icon && detail && (
          <>
            <header className={styles.header}>
              <span className={styles.mark}>
                <TechMark icon={icon} />
              </span>
              <span className={styles.heading__group}>
                <span className={styles.title}>{icon.title}</span>
                <span className={styles.released}>Released {detail.released}</span>
              </span>
              <button type={'button'} onClick={onClose} className={styles.close} aria-label={'Close'}>
                <X size={24} weight={'regular'} />
              </button>
            </header>

            <div className={styles.body}>
              <p className={styles.summary}>{detail.summary}</p>

              <h3 className={styles.heading}>History</h3>
              <p className={styles.role}>{detail.history}</p>

              <h3 className={styles.heading}>Links</h3>
              <ul className={styles.links}>
                {detail.links.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target={'_blank'} rel={'noreferrer'} className={styles.link}>
                      {link.label}
                      <ArrowSquareOut size={16} weight={'bold'} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </aside>
    </>,
    document.body,
  );
};
