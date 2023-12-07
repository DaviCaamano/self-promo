import { MonkeyCell } from './MonkeyCell';
import styles from '../styles/monkey.module.scss';
import { useMonkeyPosition } from '../hooks/useMonkeyPosition';
import { getAxis, GRID_INDEX_DIGIT_MAX, monkeyGridCells, sumDigits } from '../constants/grid';

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
  const monkey = useMonkeyPosition();
  const [cellX, cellY] = getAxis(monkey);
  const sum = sumDigits('' + Math.abs(cellX) + Math.abs(cellY));
  const sumIndicator = (
    <span className={`${styles.monkeyGridSum} ${sum >= GRID_INDEX_DIGIT_MAX && styles.over}`}>{sum}</span>
  );

  return (
    <div className={`monkey-grid ${styles.monkeyGridContainer}`}>
      <div className={`monkey-grid ${styles.monkeyGridIndex}`}>
        {`(${cellX}, ${cellY}) - sum: `} {sumIndicator}
      </div>
      <div className={`monkey-grid ${styles.monkeyGrid}`}>
        {monkeyGridCells.map((enabled, index) => (
          <MonkeyCell key={`monkey-cell-${index}`} monkey={monkey === index} enabled={enabled} />
        ))}
      </div>
    </div>
  );
};
