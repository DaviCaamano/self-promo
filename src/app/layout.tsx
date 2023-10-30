import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';

import { montserratFont } from '@fonts/montserrat/montserrat.font';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Davi Caamano',
  description: 'Programmer for Hire!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${montserratFont.variable} ${montserratFont.className} bg-latte`}>
      <body className={inter.className}>
        <main className='flex min-h-screen flex-col items-center justify-between'>{children} </main>
      </body>
    </html>
  );
}
