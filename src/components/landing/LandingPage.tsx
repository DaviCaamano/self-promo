import { Landing } from '@components/landing/Landing';
import { Section } from '@components/landing/landing.interface';
import { getIsMobile } from '@hooks/mobile/getIsMobile';

interface LandingPageProps {
  /** Where the page opens scrolled to, taken from the route that was requested. */
  section: Section;
}
export const LandingPage = async ({ section }: LandingPageProps) => {
  const isMobile = await getIsMobile();
  return (
    <div id={'home-page'} className={'relative min-h-[100svh] w-full'}>
      <Landing initialSection={section} isMobile={isMobile} />
    </div>
  );
};
