import styles from '@components/section.module.scss';

export const Projects = () => {
  return (
    <div id={'about-me'} className={`${styles.aboutMe} keen-slider__slide number-slide2`}>
      <div className={styles.container}>
        <div id={'about-me-title'} className={styles.title}>
          Projects
        </div>
        <div className={'h-[0.125rem] w-[500px] bg-latte mt-3 mb-6'} />
        <div className={'flex flex-col justify-between items-center text-[1.5rem] mb-3'}></div>
      </div>
    </div>
  );
};
