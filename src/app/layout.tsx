import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';
import './globals.scss';

import { montserratFont } from '@fonts/montserrat/montserrat.font';

/** Display face for pull quotes only; Montserrat still sets the whole UI. */
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: 'Davi Caamano — Fullstack Developer',
  description: 'Portfolio of Davi Caamano, a fullstack web and mobile developer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      className={`${montserratFont.variable} ${instrumentSerif.variable} ${montserratFont.className} bg-latte`}
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
