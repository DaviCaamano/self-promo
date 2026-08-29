import { CSSProperties, Fragment } from 'react';
import { ArrowUpRight } from 'phosphor-react';
import styles from '../styles/pull-quote.module.scss';
import { featuredLetter } from '@components/landing/letters';

interface PullQuoteProps {
  onShowLetter: (id: string) => void;
}

/**
 * The landing page's headline testimonial. Every word is its own inline-block so
 * the load animation can stagger them; the spans stay separated by real
 * whitespace because adjacent inline-blocks with no space between them give the
 * line breaker nowhere to wrap.
 */
export const PullQuote = ({ onShowLetter }: PullQuoteProps) => {
  const words = featuredLetter.quote.split(' ');

  return (
    <button
      type={'button'}
      className={styles.pullQuote}
      onClick={() => onShowLetter(featuredLetter.id)}
      aria-label={`Read the letter of recommendation from ${featuredLetter.name} in full`}
    >
      <span className={styles.glow} aria-hidden />

      <blockquote className={styles.quote}>
        <span className={styles.mark} aria-hidden>
          &ldquo;
        </span>
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className={styles.word} style={{ '--i': index } as CSSProperties}>
              {word}
            </span>{' '}
          </Fragment>
        ))}
        <span className={`${styles.mark} ${styles.markClose}`} aria-hidden>
          &rdquo;
        </span>
      </blockquote>

      <span className={styles.rule} aria-hidden />

      <cite className={styles.attribution}>
        <span className={styles.author}>{featuredLetter.name}</span>
        <span className={styles.role}>
          {featuredLetter.title}, {featuredLetter.company}
        </span>
      </cite>

      <span className={styles.cue}>
        Read the letter
        <ArrowUpRight size={16} weight={'bold'} aria-hidden />
      </span>
    </button>
  );
};
