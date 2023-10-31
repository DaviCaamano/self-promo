import sStyles from './styles/section.module.scss';
import styles from './styles/about-us.module.scss';
import { Files } from 'phosphor-react';
import Link from 'next/link';
import colors from '@styles/colors';
export const AboutMe = () => {
  return (
    <div id={'about-me'} className={sStyles.section}>
      <div className={sStyles.container}>
        <div id={'about-me-title'} className={sStyles.title}>
          About Me
        </div>
        <div className={'h-[0.0625rem] bg-latte mt-3 mb-6'} />
        <ContactInfo />
        <div className={'text-[1rem] md:text-[1.25rem]'}>
          {"Born in Brazil, raised in Miami, I have fallen in love with every job and team I've ever been a part " +
            'of. From what I can tell: '}
          <Link href={'https://mega.nz/folder/159lWLoa#A1Yh7FVpfaoRLnU5HeihSA'} target={'_blank'}>
            <span className={'underline'} style={{ textUnderlineOffset: '4px', fontWeight: '300' }}>
              it does seem as though the feeling has been mutual.
            </span>
          </Link>
          <div className={'mb-3'} />
          Never content with good enough, I&apos;ve accelerated from entry-to-supervisor in every position I have held
          dating back to my first job as a cashier to my most recent position as developer lead. Working in my dream
          industry as a has done nothing to slow me down. Even outside my professional life where I am working on
          developing a small business for AI driven assistance for creative writing.
        </div>
        <div className={'w-full flex flex-col mt-8 md:px-8 font-normal text-[1.25rem] justify-center'}>
          <span>Letters of Recommendation:</span>
          <div className={'h-[0.0625rem] bg-latte mt-2 mb-6'} />

          <div className={styles.downloadContainer}>
            <DownloadButton
              url={'/pdfs/recommendations/steve-swanson.pdf'}
              name={'Steve Swanson'}
              title={'Engineering Dir.'}
            />
            <DownloadButton url={'/pdfs/recommendations/hines-trans.pdf'} name={'Hines Tran'} title={'Product Owner'} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfo = () => (
  <div className={styles.contactInfo}>
    <div>
      <span className={styles.contactInfoField}>Email:</span>
      <a href={'mailto:DaviSantaCaamano@gmail.com'} style={{ fontWeight: '300' }}>
        DaviSantaCaamano@gmail.com
      </a>
    </div>
    <div>
      <span className={styles.contactInfoField}>Phone:</span>
      <a href={'tel:786-879-0802'} style={{ fontWeight: '300' }}>
        (786) 879-0802
      </a>
    </div>
  </div>
);

interface DownloadButtonProps {
  name: string;
  title: string;
  url: string;
}
const DownloadButton = ({ name, title, url }: DownloadButtonProps) => (
  <Link href={url} className={'flex justify-center mb-4 sm:mb-0'} target={'_blank'}>
    <div className={styles.download}>
      <div className={styles.downloadTitle}>{title}</div>
      <div className={styles.downloadName}>{name}</div>
      <Files size={200} color={colors.void} weight='fill' />
    </div>
  </Link>
);
