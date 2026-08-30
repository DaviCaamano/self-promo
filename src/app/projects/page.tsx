import type { Metadata } from 'next';
import { LandingPage } from '@components/landing/LandingPage';
import { Section } from '@components/landing/landing.interface';

/** Names this route rather than the site, so tabs, history and the load
 *  announcement all say which part of the page you are on. */
export const metadata: Metadata = {
  title: 'Projects — Davi Caamano',
  description: 'Selected projects Davi Caamano has designed and built.',
};

export default function ProjectsPage() {
  return <LandingPage section={Section.projects} />;
}
