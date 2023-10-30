import { AddressBook, Browser, Buildings, UserCircle, CaretDown } from 'phosphor-react';
import { PropsWithChildren } from 'react';
import styles from './navbar.module.scss';
import colors from '@styles/colors';
import { Slide } from '@components/landing/landing.interface';

interface NavBarProps {
  slide: Slide;
  setSlide: Setter<Slide>;
}
export const NavBar = ({ slide, setSlide }: NavBarProps) => {
  const onClick = (index: number) => () => {
    setSlide(index);
  };
  return (
    <div
      className={`navbar  ${styles.navbg}`}
      style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', backdropFilter: 'blur(10px)' }}
    >
      <Item onClick={onClick(0)} index={Slide.selfie} slide={slide}>
        <div className={'block sm:hidden'}>
          <UserCircle size={30} color={colors.latte} weight='fill' />
        </div>
        <div className={'hidden sm:block'}>
          <UserCircle size={50} color={colors.latte} weight='fill' />
        </div>
      </Item>
      <Item onClick={onClick(1)} index={Slide.about} slide={slide}>
        <div className={'block sm:hidden'}>
          <AddressBook size={30} color={colors.latte} weight='fill' />
        </div>
        <div className={'hidden sm:block'}>
          <AddressBook size={50} color={colors.latte} weight='fill' />
        </div>
      </Item>
      <Item onClick={onClick(2)} index={Slide.experience} slide={slide}>
        <div className={'block sm:hidden'}>
          <Buildings size={30} color={colors.latte} weight='fill' />
        </div>
        <div className={'hidden sm:block'}>
          <Buildings size={50} color={colors.latte} weight='fill' />
        </div>
      </Item>
      <Item onClick={onClick(3)} index={Slide.projects} slide={slide}>
        <div className={'block sm:hidden'}>
          <Browser size={30} color={colors.latte} weight='fill' />
        </div>
        <div className={'hidden sm:block'}>
          <Browser size={50} color={colors.latte} weight='fill' />
        </div>
      </Item>
    </div>
  );
};

interface ItemProps extends PropsWithChildren {
  index: Slide;
  onClick: () => void;
  slide: Slide;
}
const Item = ({ children, index, onClick, slide }: ItemProps) => {
  console.log('navbar:', index === slide, index, slide);
  return (
    <div
      className={
        'w-[2.5rem] h-[2.5rem] sm:w-[3.5rem] sm:h-[3.5rem] relative rounded-xl bg-dim flex justify-center items-center cursor-pointer'
      }
      onClick={onClick}
    >
      <Indicator active={index === slide} />
      {children}
    </div>
  );
};

interface IndicatorProps {
  active: boolean;
}
const Indicator = ({ active }: IndicatorProps) => {
  if (!active) {
    return null;
  }
  return (
    <div className={styles.indicator}>
      <div className={'block sm:hidden relative'} style={{ top: '0.3125rem' }}>
        <CaretDown size={24} color={colors.latte} weight='fill' />
      </div>
      <div className={'hidden sm:block'}>
        <CaretDown size={32} color={colors.latte} weight='fill' />
      </div>
    </div>
  );
};
