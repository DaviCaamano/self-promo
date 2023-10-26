import styles from './job-title.module.scss';

export const JobTitle = () => (
  <>
    <div className={styles.jobTitleBoxRight}>
      <div className={styles.jobTitleInnerRight}>
        <div className={styles.jobTitleRight}>Fullstack and Mobile Developer</div>
      </div>
    </div>
    <div className={styles.jobTitleBoxLeft}>
      <div className={styles.jobTitleInnerLeft}>
        <div className={styles.jobTitleLeft}>Fullstack and Mobile Developer</div>
      </div>
    </div>
    <div className={styles.jobTitleBoxCenter}>
      <div className={styles.jobTitleCenter}>Fullstack and Mobile Developer</div>
    </div>
  </>
);
