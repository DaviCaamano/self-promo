import { CSSProperties, PropsWithChildren, useState } from 'react';
import Image from 'next/image';
import styles from '@components/landing/styles/section.module.scss';
import jobStyles from '@components/landing/styles/experience.module.scss';
import { Project, Section, sectionIds } from '@components/landing/landing.interface';
import { ArrowsInLineVertical, ArrowsOutLineVertical, FlowArrow, Plus } from 'phosphor-react';
import { useScrollReveal } from '@components/landing/hooks/useScrollReveal';
import { ToolTipAnchor, Tooltip } from '@components/shared/tooltip/Tooltip';

interface ExperienceProps {
  /** Scrolls to a project's write-up and flashes its title. */
  onShowProject: (project: Project) => void;
}

/** Ids of every collapsible write-up, in page order. */
const JOBS = [Project.waterwriting, Project.legitscript, Project.quelliv, Project.oit];

export const Experience = ({ onShowProject }: ExperienceProps) => {
  const ref = useScrollReveal<HTMLDivElement>(styles.reveal);

  /** The write-ups currently open. Empty is the resting state — all collapsed. */
  const [open, setOpen] = useState<Project[]>([]);
  const allOpen = open.length === JOBS.length;

  const toggle = (job: Project) =>
    setOpen((current) => (current.includes(job) ? current.filter((id) => id !== job) : [...current, job]));

  return (
    <div id={sectionIds[Section.experience]} ref={ref} data-reveal-scope='' className={styles.section}>
      <div className={styles.container}>
        <div className={`${jobStyles.header} ${styles.reveal}`} style={{ '--i': 0 } as CSSProperties}>
          <span className={styles.title}>Experience</span>
          <button
            type={'button'}
            className={jobStyles.expandAll}
            onClick={() => setOpen(allOpen ? [] : [...JOBS])}
            aria-label={allOpen ? 'Collapse all roles' : 'Expand all roles'}
            aria-expanded={allOpen}
          >
            {allOpen ? <ArrowsInLineVertical weight={'bold'} /> : <ArrowsOutLineVertical weight={'bold'} />}
          </button>
        </div>
        <div className={`h-[0.0625rem] bg-sea mt-3 mb-6 ${styles.reveal}`} style={{ '--i': 1 } as CSSProperties} />
        {/* Stretched, not centred: the cards carry a negative margin and need a
            definite width to bleed evenly on both sides. */}
        <div className={'flex flex-col justify-between text-[1.5rem] mb-3'}>
          <Job
            tipBelow
            dates={'JAN 2026 ─ CURRENT'}
            name={'WATER WRITING'}
            project={Project.waterwriting}
            title={'Founder & Product Manager'}
            index={2}
            open={open.includes(Project.waterwriting)}
            onToggle={() => toggle(Project.waterwriting)}
            onShowProject={onShowProject}
          >
            I founded Water Writing, a solo-developed platform that automatically generates comprehensive wikis for
            authors' bodies of work. As the sole engineer and product owner, I independently managed all facets of the
            project, including full-stack development, cloud hosting, and project roadmap. This experience allowed me to
            build a scalable, end-to-end software product completely from scratch.
          </Job>
          <div className={'my-1'} />
          <Job
            dates={'JUN 2024 ─ OCT 2025'}
            name={'LEGIT SCRIPT'}
            project={Project.legitscript}
            title={'Fullstack Developer'}
            index={3}
            open={open.includes(Project.legitscript)}
            onToggle={() => toggle(Project.legitscript)}
            onShowProject={onShowProject}
          >
            Joining the team as a fullstack developer, I helped build 3 new products from the ground up. Merchant Xray,
            Merchant Monitoring, and Merchant Onboarding. These AI powered products helped clients track problematic
            merchants and onboard new ones.
          </Job>
          <div className={`my-8 flex justify-center ${styles.reveal}`} style={{ '--i': 4 } as CSSProperties}>
            <picture>
              <source media={'(min-width: 768px)'} srcSet={'/images/desktop-lg.webp'} width={800} height={297} />
              <source media={'(min-width: 480px)'} srcSet={'/images/desktop-sm.webp'} width={460} height={171} />
              <Image src={'/images/desktop-xs.webp'} alt={'My Desktop!'} width={280} height={104} priority />
            </picture>
          </div>
          <Job
            dates={'JAN 2021 ─ MAR 2024'}
            name={'QUELLIV'}
            project={Project.quelliv}
            title={'Fullstack/Mobile Developer && Team Lead'}
            index={5}
            open={open.includes(Project.quelliv)}
            onToggle={() => toggle(Project.quelliv)}
            onShowProject={onShowProject}
          >
            Starting again as a junior developer, I was promoted to team lead where I managed a team of 10. In addition
            to this, I also expanded my skillset into mobile while continuing my work as a fullstack developer.
          </Job>
          <Job
            dates={'JAN 2019 ─ OCT 2020'}
            name={'ORSINI IT'}
            project={Project.oit}
            title={'Fullstack Developer && Team Lead'}
            index={6}
            open={open.includes(Project.oit)}
            onToggle={() => toggle(Project.oit)}
            onShowProject={onShowProject}
          >
            Starting as an backend intern, I was promoted to a fullstack developer and team lead of a four man team in
            about three months where I managed the development of the company{"'"}s front and backend.
          </Job>
        </div>
      </div>
    </div>
  );
};

interface JobHeaderProps extends PropsWithChildren {
  dates: string;
  /** This card's place in the section's stagger. */
  index: number;
  name: string;
  /** Whether this card's write-up is showing, owned by the section. */
  open: boolean;
  onShowProject: (project: Project) => void;
  onToggle: () => void;
  /**
   * Drops this entry's tooltip under its button rather than over it. Only the
   * topmost entry needs it: the section heading sits directly above, and the
   * expand-all control there is exactly what the tip would land on.
   */
  tipBelow?: boolean;
  /** The write-up further down the page that this job produced. */
  project: Project;
  title: string;
}

const Job = ({ dates, children, index, name, onShowProject, onToggle, open, project, tipBelow, title }: JobHeaderProps) => {
  const titles = title.split('&&');
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      /* -mx-4 cancels the p-4 so the text lines up with the section rule; the
         hover panel is what bleeds outward, not the copy. */
      className={`text-[1.25rem]  md:text-[1.5rem] relative font-thin rounded-2xl p-4 -mx-4 ${styles.reveal} ${
        hovered && 'bg-void-off'
      }`}
      style={{ '--i': index } as CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Follows the job through to its write-up further down the page. Its own
          control now, because the card body toggles the summary instead.

          The anchor is positioned inline rather than by class: Tooltip hardcodes
          `relative` on its wrapper, and a competing class would come down to
          stylesheet order. */}
      <Tooltip
        anchor={tipBelow ? ToolTipAnchor.bottom : ToolTipAnchor.top}
        distance={'0.625rem'}
        content={<span className={jobStyles.tip}>{`Jump to ${name} Project`}</span>}
        wrapper={{ style: { position: 'absolute', top: '1rem', right: '1.5rem' } }}
      >
        <button
          type={'button'}
          onClick={() => onShowProject(project)}
          className={`${jobStyles.jump} ${hovered ? jobStyles.jumpVisible : ''}`}
          aria-label={`Jump to ${name} Project`}
          tabIndex={hovered ? undefined : -1}
        >
          <FlowArrow weight={'fill'} />
        </button>
      </Tooltip>

      <button type={'button'} onClick={onToggle} className={jobStyles.summary} aria-expanded={open}>
        <Plus className={`${jobStyles.toggleIcon} ${open ? jobStyles.open : ''}`} weight={'bold'} aria-hidden />
        <span>
          <span className={'job-dates mb-1 block'}>
            {name}
            <br className={'inline sm:hidden'} /> {dates}
          </span>
          <span className={'job-title font-semibold text-[1.25rem] md:text-[1.5rem] block'}>
            {titles[0]}
            {titles.length > 1 && (
              <>
                <br className={'inline sm:hidden'} />
                {'&&'}
                {titles[1]}
              </>
            )}
          </span>
        </span>
      </button>

      {/* Animated on a grid row rather than max-height: `1fr` resolves to the
          copy's real height, so the open state never guesses and tall entries
          do not snap at the end of the transition. */}
      <div className={jobStyles.reveal} data-open={open}>
        <div className={jobStyles.revealInner}>
          <div className={'job-description text-[1rem] md:text-[1.25rem] font-regular'}>{children}</div>
        </div>
      </div>
    </div>
  );
};
