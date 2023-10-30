import styles from './job-title.module.scss';

export const JobTitle = () => (
  <>
    <div className={styles.jobTitle}>
      <div className={'ml-14'}>[<InlineSpacerLg />Web]</div>
      <div className={'ml-14'}>
        [<InlineSpacer />
        Mobile]
      </div>
      <div className={'ml-14 mt-[2px]'}>
        [<InlineSpacer />
        Fullstack]
      </div>
    </div>
    <div className={styles.jobTitleInner}>
      <div className={'ml-14'}>[Web]</div>
      <div className={'ml-14'}>
        [<InlineSpacer />Mobile]
      </div>
      <div className={'ml-14 mt-[2px]'}>
        [<InlineSpacer />
        Fullstack]
      </div>
    </div>
  </>
);

const InlineSpacer = () => <span className={'mr-[1px] inline-block '} />;
const InlineSpacerLg = () => <span className={'mr-[4px] inline-block '} />;
