'use client';
import { useEffect, useState } from 'react';

export const useIsLandscape = (isMobile: boolean) => {
  const [orientation, setOrientation] = useState(getOrientation());

  const updateOrientation = () => {
    setOrientation(getOrientation());
  };

  useEffect(() => {
    window.addEventListener('orientationchange', updateOrientation);
    return () => {
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  useEffect(() => {
    const updatedOrientation = getOrientation();
    if (updatedOrientation !== orientation) {
      setOrientation(updatedOrientation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window?.screen?.orientation?.type]);

  return isMobile && orientation.startsWith(MobileOrientation.landscape);
};

const getOrientation = () => window?.screen?.orientation?.type || '';

export enum MobileOrientation {
  landscape = 'landscape',
  portrait = 'portrait',
}
