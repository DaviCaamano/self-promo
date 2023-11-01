import { Landing } from '@components/landing/Landing';
import { headers } from 'next/headers';
import { useIsMobile } from '@hooks/mobile/useIsMobile';
import { IsClientCtxProvider } from '@context/client.context';

export default function Home() {
  const isMobile = useIsMobile(headers);
  return (
    <IsClientCtxProvider>
      <div id={'home-page'} className={'relative min-h-[100svh] w-[100vw]'}>
        <Landing isMobile={isMobile} />
      </div>
    </IsClientCtxProvider>
  );
}
