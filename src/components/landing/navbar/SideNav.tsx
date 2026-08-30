'use client';
import { Briefcase, Code, House, Stack, UserCircle } from 'phosphor-react';
import { CSSProperties } from 'react';
import { Section, SECTIONS, sectionLabels } from '@components/landing/landing.interface';
import { ToolTipAnchor, Tooltip } from '@components/shared/tooltip/Tooltip';
import styles from '../styles/side-nav.module.scss';

export const sectionIcons = {
  [Section.socials]: House,
  [Section.about]: UserCircle,
  [Section.technologies]: Code,
  [Section.experience]: Briefcase,
  [Section.projects]: Stack,
};

interface SideNavProps {
  active: Section;
  /** How long to hold the rail off screen, so it arrives after the page has. */
  introDelayMs: number;
  isMobile: boolean;
  onSelect: (section: Section) => void;
}

/**
 * The rail down the left edge, shown from the tablet up; below that the
 * hamburger takes over. Fixed rather than sticky so it stays put through the
 * whole scroll instead of riding one section.
 */
export const SideNav = ({ active, introDelayMs, isMobile, onSelect }: SideNavProps) => (
  <nav
    className={styles.rail}
    style={{ '--nav-intro-delay': `${introDelayMs}ms` } as CSSProperties}
    aria-label={'Page sections'}
  >
    {SECTIONS.map((section) => {
      const Icon = sectionIcons[section];
      const current = section === active;

      return (
        /* ToolTipAnchor.left offsets the tip by the trigger's own width, which
           lands it to the RIGHT of the rail — where there is room for it. */
        <Tooltip
          key={section}
          anchor={ToolTipAnchor.left}
          distance={'0.75rem'}
          content={isMobile ? undefined : <span className={styles.tip}>{sectionLabels[section]}</span>}
        >
          <button
            type={'button'}
            onClick={() => onSelect(section)}
            className={`${styles.item} ${current ? styles.selected : ''}`}
            aria-label={sectionLabels[section]}
            aria-current={current ? 'true' : undefined}
          >
            <Icon weight={current ? 'fill' : 'light'} />
          </button>
        </Tooltip>
      );
    })}
  </nav>
);
