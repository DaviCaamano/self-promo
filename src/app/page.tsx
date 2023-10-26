import { Landing } from '@components/landing/Landing';

export default function Home() {
  return <div id={'home-page'} className={'flex flex-col-reverse min-h-[100svh] min-w-[100vw] relative'}>
    <Landing />
  </div>;
}
