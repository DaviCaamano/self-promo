import { LandingPage } from '@components/landing/LandingPage';
import { Section } from '@components/landing/landing.interface';

export default function Home() {
  return <LandingPage section={Section.socials} />;
}
