import Link from 'next/link';

export const AboutMe = () => {
  return (
    <section id={'about-me'} className={'max-w-[62.5rem] w-full mb-[8rem]'}>
      <div id={'about-me-title'} className={'text-[3rem] font-semibold'}>
        About Me
      </div>
      <div className={'h-[0.125rem] w-[500px] bg-latte mb-4'} />
      <div className={'flex flex-row justify-between items-center text-[1.5rem] mb-3'}>
        <div>
          <span className={'font-semibold'}>Email:</span>{' '}
          <a href={'mailto:DaviSantaCaamano@gmail.com'}>DaviSantaCaamano@gmail.com</a>
        </div>
        <div>
          <span className={'font-semibold'}>Phone:</span> <a href={'tel:786-879-0802'}>(786) 879-0802</a>
        </div>
      </div>
      <div className={'text-xl'}>
        Born in Brazil, raised in Miami, I have fallen in love with every job and team I've ever been a part of.
        <br />
        {'From what I can tell: '}
        <a href={'https://mega.nz/folder/159lWLoa#A1Yh7FVpfaoRLnU5HeihSA'}>
          <span className={'underline'}>it does seem as though the feeling has been mutual.</span>.
        </a>
        <div className={'mb-3'} />
        Never content with good enough, I've accelerated from entry-to-supervisor in every position I have held dating
        back to my first job as a cashier to my most recent position as developer lead. Working in my dream industry as
        a has done nothing to slow me down. Even outside my professional life where I am working on developing a small
        business for AI driven assistance for creative writing.
        <div className={'mb-3'} />
        Unfortunately, layoff have hit many of us this industry, especially in Miami. And while I was the
        last-dev-standing in my latest position, I am actively seeking employment. Interested parties should feel free
        to contact me at the email address and phone number listed above.
      </div>
    </section>
  );
};
