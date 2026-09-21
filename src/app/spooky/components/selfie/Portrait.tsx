import Image from 'next/image';

interface PortraitProps {
  isLandscape: boolean;
}
export const Portrait = ({ isLandscape }: PortraitProps) => {
  if (isLandscape) {
    return (
      <picture>
        <source media={'(min-height: 480px)'} srcSet={'/images/me-lg.webp'} width={1000} height={439} />
        <Image src={'/images/me-sm.webp'} alt={"It's me, Davi!"} width={400} height={267} priority />
      </picture>
    );
  }
  return (
    <picture>
      <source media={'(min-width: 480px)'} srcSet={'/images/me-lg.webp'} width={1000} height={439} />
      <Image src={'/images/me-sm.webp'} alt={"It's me, Davi!"} width={400} height={267} priority />
    </picture>
  );
};
