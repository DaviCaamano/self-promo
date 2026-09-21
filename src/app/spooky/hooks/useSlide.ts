import { LegacyRef, useEffect, useRef, useState } from 'react';
import { Project, Slide } from '../spooky.interface';
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
        /* '/spooky#', not '/#': the old site was the site, so jumping to a
           project was a jump to the root. Here the root is the current site,
           and that hash has to stay on this route. */
        setTimeout(() => router.push('/spooky#' + focusedProject), 300);
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
