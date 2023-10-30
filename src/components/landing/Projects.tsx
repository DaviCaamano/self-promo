'use client';
import sStyles from './styles/section.module.scss';
import styles from './styles/project.module.scss';
import Image from 'next/image';
import { PropsWithChildren, useState } from 'react';
import { Project as ProjectName } from './landing.interface';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ArrowSquareOut } from 'phosphor-react';
import colors from '@styles/colors';

export const Projects = () => {
  const router = useRouter();

  return (
    <div id={'about-me'} className={sStyles.section}>
      <div className={sStyles.container}>
        <div id={'about-me-title'} className={sStyles.title}>
          Projects
        </div>
        <div className={'h-[0.0625rem] bg-latte mt-3 mb-6'} />
        <div className={'flex flex-col justify-between items-center text-[1.5rem] mb-3'}>
          <Project
            id={ProjectName.oit}
            name={'ORSINI IT'}
            thumbnails={{ sm: '/images/thumbnails/oit-sm.webp', lg: '/images/thumbnails/oit-lg.webp' }}
            techs={['React', 'Typescript', 'Node', 'Express', 'Sequelize', 'Recoil', 'MYSQL']}
            url={'https://oit.co/'}
          >
            <span>
              A manager portal for a VOIP phone service start-up. I was involved in both the frontend, backend, and
              devops, bringing the company's linux hosted servers to AWS. I also served as the developer lead in a team
              of four and took part in various smaller solo projects such as a chat-bot, click-to-call chrome extension,
              and an{' '}
              <ProjectSubLink router={router} url={'https://heytaco.com/'}>
                in-house version of HeyTaco.
              </ProjectSubLink>
            </span>
          </Project>
          <div className={'my-4'} />
          <Project
            id={ProjectName.quelliv}
            name={'QUELLIV'}
            thumbnails={{ sm: '/images/thumbnails/quelliv-sm.webp', lg: '/images/thumbnails/quelliv-lg.webp' }}
            techs={['NextJs', 'NestJs', 'Typescript', 'Prisma', 'Redux', 'Postgres']}
            url={'https://quelliv.com/'}
          >
            Onboarding, purchases, offers, bookings, and subscriptions. I was tasked with starting and developing the
            initial NextJs/NestJs monorepo. Quelliv used{' '}
            <ProjectSubLink router={router} url={'https://genesisonelaser.com/2022/09/08/photobiomodulation/'}>
              Laserbiomodulation
            </ProjectSubLink>{' '}
            to aid with pain management, skincare, weight loss, and hair loss. The chat-bot, "Dr. A", used ChatGPT to
            direct clients towards the onboarding flow after helping them select which of Quelliv's services they were
            looking for.
          </Project>
          <Project
            id={ProjectName.quellivMobile}
            name={'QUELLIV (MOBILE)'}
            thumbnails={{
              sm: '/images/thumbnails/quelliv-mobile-sm.webp',
              lg: '/images/thumbnails/quelliv-mobile-lg.webp',
            }}
            techs={['React-Native', 'Typescript', 'Recoil']}
            url={'https://quelliv.com/'}
          >
            Everything offered by{' '}
            <ProjectSubLink router={router} url={'https://quelliv.com'}>
              Quelliv.com
            </ProjectSubLink>{' '}
            and more. This was first mobile app I've developed in a professional setting, of which I was the sole
            developer. One of the focuses for the team was to train customers to treat this app first and last point of
            contact for our users, even going as far as trying to discourage users from using our webapp for the same
            services. Because of the many hats this app had to wear, I am particularly proud of the way the designers
            and I were able to keep this app accessible to the company's predominantly older clientele.
          </Project>
          <Project
            id={ProjectName.notesFromSolace}
            name={'Personal: Notes From Solace'}
            thumbnails={{
              sm: '/images/thumbnails/notes-sm.webp',
              lg: '/images/thumbnails/notes-lg.webp',
            }}
            techs={['NextJs', 'NestJs', 'Typescript', 'Prisma', 'Redux', 'Postgres']}
            url={'https://www.notefromsolace.com/'}
          >
            Being a long time amateur writer, I've seen the incredible potential language models have for fiction
            writers. The intention behind this site is to allow authors to submit their works of fiction and use ChatGPT
            to generate an entire wiki about their fictional universe.
            <div className={'mb-4'} />
            The site's AI assistant will then offer subscribed customers the option to generate additional articles set
            in the same fictional universe. Is there a dragon near the shire? Solace can generate an entire backstory
            for that dragon in seconds, making sure to include references to other parts of the author's work.
            <div className={'mb-4'} />
            This project is set within a NextJs/NestJs monorepo and is still in early development.
          </Project>
        </div>
      </div>
    </div>
  );
};

interface ProjectProps extends PropsWithChildren {
  id: ProjectName;
  name: string;
  techs: string[];
  thumbnails: {
    sm: string;
    lg: string;
  };
  url: string;
}

const Project = ({ children, id, name, techs, thumbnails: { sm, lg }, url }: ProjectProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <section
      id={id}
      className={'relative text-[1.5rem] p-4 rounded-2xl hover:bg-mug'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={url}>
        <div
          className={`absolute ${hovered ? 'block' : 'hidden'} hover:bg-void rounded-[0.375rem] p-1`}
          style={{ top: '1rem', right: '2rem' }}
        >
          <ArrowSquareOut size={32} color={colors.latte} weight='fill' />
        </div>
      </Link>

      <div className={'job-dates mb-1'}>{name}</div>
      <div className={'job-description text-[1rem] font-regular'}>{children}</div>
      <div className={`visuals ${styles.visuals}`}>
        <ProjectThumbnail alt={'Project: ' + id} sm={sm} lg={lg} url={url} />
        <Technologies name={name} techs={techs} />
      </div>
    </section>
  );
};

interface JobThumbnailProps {
  sm: string;
  lg: string;
  alt: string;
  url: string;
}
const ProjectThumbnail = ({ alt, lg, sm, url }: JobThumbnailProps) => {
  return (
    <Link href={url}>
      <div
        className={
          'job-thumbnails inline-flex justify-center items-center rounded-3xl md:rounded-2xl overflow-hidden mb-6 md:mb-0 md:mr-6'
        }
      >
        <picture>
          <source media={'(min-width: 1024px)'} srcSet={lg} width={500} height={282} />
          <source media={'(min-width: 480px)'} srcSet={lg} width={400} height={256.6} />
          <Image src={sm} alt={alt} width={280} height={158} priority />
        </picture>
      </div>
    </Link>
  );
};

interface TechnologiesProps {
  name: string;
  techs: string[];
}
const Technologies = ({ name, techs }: TechnologiesProps) => {
  return (
    <div className={`technologies ${styles.technology}`}>
      {techs.map((tech: string, index: number) => (
        <div className={`technology-item ${styles.technologyItem}`} key={`${name}-${index}`}>
          {tech}
        </div>
      ))}
    </div>
  );
};

interface ProjectSubLinkProps extends PropsWithChildren {
  url: string;
  router: AppRouterInstance;
}
const ProjectSubLink = ({ children, router, url }: ProjectSubLinkProps) => (
  <span
    onClick={(event) => {
      event.preventDefault();
      router.push(url);
    }}
    className={'underline cursor-pointer'}
    style={{ textUnderlineOffset: '4px' }}
  >
    {children}
  </span>
);
