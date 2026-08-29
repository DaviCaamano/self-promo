export enum Section {
  socials,
  about,
  technologies,
  experience,
  projects,
}

/** Page order. The nav, the scroll spy and the routes all iterate this. */
export const SECTIONS = [Section.socials, Section.about, Section.technologies, Section.experience, Section.projects];

/** Anchor ids, and the only place a section's element id is spelled out. */
export const sectionIds: Record<Section, string> = {
  [Section.socials]: 'home',
  [Section.about]: 'about-me',
  [Section.technologies]: 'technologies',
  [Section.experience]: 'experience',
  [Section.projects]: 'projects',
};

export const sectionLabels: Record<Section, string> = {
  [Section.socials]: 'Home',
  [Section.about]: 'About',
  [Section.technologies]: 'Technologies',
  [Section.experience]: 'Experience',
  [Section.projects]: 'Projects',
};

/**
 * Every section is still deep linkable. The page is one continuous scroll now,
 * so a route no longer picks a slide — it picks where the page opens scrolled
 * to, and the address bar follows the section the reader is looking at.
 */
export const sectionRoutes: Record<Section, string> = {
  [Section.socials]: '/',
  [Section.about]: '/about',
  [Section.technologies]: '/technologies',
  [Section.experience]: '/experience',
  [Section.projects]: '/projects',
};

export enum Project {
  oit = 'oit',
  legitscript = 'merchant-monitoring',
  quelliv = 'quelliv',
  quellivMobile = 'quelliv-mobile',
  waterwriting = 'water-writing',
}
