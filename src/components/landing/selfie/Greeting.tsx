import styles from '../styles/greeting.module.scss';

interface GreetingsProps {
  isLandscape: boolean;
}
export const Greeting = ({ isLandscape }: GreetingsProps) => {
  return (
    <>
      <div className={`${styles.greeting} ${isLandscape && styles.landscape}`}>It's Me, Davi</div>
      <div className={`${styles.greetingInner} ${isLandscape && styles.landscape}`}>It's Me, Davi</div>
    </>
  );
};
