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
  title: 'Davi Caamano',
  description: 'Programmer for Hire!',
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
        <main className='flex min-h-screen flex-col items-center justify-between'>{children} </main>
      </body>
    </html>
  );
}
