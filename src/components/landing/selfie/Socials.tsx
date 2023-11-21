import colors from '@styles/colors';
import Link from 'next/link';
import { GithubLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react';
import styles from '../styles/selfie.module.scss';
interface SocialsProps {
  active: boolean;
  isLandscape: boolean;
}
export const Socials = ({ active, isLandscape }: SocialsProps) => {
  return (
    <div className={`socials ${styles.socialsContainer} ${isLandscape && styles.landscape}`}>
      <Link href={'https://github.com/DaviCaamano'} passHref target={'_blank'}>
        <GithubLogo
          color={colors.sea}
          className={`${styles.gitHub} ${isLandscape && styles.landscape}`}
          tabIndex={active ? 1 : undefined}
        />
      </Link>
      <Link href={'https://www.linkedin.com/in/davi-caamano-8a440b157/'} passHref target={'_blank'}>
        <LinkedinLogo
          color={colors.sea}
          className={`${styles.socials} ${isLandscape && styles.landscape}`}
          tabIndex={active ? 2 : undefined}
        />
      </Link>
      <Link href={'https://twitter.com/DaviSCaamano'} passHref target={'_blank'}>
        <TwitterLogo
          color={colors.sea}
          className={`${styles.socials} ${isLandscape && styles.landscape}`}
          tabIndex={active ? 3 : undefined}
        />
      </Link>
    </div>
  );
};
