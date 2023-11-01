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

  return isMobile && orientation.startsWith(MobileOrientation.landscape);
};

const getOrientation = () => window?.screen?.orientation?.type || '';

export enum MobileOrientation {
  landscape = 'landscape',
  portrait = 'portrait',
}
