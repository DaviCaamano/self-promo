import styles from '../styles/popdie.module.scss';
import { Die } from './Die';

export const PopDie = () => {
  return (
    <div className={styles.popDieContainer}>
      <Die />
    </div>
  );
};
