'use client';
import { Selfie } from '@components/landing/selfie/Selfie';
import { AboutMe } from '@components/AboutMe';
import { NavBar } from '@components/landing/navbar/Navbar';
import { Experience } from '@components/Experience';

export const Landing = () => {
  return (
    <div
      id={'Landing'}
      className={'relative w-full max-w-[62.5rem] mx-auto flex flex-col justify-center items-center pb-28'}
    >
      <Selfie />
      <AboutMe />
      <Experience />
      <NavBar />
    </div>
  );
};
