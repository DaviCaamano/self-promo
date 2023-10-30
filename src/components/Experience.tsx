import { PropsWithChildren } from 'react';
import Image from 'next/image';
import styles from '@components/section.module.scss';

export const Experience = () => {
  return (
    <div id={'about-me'} className={`${styles.aboutMe} keen-slider__slide number-slide2`}>
      <div className={styles.container}>
        <div id={'about-me-title'} className={styles.title}>
          Experience
        </div>
        <div className={'h-[0.125rem] w-[500px] bg-latte mt-3 mb-6'} />
        <div className={'flex flex-col justify-between items-center text-[1.5rem] mb-3'}>
          <Job
            dates={'JAN 2019 ─ NOV 2020'}
            title={'Fullstack Developer && Team Lead'}
            name={'ORSINI IT'}
            thumbnails={{ sm: '/images/thumbnails/oit-sm.webp', lg: '/images/thumbnails/oit-lg.webp' }}
            techs={['React', 'Typescript', 'Node', 'Express', 'Sequelize', 'Docker', 'MYSQL', 'AWS']}
          >
            Starting as an backend intern, I was promoted a fullstack developer and team lead of a four man team in
            about three months where I managed the development of the company's front and backend.
          </Job>
          <div className={'my-4'} />
          <Job
            dates={'JAN 2021 ─ Oct 2023'}
            title={'Fullstack/Mobile Developer && Team Lead'}
            name={'QUELLIV'}
            thumbnails={{ sm: '/images/thumbnails/quelliv-sm.webp', lg: '/images/thumbnails/quelliv-lg.webp' }}
            techs={['NextJs', 'NestJs', 'Typescript', 'React-Native', 'Prisma', 'Docker', 'Postgres', 'AWS']}
          >
            Starting again as a junior developer, I was promoted after a year to team lead where I managed a team of 10.
            In addition to this, I also expanded my skillset into mobile while continuing my work as a fullstack
            developer.
          </Job>
        </div>
      </div>
    </div>
  );
};

interface JobHeaderProps extends PropsWithChildren {
  children: string;
  dates: string;
  name: string;
  techs: string[];

  title: string;
  thumbnails: {
    sm: string;
    lg: string;
  };
}
const Job = ({ dates, children, name, techs, title, thumbnails: { sm, lg } }: JobHeaderProps) => {
  return (
    <div className={'text-[1.5rem] font-thin'}>
      <div className={'job-dates mb-1'}>
        {name} {dates}
      </div>
      <div className={'job-title font-semibold text-[1.5rem]'}>{title}</div>
      <div className={'job-description text-[1rem] font-regular'}>{children}</div>
      {/*<div className={'flex flex-row mx-4 my-8'}>*/}
      {/*  <JobThumbnail alt={"Orsini-IT's website"} sm={sm} lg={lg} url={'https://oit.co/'} />*/}
      {/*  <Technologies name={name} techs={techs} />*/}
      {/*</div>*/}
    </div>
  );
};

interface JobThumbnailProps {
  sm: string;
  lg: string;
  alt: string;
  url: string;
}
const JobThumbnail = ({ alt, lg, sm, url }: JobThumbnailProps) => {
  return (
    <div className={'job-thumbnails flex justify-center items-center rounded-2xl overflow-hidden mr-6'}>
      <a href={url}>
        <picture>
          <source media={'(min-width: 768px)'} srcSet={lg} width={500} height={282} />
          <Image src={sm} alt={alt} width={280} height={158} priority />
        </picture>
      </a>
    </div>
  );
};

interface TechnologiesProps {
  name: string;
  techs: string[];
}
const Technologies = ({ name, techs }: TechnologiesProps) => {
  return (
    <div className={'technologies w-full flex flex-row flex-wrap flex-1 items-start'}>
      {techs.map((tech: string, index: number) => (
        <div
          className={
            'technology-item h-[3rem] w-[31%] border-xl bg-latte text-mug flex font-semibold rounded-3xl justify-center items-center m-1 p-1 text-[1rem]'
          }
          key={`${name}-${index}`}
        >
          {tech}
        </div>
      ))}
    </div>
  );
};
