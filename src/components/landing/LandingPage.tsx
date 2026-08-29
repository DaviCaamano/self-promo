import { headers } from 'next/headers';
import { Landing } from '@components/landing/Landing';
import { Section } from '@components/landing/landing.interface';
import { useIsMobile } from '@hooks/mobile/useIsMobile';
import { IsClientCtxProvider } from '@context/client.context';

interface LandingPageProps {
  /** Where the page opens scrolled to, taken from the route that was requested. */
  section: Section;
}
export const LandingPage = ({ section }: LandingPageProps) => {
  const isMobile = useIsMobile(headers);
  return (
    <IsClientCtxProvider>
      <div id={'home-page'} className={'relative min-h-[100svh] w-full'}>
        <Landing initialSection={section} isMobile={isMobile} />
      </div>
    </IsClientCtxProvider>
  );
};
