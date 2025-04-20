import { DiceSix } from 'phosphor-react';
import { useState } from 'react';
import { useDieInterval } from '../hooks/useDieInterval';

const DIE_RADIUS = 64;

export const Die = () => {
  const [activated, setActivated] = useState<boolean>(false);
  const { x, y } = useDieInterval(activated);
  return (
    <div
      id={'die'}
      style={{ transform: `translate(${x}, ${y})` }}
      onClick={() => setActivated((prev: boolean) => !prev)}
    >
      <DiceSix size={DIE_RADIUS} color='white' />
    </div>
  );
};
