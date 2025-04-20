'use client';

import { PopDie } from './components/PopDie';

export default function Home() {
  return (
    <div id={'home-page'} className={'relative min-h-[100svh] w-[100vw] flex items-center justify-center bg-white'}>
      <PopDie />
    </div>
  );
}
