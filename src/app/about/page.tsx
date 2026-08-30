import type { Metadata } from 'next';
import { LandingPage } from '@components/landing/LandingPage';
import { Section } from '@components/landing/landing.interface';

/** Names this route rather than the site, so tabs, history and the load
 *  announcement all say which part of the page you are on. */
export const metadata: Metadata = {
  title: 'About — Davi Caamano',
  description: 'Contact details, resume and letters of recommendation for Davi Caamano.',
};

export default function About() {
  return <LandingPage section={Section.about} />;
}
