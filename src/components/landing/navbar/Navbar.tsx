import { AddressBook, Browser, Buildings, UserCircle, CaretDown } from 'phosphor-react';
import { PropsWithChildren } from 'react';
import styles from '../styles/navbar.module.scss';
import colors from '@styles/colors';
import { Slide } from '@components/landing/landing.interface';
import { Tooltip, ToolTipAnchor } from '@components/shared/tooltip/Tooltip';

interface NavBarProps {
  isMobile: boolean;
  slide: Slide;
  setSlide: Setter<Slide>;
}
export const NavBar = ({ isMobile, slide, setSlide }: NavBarProps) => {
  const onClick = (index: number) => () => {
    setSlide(index);
  };
  return (
    <div
      className={`navbar  ${styles.navbg}`}
      style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', backdropFilter: 'blur(10px)' }}
    >
      <Item onClick={onClick(0)} index={Slide.socials} slide={slide} isMobile={isMobile}>
        <div className={'block sm:hidden'}>
          <UserCircle size={30} color={colors.latte} weight='fill' />
        </div>
        <div className={'hidden sm:block'}>
          <UserCircle size={50} color={colors.latte} weight='fill' />
        </div>
      </Item>
      <Item onClick={onClick(1)} index={Slide.about} slide={slide} isMobile={isMobile}>
        <div className={'block sm:hidden'}>
          <AddressBook size={30} color={colors.latte} weight='fill' />
        </div>
        <div className={'hidden sm:block'}>
          <AddressBook size={50} color={colors.latte} weight='fill' />
        </div>
      </Item>
      <Item onClick={onClick(2)} index={Slide.experience} slide={slide} isMobile={isMobile}>
        <div className={'block sm:hidden'}>
          <Buildings size={30} color={colors.latte} weight='fill' />
        </div>
        <div className={'hidden sm:block'}>
          <Buildings size={50} color={colors.latte} weight='fill' />
        </div>
      </Item>
      <Item onClick={onClick(3)} index={Slide.projects} slide={slide} isMobile={isMobile}>
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
  isMobile: boolean;
  onClick: () => void;
  slide: Slide;
}
const Item = ({ children, index, isMobile, onClick, slide }: ItemProps) => {
  return (
    <Tooltip
      content={<span>{Pages[index]}</span>}
      anchor={ToolTipAnchor.top}
      distance={'8px'}
      open={!isMobile ? undefined : false}
    >
      <div
        className={styles.navItem}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClick?.();
        }}
        onTouchStart={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <Indicator active={index === slide} />
        {children}
      </div>
    </Tooltip>
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
        <CaretDown size={24} color={colors.forest} weight='fill' style={caretStyle} />
      </div>
      <div className={'hidden sm:block'}>
        <CaretDown size={32} color={colors.forest} weight='fill' style={caretStyle} />
      </div>
    </div>
  );
};

const caretStyle = {
  filter: 'drop-shadow(rgba(0, 0, 0, 1) 0 1px 3px)',
};

const Pages = ['Socials', 'About Me', 'Experience', 'Projects'];
