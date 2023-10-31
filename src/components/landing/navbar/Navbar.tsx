import { UserCircle, House, Briefcase, Stack } from 'phosphor-react';
import styles from '../styles/navbar.module.scss';
import { Slide } from '@components/landing/landing.interface';
import { useState } from 'react';
import { ToolTipAnchor, Tooltip } from '@components/shared/tooltip/Tooltip';

interface NavBarProps {
  isLandscape: boolean;
  isMobile: boolean;
  slide: Slide;
  setSlide: Setter<Slide>;
}
export const NavBar = ({ isLandscape, isMobile, setSlide, slide }: NavBarProps) => {
  const [tooltipText, setTooltipText] = useState<number | undefined>(undefined);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const onClick = (index: number) => () => {
    setSlide(index);
  };

  const mouseOverEvents = (index: number) => ({
    onMouseEnter: () => {
      if (!isMobile) {
        setTooltipText(index);
        setShowTooltip(true);
      }
    },
    onMouseLeave: () => !isMobile && setShowTooltip(false),
  });

  const tooltipContent =
    typeof tooltipText !== 'undefined' && Pages[tooltipText] ? <span>{Pages[tooltipText]}</span> : undefined;

  return (
    <div
      className={`navbar  ${styles.navbg} ${isLandscape && styles.landscape}`}
      style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', backdropFilter: 'blur(10px)', position: 'fixed' }}
    >
      <Tooltip content={tooltipContent} anchor={ToolTipAnchor.top} distance={'8px'} open={!isMobile && showTooltip}>
        <div className={`${styles.nav} flex flex-row justify-between w-full`}>
          <House
            weight={slide === Slide.socials ? 'fill' : 'light'}
            onClick={onClick(0)}
            className={`${styles.navItem} ${isMobile && styles.mobile} ${slide === Slide.socials && styles.selected} ${
              styles.smIcon
            }`}
            {...mouseOverEvents(0)}
          />
          <UserCircle
            onClick={onClick(1)}
            weight={slide === Slide.about ? 'fill' : 'light'}
            className={`${styles.navItem} ${isMobile && styles.mobile} ${slide === Slide.about && styles.selected}`}
            {...mouseOverEvents(1)}
          />
          <Briefcase
            onClick={onClick(2)}
            weight={slide === Slide.experience ? 'fill' : 'light'}
            className={`${styles.navItem} ${isMobile && styles.mobile} ${
              slide === Slide.experience && styles.selected
            }`}
            {...mouseOverEvents(2)}
          />
          <Stack
            onClick={onClick(3)}
            weight={slide === Slide.projects ? 'fill' : 'light'}
            className={`${styles.navItem} ${isMobile && styles.mobile} ${slide === Slide.projects && styles.selected} ${
              styles.smIcon
            }`}
            {...mouseOverEvents(3)}
          />
        </div>
      </Tooltip>{' '}
    </div>
  );
};

const Pages = ['Socials', 'About Me', 'Experience', 'Projects'];
