import {  DieMap, DiePosition } from './interfaces/pop-die';

//  distance = d = √((x2 – x1)² + (y2 – y1)²
//  die radius = dr = die width /2
//  if d + dr > r, die is no longer in circle

const isInCircle = ({ x, y }: DiePosition, radius: number = 250, dieRadius: number = 20) => {
  const distance = Math.sqrt(x * x + y * y);
  return distance + dieRadius < radius;
};

const getNewAngle = (angle: number) => {
  const difference = Math.trunc(Math.random()) * 0.9 - 0.45;
  return angle * -1 + difference;
};

export const getPoint = (
  angle: number,
  deltaTime: number,
  { x: startX, y: startY }: DiePosition,
  speed: number = 500,
  radius: number = 500,
  dieRadius: number = 25,
): DieMap => {
  const distance = deltaTime * speed;
  const x = Math.cos(angle) * distance + startX;
  const y = Math.sin(angle) * distance + startY;

  if (isInCircle({ x, y }, radius, dieRadius)) {
    return { x, y, angle };
  } else {
    const newAngle = getNewAngle(angle);
    return { angle: newAngle, x: startX, y: startY };
  }
};
