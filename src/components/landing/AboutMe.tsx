import sStyles from './styles/section.module.scss';
import styles from './styles/about-us.module.scss';
import { DownloadSimple } from 'phosphor-react';
import Link from 'next/link';
import colors from '@styles/colors';

interface AboutMeProps {
  active: boolean;
}
export const AboutMe = ({ active }: AboutMeProps) => {
  return (
    <div id={'about-me'} className={sStyles.section}>
      <div className={sStyles.container}>
        <div id={'about-me-title'} className={sStyles.title}>
          About Me
        </div>
        <div className={'h-[0.0625rem] bg-sea mt-3 mb-6'} />
        <ContactInfo active={active} />
        <div className={'text-[1rem] md:text-[1.25rem]'}>
          {"Born in Brazil, raised in Miami, I have fallen in love with every team I've ever been a part " +
            'of. From what I can tell: '}
          <Link href={'https://mega.nz/folder/159lWLoa#A1Yh7FVpfaoRLnU5HeihSA'} target={'_blank'}>
            <span
              className={'underline'}
              style={{ textUnderlineOffset: '4px', fontWeight: '300' }}
              tabIndex={active ? 3 : undefined}
            >
              it does seem as though the feeling has been mutual.
            </span>
          </Link>
          <div className={'mb-3'} />
          Never content with good enough, I{"'"}ve accelerated from entry-to-supervisor in every position I have held
          dating back to my first job as a cashier to my most recent position as developer lead. Working in my dream
          industry has done nothing to slow me down. Even outside my professional life where I am working on developing
          a small business for AI driven assistance for authors.
        </div>

        <Resume active={active} />
        <Letters />
      </div>
    </div>
  );
};

const ContactInfo = ({ active }: { active: boolean }) => (
  <div className={'contact-info'}>
    <div>
      <span className={styles.contactInfoField}>Email:</span>
      <Link
        href={'mailto:DaviSantaCaamano@gmail.com'}
        className={styles.contactInfoText}
        tabIndex={active ? 1 : undefined}
      >
        DaviSantaCaamano@gmail.com
      </Link>
    </div>
    <div>
      <span className={styles.contactInfoField}>Phone:</span>
      <a href={'tel:786-879-0802'} className={styles.contactInfoText} tabIndex={active ? 2 : undefined}>
        (786) 879-0802
      </a>
    </div>
  </div>
);

const Resume = ({ active }: { active: boolean }) => (
  <>
    <div className={'mt-6 font-normal text-[1.25rem]'}>Downloads:</div>
    <div className={'w-full flex flex-col md:px-8 font-normal text-[1.25rem] justify-center'}>
      <div className={styles.downloadContainer}>
        <Link
          href={'/pdfs/resume/Davi Caamano - Resume.pdf'}
          className={'w-full'}
          target={'_blank'}
          style={{ zIndex: 1 }}
          tabIndex={active ? 4 : undefined}
        >
          <div className={'h-[0.125rem] bg-latte mt-2'} />
          <div className={`${styles.download} ${styles.last}`}>
            <div className={styles.downloadTitle}>Resume</div>
            <DownloadSimple size={32} color={colors.sea} weight='regular' />
          </div>
        </Link>
      </div>
    </div>
  </>
);

const Letters = () => (
  <div className={'w-full flex flex-col mt-6 md:px-8 font-normal text-[1.25rem] justify-center'}>
    <span>Letters of Recommendation:</span>
    <div className={'h-[0.125rem] bg-latte mt-2'} />
    <div className={styles.downloadContainer}>
      <DownloadRow
        url={'/pdfs/recommendations/aaron-everly.pdf'}
        name={'Aaron Everly'}
        title={'Legit Script: UI Designer'}
        tabIndex={8}
        last
      />
      <DownloadRow
        url={'/pdfs/recommendations/andrei-budoi.pdf'}
        name={'Andrei Budoi'}
        title={'Legit Script: Team Lead'}
        tabIndex={7}
      />
      <DownloadRow
        url={'/pdfs/recommendations/hines-tran.pdf'}
        name={'Hines Tran'}
        title={'Shift Pixy: Product Owner'}
        tabIndex={6}
      />
      <DownloadRow
        url={'/pdfs/recommendations/steve-swanson.pdf'}
        name={'Steve Swanson'}
        title={'Shift Pixy: Director of Engineering'}
        tabIndex={5}
      />
    </div>
  </div>
);

interface DownloadButtonProps {
  name: string;
  last?: boolean;
  tabIndex: number;
  title: string;
  url: string;
}
const DownloadRow = ({ name, last, tabIndex, title, url }: DownloadButtonProps) => (
  <Link href={url} className={'w-full'} target={'_blank'} tabIndex={tabIndex}>
    <div className={`${styles.download}${last ? ' ' + styles.last: ''}`}>
      <div className={'w-full h-full flex flex-col justify-center'}>
        <div className={`${styles.downloadTitle} hidden sm:block`}>
          {title}, {name}
        </div>
        <div className={`${styles.downloadTitle} block sm:hidden`}>{title},</div>
        <div className={`${styles.downloadTitle} block sm:hidden`}>{name}</div>
      </div>
      <DownloadSimple size={32} color={colors.sea} weight='regular' />
    </div>
  </Link>
);
