import { Landing } from '@components/landing/Landing';
import { headers } from 'next/headers';
import { detectMobile } from '@utils/mobile/detectMobile';

export default function Home() {
  const isMobile = detectMobile(headers);
  return (
    <div id={'home-page'} className={'relative min-h-[100svh] w-[100%]'}>
      <Landing isMobile={isMobile} />
    </div>
  );
}
