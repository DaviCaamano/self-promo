import { Project } from '@components/landing/landing.interface';

export interface ProjectPreview {
  id: Project;
  /** Wide screens, and the landing deck at every size — it renders large. */
  lg: string;
  /** Phones. */
  sm: string;
}

/**
 * Every project's preview art, named once. The Projects section renders these
 * as thumbnails and the landing deck turns through them, so a renamed file is
 * a change here and nowhere else.
 *
 * The order is the order both use: the section lists them newest first, and the
 * deck turns through them in that same order before restarting.
 */
export const projectPreviews: readonly ProjectPreview[] = [
  {
    id: Project.waterwriting,
    lg: '/images/thumbnails/water-writing-lg.webp',
    sm: '/images/thumbnails/water-writing-sm.webp',
  },
  {
    id: Project.legitscript,
    lg: '/images/thumbnails/legit-script-lg.webp',
    sm: '/images/thumbnails/legit-script-sm.webp',
  },
  {
    id: Project.quellivMobile,
    lg: '/images/thumbnails/quelliv-mobile-lg.webp',
    sm: '/images/thumbnails/quelliv-mobile-sm.webp',
  },
  { id: Project.quelliv, lg: '/images/thumbnails/quelliv-lg.webp', sm: '/images/thumbnails/quelliv-sm.webp' },
  { id: Project.oit, lg: '/images/thumbnails/oit-lg.webp', sm: '/images/thumbnails/oit-sm.webp' },
];

/** The same entries keyed by project, for the section that renders one at a time. */
export const previewOf = Object.fromEntries(projectPreviews.map((preview) => [preview.id, preview])) as Record<
  Project,
  ProjectPreview
>;
