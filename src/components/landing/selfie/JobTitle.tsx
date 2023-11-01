import styles from '../styles/job-title.module.scss';

interface JobTitleProps {
  isLandscape: boolean;
}
export const JobTitle = ({ isLandscape }: JobTitleProps) => {
  return (
    <>
      <div className={`${styles.jobTitle} ${isLandscape && styles.landscape}`}>
        <div className={'ml-14 text-sea'}>[Web]</div>
        <div className={'ml-14 text-sea'}>[Mobile]</div>
        <div className={'ml-14 text-sea mt-[2px]'}>[Fullstack]</div>
      </div>
      <div className={`${styles.jobTitleInner} ${isLandscape && styles.landscape}`}>
        <div className={'ml-14'}>[Web]</div>
        <div className={'ml-14'}>[Mobile]</div>
        <div className={'ml-14 mt-[2px]'}>
          [<InlineSpacer />
          Fullstack]
        </div>
      </div>
    </>
  );
};

const InlineSpacer = () => <span className={'mr-[3px] inline-block '} />;
