import styles from './greeting.module.scss';

export const Greeting = () => (
  <>
    <div className={styles.greeting}>It's Me, Davi</div>
    <div className={styles.greetingInner}>It's Me, Davi</div>
  </>
);
