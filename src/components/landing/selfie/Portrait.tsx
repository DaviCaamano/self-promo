import Image from 'next/image';
import styles from '../styles/selfie.module.scss';

export const Portrait = () => (
  <Image
    src={'/images/me.webp'}
    alt={"It's me, Davi!"}
    className={styles.portrait}
    width={1080}
    height={1080}
    sizes={'(min-width: 480px) 500px, 92vw'}
    priority
  />
);
