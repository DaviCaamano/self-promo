import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getIsMobile } from '@hooks/mobile/getIsMobile';
import { Landing } from './components/Landing';

/**
 * The body face the old site set in its root layout. The layout that survived
 * dropped it — one font class on the body outranks the Montserrat class on
 * `<html>` and shadowed it for the whole tree — so it is set here instead,
 * where it reaches this route and nothing else.
 */
const inter = Inter({ subsets: ['latin'] });

/**
 * `noindex`: this is the same portfolio, the same text, one URL over. Left
 * indexable it competes with the live site for its own search terms, and a
 * search for the name could land a stranger on the version that was replaced.
 */
export const metadata: Metadata = {
  title: "Davi Caamano — It's Me, Davi",
  description: 'The carousel portfolio this site used to be.',
  robots: { index: false, follow: false },
};

export default async function Spooky() {
  const isMobile = await getIsMobile();

  /**
   * `w-full`, where the old page said `w-[100vw]`. Its layout gave the body a
   * hand rolled `calc(100vw - 34px)` allowance for the scrollbar; the one this
   * route renders in reserves the track with `scrollbar-gutter` instead, and
   * 100vw counts that track, so the old value would overhang by a scrollbar's
   * width and pull the carousel off centre.
   */
  return (
    <div id={'home-page'} className={`${inter.className} relative min-h-[100svh] w-full`}>
      <Landing isMobile={isMobile} />
    </div>
  );
}
