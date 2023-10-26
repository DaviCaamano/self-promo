import { Portrait } from '@components/landing/selfie/Portrait';
import { Greeting } from '@components/landing/selfie/Greeting';
import { JobTitle } from '@components/landing/selfie/JobTitle';

export const Selfie = () => (
  <div className={'relative min-h-[100svh] min-w-[100%] flex justify-center items-center'}>
    <div className={'relative'}>
      <Portrait />
      <Greeting />
      <JobTitle />
    </div>
  </div>
);
