import { HandWaving } from 'phosphor-react';
import colors from '@styles/colors';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from '../styles/greeting.module.scss';
const MotionDiv = motion.div;

export const Wave = () => {
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
    <button className={`${styles.ripple} ${ripple && styles.activated}`} onClick={onClick}>
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
          style={{
            cursor: 'pointer',
          }}
        >
          <div className={'block sm:hidden'}>
            <HandWaving
              size={36}
              color={colors.void}
              weight='fill'
              className={styles.wave}
              onMouseEnter={() => setHighFive(true)}
              onMouseLeave={() => setHighFive(false)}
            />
          </div>
          <div className={'hidden sm:block'}>
            <HandWaving
              size={54}
              color={colors.void}
              weight='fill'
              className={styles.wave}
              onMouseEnter={() => setHighFive(true)}
              onMouseLeave={() => setHighFive(false)}
            />
          </div>
        </MotionDiv>
      </div>
    </button>
  );
};

const animations = {
  standby: { rotate: [0, 30, 0, 30, 0] },
  highFive: { rotate: -30 },
};
