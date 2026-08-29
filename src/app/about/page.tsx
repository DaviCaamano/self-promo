import { LandingPage } from '@components/landing/LandingPage';
import { Section } from '@components/landing/landing.interface';

export default function About() {
  return <LandingPage section={Section.about} />;
}
