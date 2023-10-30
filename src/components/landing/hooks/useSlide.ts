import { useEffect, useRef, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { Slide } from '@components/landing/landing.interface';

export const useSlide = () => {
  const [slide, setSlide] = useState<Slide>(0);
  const slideRef = useRef<Slide>(0);
  const [sliderRef, slider] = useKeenSlider();

  useEffect(() => {
    if (slideRef.current !== slide) {
      slideRef.current = slide;
      slider.current?.moveToIdx(slide);
    }
  });

  return {
    slide,
    setSlide,
    slider,
    sliderRef,
  };
};
