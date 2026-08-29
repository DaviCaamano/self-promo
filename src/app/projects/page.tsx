import { LandingPage } from '@components/landing/LandingPage';
import { Section } from '@components/landing/landing.interface';

export default function ProjectsPage() {
  return <LandingPage section={Section.projects} />;
}
