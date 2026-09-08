import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';
import './globals.scss';

import { montserratFont } from '@fonts/montserrat/montserrat.font';

/**
 * Display face for pull quotes only; Montserrat still sets the whole UI.
 *
 * A text serif rather than a display one, because every quote on this site is
 * light type on a dark panel at reading size. A high contrast face puts hairline
 * thin strokes there, and light-on-dark is exactly where a hairline disappears —
 * this one is drawn for screen at those sizes and keeps its strokes.
 *
 * No `weight`: Newsreader is variable, so leaving the axis open lets each quote
 * pick its own weight rather than every one of them sharing a single cut.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
});

export const metadata: Metadata = {
  title: 'Davi Caamano — Fullstack Developer',
  description: 'Portfolio of Davi Caamano, a fullstack web and mobile developer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      className={`${montserratFont.variable} ${newsreader.variable} ${montserratFont.className} bg-latte`}
    >
      {/* Deliberately no font class: one on the body outranks the html class and
          would shadow Montserrat for the whole tree. */}
      <body>
        {/* First focusable thing on the page: landmarks serve screen readers,
            but sighted keyboard users have no jump key and would otherwise tab
            the whole nav on every visit. */}
        <a href='#main' className='skip-link'>
          Skip to main content
        </a>
        <main id='main' className='flex min-h-screen flex-col items-center justify-between'>
          {children}{' '}
        </main>
      </body>
    </html>
  );
}
