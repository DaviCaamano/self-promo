import colors from '@styles/colors';
import Link from 'next/link';
import { GithubLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react';
import styles from '../styles/selfie.module.scss';
interface SocialsProps {
  isLandscape: boolean;
}
export const Socials = ({ isLandscape }: SocialsProps) => {
  return (
    <div className={`socials ${styles.socialsContainer} ${isLandscape && styles.landscape}`}>
      <Link href={'https://github.com/DaviCaamano'} passHref target={'_blank'}>
        <GithubLogo color={colors.sea} className={`${styles.gitHub} ${isLandscape && styles.landscape}`} />
      </Link>
      <Link href={'https://www.linkedin.com/in/davi-caamano-8a440b157/'} passHref target={'_blank'}>
        <LinkedinLogo color={colors.sea} className={`${styles.socials} ${isLandscape && styles.landscape}`} />
      </Link>
      <Link href={'https://twitter.com/DaviSCaamano'} passHref target={'_blank'}>
        <TwitterLogo color={colors.sea} className={`${styles.socials} ${isLandscape && styles.landscape}`} />
      </Link>
    </div>
  );
};
