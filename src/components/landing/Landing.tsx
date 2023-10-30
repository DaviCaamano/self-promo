'use client';
import { Selfie } from '@components/landing/selfie/Selfie';
import { AboutMe } from '@components/landing/AboutMe';
import { NavBar } from '@components/landing/navbar/Navbar';
import { Experience } from '@components/landing/Experience';
import { useSlide } from '@components/landing/hooks/useSlide';
import { Slide } from '@components/landing/landing.interface';
import { Projects } from '@components/landing/Projects';
import { PropsWithChildren } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

export const Landing = () => {
  const { focusedProject, setFocusedProject, slide, setSlide, sliderRef } = useSlide();
  return (
    <div id={'landing'} className='min-w-screen min-h-screen flex justify-center items-center'>
      <div id={'carousel'} ref={sliderRef} className={'keen-slider'}>
        <CarouselFilter current={slide} slide={Slide.selfie}>
          <Selfie />
        </CarouselFilter>
        <CarouselFilter current={slide} slide={Slide.about}>
          <AboutMe />
        </CarouselFilter>
        <CarouselFilter current={slide} slide={Slide.experience}>
          <Experience setFocusedProject={setFocusedProject} />
        </CarouselFilter>
        <CarouselFilter current={slide} slide={Slide.projects}>
          <Projects focusedProject={focusedProject} setFocusedProject={setFocusedProject} />
        </CarouselFilter>
      </div>
      <NavBar slide={slide} setSlide={setSlide} />
    </div>
  );
};

interface CarouselFilterProps extends PropsWithChildren {
  slide: Slide;
  current: Slide;
}
const CarouselFilter = ({ children, current, slide }: CarouselFilterProps) => {
  return <div className={`${current === slide ? 'max-h-[100dvh] overflow-hidden' : ''}`}>{children}</div>;
};
