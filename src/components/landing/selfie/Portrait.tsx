import Image from 'next/image';
export const Portrait = () => {
  return (
    <picture>
      <source media={'(min-width: 1024px)'} srcSet={'/images/me-lg.webp'} width={1000} height={439} />
      <source media={'(min-width: 480px)'} srcSet={'/images/me-sm.webp'} width={460} height={202} />
      <Image src={'/images/me-xs.webp'} alt={"It's me, Davi!"} width={280} height={151} priority />
    </picture>
  );
};
