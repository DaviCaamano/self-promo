import { useEffect, useRef, useState } from 'react';
import { DieMap } from '../interfaces/pop-die';
import { getPoint } from '../getDistance';
import { clearInterval } from 'timers';
const MAX_CAST_TIME = 500;
const DIE_RADIUS = 64;
const ROLLER_RADIUS = 500;
interface DieState extends DieMap {
  time: number | null;
  startTime: number | null;
  speed: number;
}
const castVariance = () => Math.random() * 200 - 100;

export const useDieInterval = (active: boolean) => {
  const [die, setDie] = useState<DieState>({
    x: 0,
    y: 0,
    angle: Math.random() * 360,
    time: null,
    startTime: null,
    speed: MAX_CAST_TIME + castVariance(),
  });

  const stickyActivated = useRef<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (active !== stickyActivated.current) {
      stickyActivated.current = active;
      if (active) {
        const newAngle = Math.random() * 360;
        const newSpeed = MAX_CAST_TIME + castVariance();
        const newPosition = { x: die.x, y: die.y };
        const { angle, x, y } = getPoint(newAngle, 0, newPosition, newSpeed, ROLLER_RADIUS, DIE_RADIUS);
        setDie({ x, y, angle, time: 0, startTime: Date.now(), speed: newSpeed });
        intervalRef.current = setInterval(() => {
          if (die.time !== null && die.startTime !== null && typeof intervalRef.current !== 'undefined') {
            if (die.time + die.startTime > MAX_CAST_TIME) {
              //out of time, stop
              clearInterval(intervalRef.current);
              intervalRef.current = undefined;
            } else {
              const deltaTime = Date.now() - die.time;
              const resp: DieMap = getPoint(
                die.angle,
                deltaTime,
                { x: die.x, y: die.y },
                newSpeed,
                ROLLER_RADIUS,
                DIE_RADIUS,
              );

              setDie({
                ...resp,
                time: Date.now(),
                startTime: die.startTime,
                speed: die.speed,
              });
            }
          }
        }, 10);
      }
    }
  }, [active, die.angle, die.speed, die.startTime, die.time, die.x, die.y]);

  return die;
};
