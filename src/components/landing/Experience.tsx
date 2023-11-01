import { PropsWithChildren, useState } from 'react';
import Image from 'next/image';
import styles from '@components/landing/styles/section.module.scss';
import { Project } from '@components/landing/landing.interface';
import { FlowArrow } from 'phosphor-react';
import colors from '@styles/colors';

interface ExperienceProps {
  setFocusedProject: Setter<Project | undefined>;
}
export const Experience = ({ setFocusedProject }: ExperienceProps) => {
  return (
    <div id={'about-me'} className={styles.section}>
      <div className={styles.container}>
        <div id={'about-me-title'} className={styles.title}>
          Experience
        </div>
        <div className={'h-[0.0625rem] bg-sea mt-3 mb-6'} />
        <div className={'flex flex-col justify-between items-center text-[1.5rem] mb-3'}>
          <Job
            dates={'JAN 2019 ─ NOV 2020'}
            name={'ORSINI IT'}
            project={Project.oit}
            setFocusedProject={setFocusedProject}
            title={'Fullstack Developer && Team Lead'}
          >
            Starting as an backend intern, I was promoted a fullstack developer and team lead of a four man team in
            about three months where I managed the development of the company&apos;s front and backend.
          </Job>
          <div className={'my-1'} />
          <Job
            dates={'JAN 2021 ─ Oct 2023'}
            name={'QUELLIV'}
            project={Project.quelliv}
            setFocusedProject={setFocusedProject}
            title={'Fullstack/Mobile Developer && Team Lead'}
          >
            Starting again as a junior developer, I was promoted after a year to team lead where I managed a team of 10.
            In addition to this, I also expanded my skillset into mobile while continuing my work as a fullstack
            developer.
          </Job>
          <div className={'mt-8 mx-auto'}>
            <picture>
              <source media={'(min-width: 768px)'} srcSet={'/images/desktop-lg.webp'} width={800} height={297} />
              <source media={'(min-width: 480px)'} srcSet={'/images/desktop-sm.webp'} width={460} height={171} />
              <Image src={'/images/desktop-xs.webp'} alt={'My Desktop!'} width={280} height={104} priority />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
};

interface JobHeaderProps extends PropsWithChildren {
  children: string;
  dates: string;
  name: string;
  project: Project | undefined;
  setFocusedProject: Setter<Project | undefined>;
  title: string;
}

const Job = ({ dates, children, name, project, setFocusedProject, title }: JobHeaderProps) => {
  const titles = title.split('&&');
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <div
      className={`text-[1.25rem]  md:text-[1.5rem] relative font-thin rounded-2xl p-4 cursor-pointer ${hovered && 'bg-mug'}`}
      onClick={() => setFocusedProject(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute ${hovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}
        style={{ right: '2rem', top: '1rem' }}
      >
        <FlowArrow size={48} color={colors.latte} weight='fill' />
      </div>
      <div className={'job-dates mb-1'}>
        {name}
        <br className={'inline sm:hidden'} /> {dates}
      </div>
      <div className={'job-title font-semibold  text-[1.25rem]  md:text-[1.5rem] '}>
        {titles[0]} <br className={'inline sm:hidden'} />
        {titles.length && '&&'}
        {titles[1]}
      </div>
      <div className={'job-description text-[1rem] md:text-[1.25rem] font-regular'}>{children}</div>
    </div>
  );
};
