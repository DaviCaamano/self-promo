import type { Metadata } from 'next';
import { LandingPage } from '@components/landing/LandingPage';
import { Section } from '@components/landing/landing.interface';

/** Names this route rather than the site, so tabs, history and the load
 *  announcement all say which part of the page you are on. */
export const metadata: Metadata = {
  title: 'Experience — Davi Caamano',
  description: 'Roles and responsibilities across the career of Davi Caamano.',
};

export default function ExperiencePage() {
  return <LandingPage section={Section.experience} />;
}
