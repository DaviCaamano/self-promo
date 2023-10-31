import { HandWaving } from 'phosphor-react';
import colors from '@styles/colors';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from '../styles/greeting.module.scss';
const MotionDiv = motion.div;

interface WaveProps {
  isLandscape: boolean;
}
export const Wave = ({ isLandscape }: WaveProps) => {
  const [highFive, setHighFive] = useState<boolean>(false);
  const [ripple, setRipple] = useState<boolean>(false);
  const activated = useRef<boolean>(false);
  const onClick = () => {
    if (!activated.current) {
      setRipple(true);
      setHighFive(true);
      activated.current = true;
      setTimeout(() => {
        setRipple(false);
        setHighFive(false);
        activated.current = false;
      }, 500);
    }
  };
  return (
    <div
      className={`${styles.ripple} ${ripple && styles.activated} ${isLandscape && styles.landscape}`}
      onClick={onClick}
    >
      <div className={styles.rippleInner}>
        <MotionDiv
          animate={highFive ? 'highFive' : 'standby'}
          variants={animations}
          transition={{
            duration: highFive ? 0.1 : 0.66,
            ease: 'easeInOut',
            // @ts-ignore
            repeat: 'infinity',
            repeatDelay: 10,
          }}
        >
          <HandWaving
            color={colors.void}
            weight='fill'
            className={`${styles.wave} ${isLandscape && styles.landscape}`}
            onMouseEnter={() => setHighFive(true)}
            onMouseLeave={() => setHighFive(false)}
          />
        </MotionDiv>
      </div>
    </div>
  );
};

const animations = {
  standby: { rotate: [0, 30, 0, 30, 0] },
  highFive: { rotate: -30 },
};
