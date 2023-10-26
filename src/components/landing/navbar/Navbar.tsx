import { UserCircle } from 'phosphor-react';
import { PropsWithChildren } from 'react';
import styles from './navbar.module.scss';
import colors from '@styles/colors';
import Link from 'next/link';
export const NavBar = () => {
  return (
    <div
      className={`navbar  ${styles.navbg}`}
      style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', backdropFilter: 'blur(10px)' }}
    >
      <Item link={'/#about-me'}>
        <UserCircle size={66} color={colors.latte} weight='fill' />
      </Item>
    </div>
  );
};

interface ItemProps extends PropsWithChildren {
  link: string;
}
const Item = ({ children, link }: ItemProps) => {
  return (
    <Link href={link}>
      <div className={'w-[4rem] h-[4rem] rounded-xl bg-dim flex justify-center items-center'}>{children}</div>
    </Link>
  );
};
