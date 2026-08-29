'use client';
import { CSSProperties, useState } from 'react';
import { CaretDown } from 'phosphor-react';
import sStyles from './styles/section.module.scss';
import styles from './styles/technologies.module.scss';
import { TechBadge } from './technologies/TechBadge';
import { TechDrawer } from './technologies/TechDrawer';
import { largeBadges, smallBadges, TechName, techIcons } from './technologies/tech-icons';
import { useScrollReveal } from '@components/landing/hooks/useScrollReveal';
import { Section, sectionIds } from '@components/landing/landing.interface';

/** Where the small badges pick up the stagger the large ones left off. */
const smallBadgeOffset = 5 + largeBadges.length;

export const Technologies = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [opened, setOpened] = useState<TechName | undefined>(undefined);
  const ref = useScrollReveal<HTMLDivElement>(sStyles.reveal);

  return (
    <div id={sectionIds[Section.technologies]} ref={ref} data-reveal-scope='' className={sStyles.section}>
      <div className={sStyles.container}>
        <div className={`${sStyles.title} ${sStyles.reveal}`} style={{ '--i': 0 } as CSSProperties}>
          Technologies
        </div>
        <div className={`h-[0.0625rem] bg-sea mt-3 mb-6 ${sStyles.reveal}`} style={{ '--i': 1 } as CSSProperties} />

        {/* Holds the badge scale, which both groups below read — the small ones
            sit outside the two column row and would otherwise lose it. */}
        <div className={styles.stack}>
          <div className={styles.layout}>
            <div className={styles.prose}>
              <blockquote className={`${styles.quote} ${sStyles.reveal}`} style={{ '--i': 2 } as CSSProperties}>
                <span>
                  <span className={styles.mark} aria-hidden>
                    &ldquo;
                  </span>
                  A true master is an eternal student
                  <span className={`${styles.mark} ${styles.markClose}`} aria-hidden>
                    &rdquo;
                  </span>
                </span>
                <cite className={styles.attribution}>&mdash; Master Yi</cite>
              </blockquote>
              <p className={`${styles.description} ${sStyles.reveal}`} style={{ '--i': 3 } as CSSProperties}>
                Before coding, my first love was teaching. When I was growing up, I wanted to be a teacher. As an
                education major, I wanted to spend my life learning and growing.
              </p>
              <p className={`${styles.punchline} ${sStyles.reveal}`} style={{ '--i': 4 } as CSSProperties}>
                So I switched to Computer Science instead.
              </p>
            </div>

            <div className={`${styles.group} ${styles.large}`}>
              {largeBadges.map((name, index) => (
                <TechBadge
                  icon={techIcons[name]}
                  key={name}
                  onClick={() => setOpened(name)}
                  className={sStyles.reveal}
                  style={{ '--i': 4 + index } as CSSProperties}
                />
              ))}
            </div>
          </div>

          {/* Outside the row on purpose: the small badges run the full width
              rather than leaving the text's half of it empty. */}
          <button
            type={'button'}
            className={`${styles.expand} ${sStyles.reveal}`}
            style={{ '--i': smallBadgeOffset } as CSSProperties}
            onClick={() => setExpanded((open) => !open)}
            aria-controls={'small-technology-badges'}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'And plenty more'}
            <CaretDown className={`${styles.caret} ${expanded && styles.flipped}`} weight={'bold'} />
          </button>
          <div
            id={'small-technology-badges'}
            className={`${styles.group} ${styles.small} ${expanded && styles.expanded}`}
          >
            {smallBadges.map((name, index) => (
              <TechBadge
                icon={techIcons[name]}
                key={name}
                onClick={() => setOpened(name)}
                className={sStyles.reveal}
                style={{ '--i': smallBadgeOffset + 1 + index } as CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>

      <TechDrawer tech={opened} onClose={() => setOpened(undefined)} />
    </div>
  );
};
