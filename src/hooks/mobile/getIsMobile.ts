import { headers } from 'next/headers';
import { getSelectorsByUserAgent } from 'react-device-detect';

/**
 * Whether the request came from a phone, read off the user agent on the server
 * so the first paint already knows — the nav and the caption are laid out
 * differently and a client-side check would swap them after the page appeared.
 *
 * Not a hook, despite where it lives: it runs during a server render and awaits
 * `headers()`, which is a promise from Next 15 on. Reaching through it
 * synchronously still worked, but logged an error on every single request and
 * stops working outright in the next major.
 */
export const getIsMobile = async () => {
  const userAgent = (await headers()).get('user-agent') ?? '';
  return getSelectorsByUserAgent(userAgent)?.isMobile ?? false;
};
