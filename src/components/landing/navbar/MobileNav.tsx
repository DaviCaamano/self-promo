'use client';
import { CSSProperties, useEffect, useState } from 'react';
import { List, X } from 'phosphor-react';
import { Section, SECTIONS, sectionLabels } from '@components/landing/landing.interface';
import { sectionIcons } from '@components/landing/navbar/SideNav';
import styles from '../styles/mobile-nav.module.scss';

interface MobileNavProps {
  active: Section;
  /** How long to hold the trigger off screen, so it arrives after the page has. */
  introDelayMs: number;
  onSelect: (section: Section) => void;
}

/**
 * The phone's nav: a hamburger pinned to the top right, opening a drawer that
 * comes down over the top of the page. Hidden from the tablet up, where the
 * left rail takes over.
 */
export const MobileNav = ({ active, introDelayMs, onSelect }: MobileNavProps) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const go = (section: Section) => {
    setOpen(false);
    onSelect(section);
  };

  return (
    <div className={styles.mobileNav}>
      <button
        type={'button'}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={styles.trigger}
        style={{ '--nav-intro-delay': `${introDelayMs}ms` } as CSSProperties}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={'mobile-sections'}
      >
        {open ? <X weight={'bold'} /> : <List weight={'bold'} />}
      </button>

      {/* Catches the tap that dismisses the drawer. Untouchable while closed so
          it never sits on top of the page's own links. */}
      <div className={styles.scrim} data-open={open} onClick={() => setOpen(false)} aria-hidden />

      <nav id={'mobile-sections'} className={styles.drawer} data-open={open} aria-label={'Page sections'}>
        {SECTIONS.map((section) => {
          const Icon = sectionIcons[section];
          const current = section === active;

          return (
            <button
              key={section}
              type={'button'}
              onClick={() => go(section)}
              className={`${styles.item} ${current ? styles.selected : ''}`}
              aria-current={current ? 'true' : undefined}
              /* Unreachable by keyboard while the drawer is shut, which is what
                 a reader tabbing through the page behind it expects. */
              tabIndex={open ? undefined : -1}
            >
              <Icon weight={current ? 'fill' : 'light'} className={styles.icon} />
              {sectionLabels[section]}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
