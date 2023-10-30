import { useEffect, useRef, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { Project, Slide } from '@components/landing/landing.interface';

export const useSlide = () => {
  const [slide, setSlide] = useState<Slide>(Slide.selfie);
  const stickySlide = useRef<Slide>(0);
  const [sliderRef, slider] = useKeenSlider();
  const [focusedProject, setFocusedProject] = useState<Project | undefined>(undefined);
  const stickyFocus = useRef<Project | undefined>(undefined);

  useEffect(() => {
    if (stickySlide.current !== slide) {
      stickySlide.current = slide;
      slider.current?.moveToIdx(slide);
    }
  });

  useEffect(() => {
    if (stickyFocus.current !== focusedProject) {
      stickyFocus.current = focusedProject;
      setSlide(Slide.projects);
    }
  });

  return {
    focusedProject,
    setFocusedProject,
    slide,
    setSlide,
    slider,
    sliderRef,
  };
};
