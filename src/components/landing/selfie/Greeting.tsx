import styles from './greeting.module.scss';
import { HandWaving } from 'phosphor-react';
import colors from '@styles/colors';
import { motion } from 'framer-motion';
const MotionDiv = motion.div;

export const Greeting = () => (
  <>
    <div className={styles.greetingBox}>
      <div className={styles.greetingInner}>
        <div className={styles.greeting}>It's Me, Davi</div>
      </div>
    </div>
    <div className={styles.greetingBoxAlt}>
      <div className={styles.greetingInner}>
        <div className={styles.greetingAlt}>
          It's Me, Davi <Wave />
        </div>
      </div>
    </div>
  </>
);

const Wave = () => {
  return (
    <MotionDiv
      style={{
        display: 'inline-block',
      }}
      animate={{ rotate: [0, 30, 0] }}
      transition={{
        duration: 0.33,
        ease: 'easeInOut',
        repeat: 1,
        repeatDelay: 0,
      }}
    >
      <HandWaving size={54} color={colors.void} weight='fill' className={styles.wave} />
    </MotionDiv>
  );
};
