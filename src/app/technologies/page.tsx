import type { Metadata } from 'next';
import { LandingPage } from '@components/landing/LandingPage';
import { Section } from '@components/landing/landing.interface';

/** Names this route rather than the site, so tabs, history and the load
 *  announcement all say which part of the page you are on. */
export const metadata: Metadata = {
  title: 'Technologies — Davi Caamano',
  description: 'The languages, frameworks and tools Davi Caamano builds with.',
};

export default function TechnologiesPage() {
  return <LandingPage section={Section.technologies} />;
}
