import { LegacyRef, useEffect, useRef, useState } from 'react';
import { Project, Slide } from '@components/landing/landing.interface';
import { Splide as SplideCore } from '@splidejs/splide';
import { Splide } from '@splidejs/react-splide';
import { useRouter } from 'next/navigation';

export const useSlide = () => {
  const router = useRouter();
  const [slide, setSlide] = useState<Slide>(Slide.socials);
  const stickySlide = useRef<Slide>(0);

  const splideRef = useRef<SplideCore>(null);
  const [focusedProject, setFocusedProject] = useState<Project | undefined>(undefined);
  const stickyFocus = useRef<Project | undefined>(undefined);

  useEffect(() => {
    if (stickySlide.current !== slide) {
      stickySlide.current = slide;
      splideRef.current?.go(slide);
    }
  }, [slide]);

  useEffect(() => {
    if (stickyFocus.current !== focusedProject) {
      stickyFocus.current = focusedProject;
      if (typeof focusedProject !== 'undefined') {
        setSlide(Slide.projects);
        setTimeout(() => router.push('/#' + focusedProject), 300);
        setFocusedProject(undefined);
      }
    }
  }, [focusedProject, router]);

  return {
    setFocusedProject,
    slide,
    setSlide,
    splide: {
      // @ts-ignore
      onMove: (_, index: number) => {
        setSlide(index);
      },
      options: { rewind: true, arrows: false, pagination: false, perPage: 1, flickMaxPages: 1 },
      style: { width: '100%' },
      ref: splideRef as unknown as LegacyRef<Splide>,
    },
  };
};
