import { CSSProperties } from 'react';
import colors from '@styles/colors';
import styles from '../styles/technologies.module.scss';
import { TechIcon } from './tech-icons';

/** The brand mark on its own, shared by the badge and the drawer's header. */
export const TechMark = ({ icon }: { icon: TechIcon }) => (
  <svg viewBox={icon.viewBox} fill={readableColor(icon.hex)} aria-hidden focusable={'false'}>
    {icon.paths.map((path, index) => (
      <path d={path} key={index} />
    ))}
  </svg>
);

interface TechBadgeProps {
  /** Carries the section's reveal class; `style` carries its place in the stagger. */
  className?: string;
  icon: TechIcon;
  onClick: () => void;
  style?: CSSProperties;
}
export const TechBadge = ({ className, icon, onClick, style }: TechBadgeProps) => (
  <button
    type={'button'}
    className={`${styles.badge} ${className ?? ''}`}
    style={style}
    onClick={onClick}
    aria-label={`About ${icon.title}`}
  >
    <TechMark icon={icon} />
    <span className={styles.label}>{icon.title}</span>
  </button>
);

/**
 * A handful of brand marks are all but black — Next.js, Radix, Codex, Prisma —
 * and vanish against this site's near black background. Each of those brands
 * publishes a light variant for dark themes, so fall back to the page's own
 * light tone whenever the official colour lands under the contrast floor.
 */
const contrastFloor = 2.5;

const readableColor = (hex: string) =>
  contrast(luminance(hex), luminance(colors.void.slice(1))) < contrastFloor ? colors.latte : `#${hex}`;

const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/** Relative luminance, per the WCAG definition. */
const luminance = (hex: string) => {
  const value = parseInt(hex, 16);
  return 0.2126 * channel(value >> 16) + 0.7152 * channel(value >> 8) + 0.0722 * channel(value);
};

const channel = (byte: number) => {
  const part = (byte & 255) / 255;
  return part <= 0.03928 ? part / 12.92 : ((part + 0.055) / 1.055) ** 2.4;
};
