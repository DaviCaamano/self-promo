'use client';
import sStyles from './styles/section.module.scss';
import styles from './styles/project.module.scss';
import Image from 'next/image';
import { CSSProperties, PropsWithChildren, useEffect, useState } from 'react';
import { Project as ProjectName, Section, sectionIds } from './landing.interface';
import { useScrollReveal } from '@components/landing/hooks/useScrollReveal';
import { TechBadge } from '@components/landing/technologies/TechBadge';
import { TechDrawer } from '@components/landing/technologies/TechDrawer';
import { TechName, techIcons } from '@components/landing/technologies/tech-icons';
import { previewOf } from '@components/landing/project-previews';
import Link from 'next/link';

/** Three beats of `projectFlash` at 800ms each; clearing sooner would cut the last one. */
const FLASH_MS = 2400;

interface ProjectsProps {
  /** The project an Experience entry jumped to, whose title should flash. */
  flashed: ProjectName | undefined;
  setFlashed: Setter<ProjectName | undefined>;
}
export const Projects = ({ flashed, setFlashed }: ProjectsProps) => {
  const ref = useScrollReveal<HTMLDivElement>(sStyles.reveal);
  /** The badge whose write-up is open, shared by every project's tech list. */
  const [opened, setOpened] = useState<TechName | undefined>(undefined);

  /* `setFlashed` is a useState setter and so referentially stable; a handler
     rebuilt each render would restart this timer on every re-render and the
     flash would outlive its three beats. */
  useEffect(() => {
    if (!flashed) return;
    const timer = setTimeout(() => setFlashed(undefined), FLASH_MS);
    return () => clearTimeout(timer);
  }, [flashed, setFlashed]);

  return (
    <div id={sectionIds[Section.projects]} ref={ref} data-reveal-scope='' className={sStyles.section}>
      <div className={sStyles.container}>
        <h2 className={`${sStyles.title} ${sStyles.reveal}`} style={{ '--i': 0 } as CSSProperties}>
          Projects
        </h2>
        <div className={`h-[0.0625rem] bg-sea mt-3 mb-6 ${sStyles.reveal}`} style={{ '--i': 1 } as CSSProperties} />
        {/* Stretched, not centred: the cards carry a negative margin and need a
            definite width to bleed evenly on both sides. */}
        <div className={'flex flex-col justify-between text-[1.5rem] mb-3'}>
          <Project
            flashing={flashed === ProjectName.waterwriting}
            onOpen={setOpened}
            id={ProjectName.waterwriting}
            name={'Water Writing'}
            techs={['next', 'express', 'typescript', 'prisma', 'tanstack', 'postgres']}
            url={'https://www.WaterWriting.com/'}
            index={2}
          >
            Being a long time amateur writer, I've seen the incredible potential language models have for fiction
            writers. It's this potential Water Writing seeks to leverage in it's objective to provide a scalable method
            for fiction authors to convert entire bodies of work into an expansive labrinth of wiki articles. What used
            to take thousands of fans months to build, Water Writing finishes in minutes with a level of quality and
            depth best selling authors dream about.
          </Project>
          <Project
            flashing={flashed === ProjectName.legitscript}
            onOpen={setOpened}
            id={ProjectName.legitscript}
            name={'Merchant Monitoring/Onboarding/Xray'}
            techs={['react', 'typescript', 'angular', 'sequelize', 'mobx', 'postgres']}
            url={'https://www.legitscript.com/'}
            index={3}
          >
            <span>
              3 Projects built in a combination of React Js and Angular. These projects employed advanced usage of AI to
              scrape merchant pages/sites to determine if the merchant was a potential risk to the host seller's
              business.
            </span>
          </Project>
          <Project
            flashing={flashed === ProjectName.quellivMobile}
            onOpen={setOpened}
            id={ProjectName.quellivMobile}
            name={'QUELLIV (MOBILE)'}
            techs={['reactnative', 'typescript', 'recoil']}
            url={'https://quelliv.com/'}
            index={4}
          >
            Everything offered by <ProjectSubLink url={'https://quelliv.com'}>Quelliv.com</ProjectSubLink> and more.
            This was first mobile app I've developed in a professional setting, of which I was the sole developer. One
            of the focuses for the team was to train customers to treat this app first and last point of contact for our
            users, even going as far as trying to discourage users from using our webapp for the same services. Because
            of the many hats this app had to wear, I am particularly proud of the way the designers and I were able to
            keep this app accessible to the company's predominantly older clientele.
          </Project>
          <Project
            flashing={flashed === ProjectName.quelliv}
            onOpen={setOpened}
            id={ProjectName.quelliv}
            name={'QUELLIV'}
            techs={['next', 'nestjs', 'typescript', 'prisma', 'redux', 'postgres']}
            url={'https://quelliv.com/'}
            index={5}
          >
            Onboarding, purchases, offers, bookings, and subscriptions. I was tasked with starting and developing the
            initial NextJs/NestJs monorepo. Quelliv used{' '}
            <ProjectSubLink url={'https://genesisonelaser.com/2022/09/08/photobiomodulation/'}>
              Laserbiomodulation
            </ProjectSubLink>{' '}
            to aid with pain management, skincare, weight loss, and hair loss. The chat-bot, "Dr. A", used ChatGPT to
            direct clients towards the onboarding flow after helping them select which of Quelliv's services they were
            looking for.
          </Project>
          <Project
            flashing={flashed === ProjectName.oit}
            onOpen={setOpened}
            id={ProjectName.oit}
            name={'ORSINI IT'}
            techs={['react', 'typescript', 'node', 'express', 'sequelize', 'recoil', 'mysql']}
            url={'https://oit.co/'}
            index={6}
          >
            <span>
              A manager portal for a VOIP phone service start-up. I was involved in both the frontend, backend, and
              devops, bringing the company's linux hosted servers to AWS. I also served as the developer lead in a team
              of four and took part in various smaller solo projects such as a chat-bot, click-to-call chrome extension,
              and an <ProjectSubLink url={'https://heytaco.com/'}>in-house version of HeyTaco.</ProjectSubLink>
            </span>
          </Project>
        </div>
      </div>

      <TechDrawer tech={opened} onClose={() => setOpened(undefined)} />
    </div>
  );
};

interface ProjectProps extends PropsWithChildren {
  /** True while this project's title should be flashing. */
  flashing: boolean;
  id: ProjectName;
  /** Opens a technology's write-up in the shared drawer. */
  onOpen: (tech: TechName) => void;
  /** This card's place in the section's stagger. */
  index: number;
  name: string;
  techs: TechName[];
  url: string;
}

const Project = ({ children, flashing, id, index, name, onOpen, techs, url }: ProjectProps) => {
  /* Looked up rather than passed in: the landing deck turns through the same
     art, so the paths live in one place and a card only names its project. */
  const { lg, sm } = previewOf[id];

  return (
    <section
      id={id}
      /* -mx-4 cancels the p-4 so the text lines up with the section rule; the
         hover panel is what bleeds outward, not the copy. */
      className={`relative text-[1.5rem] p-4 -mx-4 rounded-2xl hover:bg-void-off ${sStyles.reveal}`}
      style={{ '--i': index } as CSSProperties}
    >
      <div className={`job-dates text-sea font-medium mb-1 uppercase ${flashing ? styles.flashing : ''}`}>{name}</div>
      <div className={'job-description text-[1rem] font-regular'}>{children}</div>
      <div className={`visuals ${styles.visuals}`}>
        <ProjectThumbnail alt={'Project: ' + id} sm={sm} lg={lg} url={url} />
        <Technologies techs={techs} onOpen={onOpen} />
      </div>
    </section>
  );
};

interface JobThumbnailProps {
  alt: string;
  lg: string;
  sm: string;
  url: string;
}
const ProjectThumbnail = ({ alt, lg, sm, url }: JobThumbnailProps) => {
  return (
    <Link href={url} passHref target={'_blank'}>
      <div
        className={`job-thumbnails ${styles.thumbnail} inline-flex justify-center items-center rounded-3xl md:rounded-2xl overflow-hidden mb-6 md:mb-0 md:mr-6`}
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
  onOpen: (tech: TechName) => void;
  techs: TechName[];
}
/** The same badges the Technologies section uses, opening the same drawer. */
const Technologies = ({ onOpen, techs }: TechnologiesProps) => {
  return (
    <div className={`technologies ${styles.technology}`}>
      {techs.map((tech) => (
        <TechBadge key={tech} icon={techIcons[tech]} onClick={() => onOpen(tech)} />
      ))}
    </div>
  );
};

interface ProjectSubLinkProps extends PropsWithChildren {
  url: string;
}
/**
 * A real anchor, not a span with a click handler. The span version was
 * unreachable by keyboard — Enter fires nothing on a span — and announced as
 * plain text, so nobody using a screen reader knew it went anywhere.
 *
 * The underline stays: inside running prose, colour alone does not distinguish
 * a link for anyone who cannot see that hue shift.
 */
const ProjectSubLink = ({ children, url }: ProjectSubLinkProps) => (
  <a href={url} target={'_blank'} rel={'noreferrer'} className={'underline'} style={{ textUnderlineOffset: '4px' }}>
    {children}
  </a>
);
