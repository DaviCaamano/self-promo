import styles from '../styles/monkey.module.scss';
import { useMonkeyPosition } from '../hooks/useMonkeyPosition';
import { MonkeyCanvas } from './MonkeyCanvas';

/**
 * Display a grid of values where each cell in the grid is color coded
 * The user can control which cell is being focused by using WASD or the directional arrows on their keyboard to shift
 *  the cell's position.
 *      green: the selected cell IF the digits of the absolute value of the X and Y axis do not exceed 19.
 *      purple: the selected cell IF the digits of the absolute value of the X and Y axis DO exceed 18.
 *      white: an unselected cell IF the digits of the absolute value of the X and Y axis do not exceed 19.
 *      red: an unselected cell IF the digits of the absolute value of the X and Y axis DO exceed 18.
 */
export const MonkeyGrid = () => {
  const [monkey, grid, validCells] = useMonkeyPosition();

  return (
    <div className={`monkey-grid ${styles.monkeyGridContainer}`}>
      <div className={`monkey-grid ${styles.monkeyGridIndex} mt-4 mb-2 text-xl font-medium`}>
        {validCells ? <Count count={validCells} /> : ''}
      </div>
      <div className={`monkey-grid-colors ${styles.monkeyGridIndex} mt-4 mb-2 text-10`}>
        {!grid?.length ? 'Please stand-by while we draw our monkey a map...' : <ColorCodes />}
      </div>
      <MonkeyCanvas grid={grid} monkey={monkey} />
    </div>
  );
};

interface CountProps {
  count: number | undefined;
}
const Count = ({ count }: CountProps) => (
  <span>
    Our monkey can access <span className={'text-green-500 font-semibold'}>{count}</span> cells.
  </span>
);
const ColorCodes = () => (
  <div className={'color-codes w-full'}>
    <div>
      Our monkey can reach all <span className={'text-green-500 font-semibold'}>green</span> squares.
    </div>
    <div>
      Our monkey is forbidden to enter any <span className={'text-red-500 font-semibold'}>red</span> squares.
    </div>
    <div>
      Our monkey is allowed in <span className={'text-gray-500 font-semibold'}>gray</span> squares, but{' '}
      <span className={'text-red-500 font-semibold'}>red</span> squares block their path.
    </div>
  </div>
);
