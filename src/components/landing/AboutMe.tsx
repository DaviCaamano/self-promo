'use client';
import { CSSProperties, useEffect, useState } from 'react';
import sStyles from './styles/section.module.scss';
import styles from './styles/about-us.module.scss';
import { EnvelopeSimple, MagnifyingGlassPlus, Phone, Quotes } from 'phosphor-react';
import { MotionButton } from '@components/shared/motion';
import { PdfDialog, pdfFrameStyle, pdfLayoutId } from '@components/shared/pdf-dialog/PdfDialog';
import { Letter, LETTERS, letterAnchorId, letterUrl } from '@components/landing/letters';
import { useScrollReveal } from '@components/landing/hooks/useScrollReveal';
import { sectionIds, Section } from '@components/landing/landing.interface';

const RESUME_ID = 'resume';
const RESUME_URL = '/pdfs/resume/Davi Caamano - Resume.pdf';

/**
 * Two pulses of `letterFlash` at 1800ms each. Clearing the flag any earlier
 * would cut the second pulse short, so this has to track that animation.
 */
const FLASH_MS = 3600;

interface AboutMeProps {
  /** Id of the letter the landing quote sent us to, or undefined for none. */
  highlighted: string | undefined;
  setHighlighted: Setter<string | undefined>;
}
export const AboutMe = ({ highlighted, setHighlighted }: AboutMeProps) => {
  /** Only one preview is ever open, so the open card's id is the whole state. */
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const close = () => setPreview(undefined);

  const ref = useScrollReveal<HTMLDivElement>(sStyles.reveal);

  /**
   * `setHighlighted` is a useState setter and so is referentially stable; a
   * handler rebuilt each render would restart this timer on every parent
   * re-render and the flash would outlive its ceiling.
   */
  useEffect(() => {
    if (!highlighted) return;
    const timer = setTimeout(() => setHighlighted(undefined), FLASH_MS);
    return () => clearTimeout(timer);
  }, [highlighted, setHighlighted]);

  return (
    <div id={sectionIds[Section.about]} ref={ref} data-reveal-scope='' className={sStyles.section}>
      <div className={sStyles.container}>
        <h2 className={`${sStyles.title} ${sStyles.reveal}`} style={{ '--i': 0 } as CSSProperties}>
          About
        </h2>
        <div
          className={`h-[0.0625rem] bg-sea mt-3 mb-6 ${sStyles.reveal}`}
          style={{ '--i': 1 } as CSSProperties}
        />
        <ContactInfo />
        <Resume onOpen={setPreview} />
        <Letters onOpen={setPreview} highlighted={highlighted} />
      </div>

      <PdfDialog
        id={RESUME_ID}
        open={preview === RESUME_ID}
        onClose={close}
        title={'Resume'}
        subtitle={'Davi Caamano'}
        url={RESUME_URL}
      />
      {LETTERS.map((letter) => (
        <PdfDialog
          key={letter.id}
          id={letter.id}
          open={preview === letter.id}
          onClose={close}
          title={'Letter of Recommendation'}
          subtitle={`${letter.name} — ${letter.title}, ${letter.company}`}
          url={letterUrl(letter.name)}
        />
      ))}
    </div>
  );
};

const ContactInfo = () => (
  <div className={`${styles.contactInfo} ${sStyles.reveal}`} style={{ '--i': 2 } as CSSProperties}>
    {/* A plain anchor, not next/link: Link routes through the client router,
        which has nothing to do with a mailto and swallowed the click. */}
    <a
      href={'mailto:DaviSantaCaamano@gmail.com'}
      className={styles.contactItem}
      aria-label={'Email DaviSantaCaamano@gmail.com'}
    >
      <EnvelopeSimple className={styles.contactIcon} size={22} weight={'regular'} aria-hidden />
      <span className={styles.contactInfoText}>DaviSantaCaamano@gmail.com</span>
    </a>
    <a href={'tel:786-879-0802'} className={styles.contactItem} aria-label={'Call (786) 879-0802'}>
      <Phone className={styles.contactIcon} size={22} weight={'regular'} aria-hidden />
      <span className={styles.contactInfoText}>(786) 879-0802</span>
    </a>
  </div>
);

/* No heading above it: the card says "Resume" itself. It sits directly under
   the contact details it belongs with. */
const Resume = ({ onOpen }: { onOpen: (id: string) => void }) => (
  <div className={`${styles.resumeGroup} ${sStyles.reveal}`} style={{ '--i': 3 } as CSSProperties}>
    <MotionButton
      type={'button'}
      layoutId={pdfLayoutId(RESUME_ID)}
      style={pdfFrameStyle}
      className={styles.resumeCard}
      onClick={() => onOpen(RESUME_ID)}
      aria-label={'Preview my resume'}
    >
      <span className={styles.resumeTitle}>Resume</span>
      <span className={styles.cardHint}>Preview &amp; download</span>
      <MagnifyingGlassPlus className={styles.cardIcon} size={32} weight={'regular'} aria-hidden />
    </MotionButton>
  </div>
);

interface LettersProps {
  highlighted: string | undefined;
  onOpen: (id: string) => void;
}
const Letters = ({ highlighted, onOpen }: LettersProps) => (
  <div className={styles.group}>
    <h3 className={`${styles.groupTitle} ${sStyles.reveal}`} style={{ '--i': 4 } as CSSProperties}>
      Letters of Recommendation
    </h3>
    <div className={`h-[0.125rem] bg-latte mt-2 mb-4 ${sStyles.reveal}`} style={{ '--i': 4 } as CSSProperties} />
    <div className={styles.letterGrid}>
      {LETTERS.map((letter, index) => (
        <LetterCard
          key={letter.id}
          letter={letter}
          onOpen={onOpen}
          /* Picks up where the fixed pieces above left off, so the cards keep
             arriving in the same rhythm rather than restarting it. */
          index={5 + index}
          flashing={highlighted === letter.id}
        />
      ))}
    </div>
  </div>
);

interface LetterCardProps {
  flashing: boolean;
  index: number;
  letter: Letter;
  onOpen: (id: string) => void;
}
const LetterCard = ({ flashing, index, letter, onOpen }: LetterCardProps) => (
  <MotionButton
    type={'button'}
    id={letterAnchorId(letter.id)}
    layoutId={pdfLayoutId(letter.id)}
    style={{ ...pdfFrameStyle, '--i': index } as CSSProperties}
    className={`${styles.letterCard} ${sStyles.reveal}${flashing ? ' ' + styles.flashing : ''}`}
    onClick={() => onOpen(letter.id)}
    aria-label={`Preview the letter of recommendation from ${letter.name}, ${letter.title} at ${letter.company}`}
  >
    <blockquote className={styles.quote}>
      <Quotes className={styles.quoteMark} size={20} weight={'fill'} aria-hidden />
      <span className={styles.quoteText}>{letter.quote}</span>
      <Quotes className={`${styles.quoteMark} ${styles.quoteMarkClose}`} size={20} weight={'fill'} aria-hidden />
    </blockquote>
    <div className={styles.attribution}>
      <span className={styles.company}>{letter.company}</span>
      <span className={styles.role}>{letter.title}</span>
      <span className={styles.author}>{letter.name}</span>
    </div>
  </MotionButton>
);
