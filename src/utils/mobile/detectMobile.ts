import { getSelectorsByUserAgent } from 'react-device-detect';
export const detectMobile = (headers: any) => {
  return getSelectorsByUserAgent(headers().get('user-agent') ?? '')?.isMobile;
};
