import styles from './section.module.scss';
export const AboutMe = () => {
  return (
    <div id={'about-me'} className={`${styles.aboutMe} keen-slider__slide number-slide2`}>
      <div className={styles.container}>
        <div id={'about-me-title'} className={styles.title}>
          About Me
        </div>
        <div className={'h-[0.125rem] w-[500px] bg-latte mt-3 mb-6'} />
        <ContactInfo />
        <div className={'text-[1rem] sm:text-[1.25rem] md:text-[1.5rem]'}>
          {"Born in Brazil, raised in Miami, I have fallen in love with every job and team I've ever been a part " +
            'of. From what I can tell: '}
          <a href={'https://mega.nz/folder/159lWLoa#A1Yh7FVpfaoRLnU5HeihSA'}>
            <span className={'underline'} style={{ textUnderlineOffset: '4px', fontWeight: '300' }}>
              it does seem as though the feeling has been mutual.
            </span>
          </a>
          <div className={'mb-3'} />
          Never content with good enough, I've accelerated from entry-to-supervisor in every position I have held dating
          back to my first job as a cashier to my most recent position as developer lead. Working in my dream industry
          as a has done nothing to slow me down. Even outside my professional life where I am working on developing a
          small business for AI driven assistance for creative writing.
          <div className={'mb-3'} />
          Unfortunately, layoffs have hit many of us this industry, especially in Miami. And while I was the
          last-dev-standing in my latest position, I am actively seeking employment. Interested parties should feel free
          to contact me at the email address and phone number listed above.
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
