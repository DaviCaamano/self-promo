import styles from './job-title.module.scss';

export const JobTitle = () => (
  <>
    <div className={styles.jobTitle}>
      <div className={'ml-14'}>[Web]</div>
      <div className={'ml-14'}>[Mobile]</div>
      <div className={'ml-14 mt-[2px]'}>[Fullstack]</div>
    </div>
    <div className={styles.jobTitleInner}>
        <div className={'ml-14'}>[Web]</div>
        <div className={'ml-14'}>[Mobile]</div>
        <div className={'ml-14 mt-[2px]'}>[Fullstack]</div>
    </div>
  </>
);
