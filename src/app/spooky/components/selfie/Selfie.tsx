import styles from '../../styles/selfie.module.scss';
import { Portrait } from './Portrait';
import { Greeting } from './Greeting';
import { JobTitle } from './JobTitle';
import { Wave } from './Wave';
import { Socials } from './Socials';

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
