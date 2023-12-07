export const GRID_INDEX_DIGIT_MAX = 19;
export const GRID_COLUMNS = 100;
export const GRID_COLUMNS_HALF = GRID_COLUMNS / 2;
export const GRID_CENTER = GRID_COLUMNS_HALF * GRID_COLUMNS + GRID_COLUMNS_HALF;
export const TTL_CELLS = GRID_COLUMNS * GRID_COLUMNS;

/**
 * Main challenge of the exercise,
 * Given a set of coordinates (X,Y), sum the individual digits of both axes, then check if that sum is less than 19.
 *  ie: (-25, 17)
 *    => 2 + 5 + 1 + 7 = 15
 *    => 15 < 19
 *    => true
 * @param numStr - string: A string composed of the merger of both the absolute value of the X and Y axis.
 *  ie: (-25, 17) => "2517"
 */
export const sumDigits = (numStr: string) => {
  return numStr
    .split('')
    .map((char: string) => parseInt(char))
    .reduce((ttl: number, current: number) => ttl + current);
};

/**
 * Given X,Y coordinates, check if all numbers in the axes when summed are less than 19.
 * @param x
 * @param y
 */
const checkValid = (x: number, y: number) => {
  return sumDigits('' + Math.abs(x) + Math.abs(y)) < GRID_INDEX_DIGIT_MAX;
};

/**
 * Get X,Y axis from the index of a cell on the grid.
 * @param index - number: index of the cell. (1 dimensional)
 */
export const getAxis = (index: number) => [
  (index % GRID_COLUMNS) - GRID_COLUMNS_HALF,
  Math.floor(index / GRID_COLUMNS) - GRID_COLUMNS_HALF,
];

export const monkeyGridCells: boolean[] = [];
for (let index = 0; index < TTL_CELLS; index++) {
  const [cellX, cellY] = getAxis(index);
  monkeyGridCells.push(checkValid(cellX, cellY));
}
