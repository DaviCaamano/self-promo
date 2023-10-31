import { getSelectorsByUserAgent } from 'react-device-detect';
export const useIsMobile = (headers: any) => {
  return getSelectorsByUserAgent(headers().get('user-agent') ?? '')?.isMobile;
};
