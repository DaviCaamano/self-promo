'use client';
import { Selfie } from '@components/landing/selfie/Selfie';
import { AboutMe } from '@components/AboutMe';
import { NavBar } from '@components/landing/navbar/Navbar';
import { Experience } from '@components/Experience';
import { useSlide } from '@components/landing/hooks/useSlide';
import { Slide } from '@components/landing/landing.interface';
import { Projects } from '@components/Projects';

export const Landing = () => {
  const { slide, setSlide, sliderRef } = useSlide();
  return (
    <div id={'landing'} className='min-w-screen min-h-screen flex justify-center items-center'>
      <div id={'carousel'} ref={sliderRef} className='keen-slider' style={carouselStyle(slide)}>
        <Selfie />
        <AboutMe />
        <Experience />
        <Projects />
      </div>
      <NavBar slide={slide} setSlide={setSlide} />
    </div>
  );
};

const carouselStyle = (slide: number) => {
  switch (slide) {
    case Slide.selfie: {
      return {
        height: '100dvh',
      };
    }
    case Slide.about: {
      return {
        height: '50rem',
      };
    }
  }
};
