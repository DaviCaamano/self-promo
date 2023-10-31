'use client';
import { Selfie } from '@components/landing/selfie/Selfie';
import { AboutMe } from '@components/landing/AboutMe';
import { NavBar } from '@components/landing/navbar/Navbar';
import { Experience } from '@components/landing/Experience';
import { useSlide } from '@components/landing/hooks/useSlide';
import { Slide } from '@components/landing/landing.interface';
import { Projects } from '@components/landing/Projects';
import { PropsWithChildren } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useIsLandscape } from '@hooks/mobile/useIsLandscape';

interface LandingProps {
  isMobile: boolean;
}
export const Landing = ({ isMobile }: LandingProps) => {
  const { setFocusedProject, slide, setSlide, splide } = useSlide();
  const isLandscape = useIsLandscape(isMobile);

  return (
    <div id={'landing'} className='min-w-screen min-h-screen flex justify-center items-center overflow-hidden'>
      <Splide {...splide}>
        <Page current={slide} slide={Slide.socials}>
          <Selfie isLandscape={isLandscape} />
        </Page>
        <Page current={slide} slide={Slide.about}>
          <AboutMe />
        </Page>
        <Page current={slide} slide={Slide.experience}>
          <Experience setFocusedProject={setFocusedProject} />
        </Page>
        <Page current={slide} slide={Slide.projects}>
          <Projects />
        </Page>
      </Splide>
      <NavBar slide={slide} setSlide={setSlide} isLandscape={isLandscape} isMobile={isMobile} />
    </div>
  );
};

interface CarouselFilterProps extends PropsWithChildren {
  current: Slide;
  slide: Slide;
}
const Page = ({ children, current, slide }: CarouselFilterProps) => {
  return (
    <SplideSlide>
      <div className={`trimmer ${current !== slide && 'max-h-[100dvh] overflow-hidden'} h-auto`}>{children}</div>
    </SplideSlide>
  );
};
