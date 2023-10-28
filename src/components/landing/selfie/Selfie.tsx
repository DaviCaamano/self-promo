import { Portrait } from '@components/landing/selfie/Portrait';
import { Greeting } from '@components/landing/selfie/Greeting';
import { JobTitle } from '@components/landing/selfie/JobTitle';

export const Selfie = () => (
  <div className={'min-h-[100svh] min-w-screen flex justify-center items-center keen-slider__slide number-slide1'}>
    <div className={'relative'}>
      <Portrait />
      <Greeting />
      <JobTitle />
    </div>
  </div>
);
