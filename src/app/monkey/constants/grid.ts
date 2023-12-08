export const GRID_INDEX_DIGIT_MAX = 19;
export const GRID_COLUMNS = 498;
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
 * Given index of cell, check if all numbers in the axes when summed are less than 19.
 */
const checkValid = (index: number) => {
  const [x, y] = getAxis(index);
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

export enum CellStatus {
  invalid, //Sum of cell's digits are more than or equal to 19
  valid, //Sum of cell's digits are less than 19, but this cell has not been evaluated for having a path from
  //0,0 yet
  path, //Cell is valid AND there is a path from 0,0
}

/**
 * Iterate through all cells to determine which the monkey has a direct path to.
 *    neighboring cells evaluated as well.
 * @param grid - An array of statuses for all cells.
 * @param children - As each cell is evaluated, those who are evaluated as a direct path will have all of its
 *    neighboring cells evaluated as well.
 */
const getCellPath = (grid: CellStatus[], children: number[] = [GRID_CENTER]) => {
  while (children.length) {
    const index = children.shift();
    if (typeof index === 'undefined') {
      continue;
    }
    //If you can go up one cell from the cell at the provided index
    if (index >= GRID_COLUMNS) {
      const indexAboveCell = index - GRID_COLUMNS;
      if (grid[indexAboveCell] === CellStatus.valid) {
        grid[indexAboveCell] = CellStatus.path;
        children.push(indexAboveCell);
      }
    }
    //If you can go right one cell from the cell at the provided index
    if (index % GRID_COLUMNS < GRID_COLUMNS - 1) {
      const indexRightOfCell = index + 1;
      if (grid[indexRightOfCell] === CellStatus.valid) {
        grid[indexRightOfCell] = CellStatus.path;
        children.push(indexRightOfCell);
      }
    }
    //If you can go down one cell from the cell at the provided index
    if (index < TTL_CELLS - GRID_COLUMNS) {
      const indexBelowCell = index + GRID_COLUMNS;
      if (grid[indexBelowCell] === CellStatus.valid) {
        grid[indexBelowCell] = CellStatus.path;
        children.push(indexBelowCell);
      }
    }
    //If you can go left one cell from the cell at the provided index
    if (index % GRID_COLUMNS > 0) {
      const indexRightOfCell = index - 1;
      if (grid[indexRightOfCell] === CellStatus.valid) {
        grid[indexRightOfCell] = CellStatus.path;
        children.push(indexRightOfCell);
      }
    }
  }
};

/** Generate an array representing the status of every cell on the grid. */
export const getMonkeyGrid = () => {
  const monkeyGridCells: CellStatus[] = [];
  for (let index = 0; index < TTL_CELLS; index++) {
    monkeyGridCells.push(checkValid(index) ? CellStatus.valid : CellStatus.invalid);
  }
  getCellPath(monkeyGridCells);
  const validCells = monkeyGridCells.filter((status) => status === CellStatus.path);
  return { grid: monkeyGridCells, validCells: validCells.length };
};
