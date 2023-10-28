import { UserCircle, AddressBook, Browser } from 'phosphor-react';
import { PropsWithChildren } from 'react';
import styles from './navbar.module.scss';
import colors from '@styles/colors';

type JumpTo = (index: number) => void;
interface NavBarProps {
  jumpTo: JumpTo | undefined;
}
export const NavBar = ({ jumpTo }: NavBarProps) => {
  const onClick = (index: number) => () => {
    jumpTo?.(index);
  };
  return (
    <div
      className={`navbar  ${styles.navbg}`}
      style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', backdropFilter: 'blur(10px)' }}
    >
      <Item onClick={onClick(0)}>
        <UserCircle size={66} color={colors.latte} weight='fill' />
      </Item>
      <Item onClick={onClick(1)}>
        <AddressBook size={66} color={colors.latte} weight='fill' />
      </Item>
      <Item onClick={onClick(2)}>
        <Browser size={66} color={colors.latte} weight='fill' />
      </Item>
    </div>
  );
};

interface ItemProps extends PropsWithChildren {
  onClick: () => void;
}
const Item = ({ children, onClick }: ItemProps) => {
  return (
    <div
      className={'w-[4rem] h-[4rem] rounded-xl bg-dim flex justify-center items-center cursor-pointer'}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
