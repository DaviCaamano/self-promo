import colors from '@styles/colors';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { GithubLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react';
import styles from '../styles/selfie.module.scss';
interface SocialsProps {
  isLandscape: boolean;
}
/** `--i` is this icon's place in the intro stagger; the delay is in the stylesheet. */
export const Socials = ({ isLandscape }: SocialsProps) => {
  return (
    <div className={`socials ${styles.socialsContainer} ${isLandscape && styles.landscape}`}>
      <Link
        href={'https://github.com/DaviCaamano'}
        passHref
        target={'_blank'}
        className={styles.socialLink}
        style={{ '--i': 0 } as CSSProperties}
      >
        <GithubLogo
          color={colors.sea}
          className={`${styles.gitHub} ${isLandscape && styles.landscape}`}
        />
      </Link>
      <Link
        href={'https://www.linkedin.com/in/davi-caamano-8a440b157/'}
        passHref
        target={'_blank'}
        className={styles.socialLink}
        style={{ '--i': 1 } as CSSProperties}
      >
        <LinkedinLogo
          color={colors.sea}
          className={`${styles.socials} ${isLandscape && styles.landscape}`}
        />
      </Link>
      <Link
        href={'https://twitter.com/DaviSCaamano'}
        passHref
        target={'_blank'}
        className={styles.socialLink}
        style={{ '--i': 2 } as CSSProperties}
      >
        <TwitterLogo
          color={colors.sea}
          className={`${styles.socials} ${isLandscape && styles.landscape}`}
        />
      </Link>
    </div>
  );
};
