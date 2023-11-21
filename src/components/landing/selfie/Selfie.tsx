import styles from '../styles/selfie.module.scss';
import { Portrait } from '@components/landing/selfie/Portrait';
import { Greeting } from '@components/landing/selfie/Greeting';
import { JobTitle } from '@components/landing/selfie/JobTitle';
import { Wave } from '@components/landing/selfie/Wave';
import { Socials } from '@components/landing/selfie/Socials';

interface SelfieProps {
  active: boolean;
  isLandscape: boolean;
}
export const Selfie = ({ active, isLandscape }: SelfieProps) => {
  return (
    <div className={styles.selfie}>
      <div className={`${styles.responsive} ${isLandscape && styles.landscape}`}>
        <Portrait isLandscape={isLandscape} />
        <Greeting isLandscape={isLandscape} />
        <JobTitle isLandscape={isLandscape} />
        <Wave isLandscape={isLandscape} />
      </div>
      <Socials active={active} isLandscape={isLandscape} />
    </div>
  );
};
