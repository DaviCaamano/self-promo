import type { Metadata } from 'next';
import { LandingPage } from '@components/landing/LandingPage';
import { Section } from '@components/landing/landing.interface';

/** Names this route rather than the site, so tabs, history and the load
 *  announcement all say which part of the page you are on. */
export const metadata: Metadata = {
  title: 'Davi Caamano — Fullstack Developer',
  description: 'Portfolio of Davi Caamano, a fullstack web and mobile developer.',
};

export default function Home() {
  return <LandingPage section={Section.socials} />;
}
