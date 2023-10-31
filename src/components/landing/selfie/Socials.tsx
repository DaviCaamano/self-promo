import colors from '@styles/colors';
import Link from 'next/link';
import { GithubLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react';

export const Socials = () => {
  return (
    <div
      className={'socials flex flex-row absolute'}
      style={{ left: '50%', top: '2rem', transform: 'translateX(-50%)' }}
    >
      <Link href={'https://github.com/DaviCaamano'} passHref target={'_blank'}>
        <GithubLogo size={44} color={colors.latte} className={'mr-4 cursor-pointer'} />
      </Link>
      <Link href={'https://www.linkedin.com/in/davi-caamano-8a440b157/'} passHref target={'_blank'}>
        <LinkedinLogo size={48} color={colors.latte} className={'mr-4 cursor-pointer'} />
      </Link>
      <Link href={'https://twitter.com/DaviSCaamano'} passHref target={'_blank'}>
        <TwitterLogo size={48} color={colors.latte} className={'cursor-pointer'} />
      </Link>
    </div>
  );
};
