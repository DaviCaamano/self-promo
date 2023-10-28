'use client';
import { Selfie } from '@components/landing/selfie/Selfie';
import { AboutMe } from '@components/AboutMe';
import { NavBar } from '@components/landing/navbar/Navbar';
import { Experience } from '@components/Experience';
import { useKeenSlider } from 'keen-slider/react';

export const Landing = () => {
  const [sliderRef, slider] = useKeenSlider();
  return (
    <div id={'landing'} className='min-w-screen min-h-screen flex justify-center items-center'>
      <div id={'carousel'} ref={sliderRef} className='keen-slider'>
        <Selfie />
        <AboutMe />
        <Experience />
      </div>
      <NavBar jumpTo={(index: number) => slider.current?.moveToIdx(index)} />
    </div>
  );
};
