'use client';
import { useEffect, useState } from 'react';
import { useIsClient } from '@context/client.context';

export const useIsLandscape = (isMobile: boolean) => {
  const isClient = useIsClient();
  const [orientation, setOrientation] = useState(getOrientation(isClient));

  const updateOrientation = () => {
    setOrientation(getOrientation(isClient));
  };

  useEffect(() => {
    if (isClient) {
      window.addEventListener('orientationchange', updateOrientation);
      return () => {
        window.removeEventListener('orientationchange', updateOrientation);
      };
    }
  }, [isClient, updateOrientation]);

  useEffect(() => {
    const updatedOrientation = getOrientation(isClient);
    if (updatedOrientation !== orientation) {
      setOrientation(updatedOrientation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  return isMobile && orientation.startsWith(MobileOrientation.landscape);
};

const getOrientation = (isClient: boolean) => (isClient && window?.screen?.orientation?.type) || '';

export enum MobileOrientation {
  landscape = 'landscape',
  portrait = 'portrait',
}
