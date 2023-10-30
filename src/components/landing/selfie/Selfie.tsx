import { Portrait } from '@components/landing/selfie/Portrait';
import { Greeting } from '@components/landing/selfie/Greeting';
import { JobTitle } from '@components/landing/selfie/JobTitle';
import styles from '../styles/selfie.module.scss';
import { Wave } from '@components/landing/selfie/Wave';

export const Selfie = () => (
  <div className={styles.selfie}>
    <div className={styles.responsive}>
      <Portrait />
      <Greeting />
      <JobTitle />
      <Wave />
    </div>
  </div>
);
