import { useEffect, useState } from 'react';
import { CellStatus, getMonkeyGrid, GRID_CENTER, GRID_COLUMNS, TTL_CELLS } from '../constants/grid';

enum Direction {
  up,
  right,
  down,
  left,
}

interface GridPaths {
  grid: CellStatus[];
  validCells: number | undefined;
}
/**
 * Hook for State and event handling for Monkey Position.
 */
export const useMonkeyPosition = (): [number, CellStatus[], number | undefined] => {
  const [pos, setPos] = useState<number>(GRID_CENTER);
  const [{ grid, validCells }, setGrid] = useState<GridPaths>({ grid: [], validCells: undefined });

  /**
   * Handle keyboard inputs to let the user move the monkey.
   */
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      move(getDirection(event.key), setPos);
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handle keyboard inputs to let the user move the monkey.
   */
  useEffect(() => {
    const updatedGrid = getMonkeyGrid();
    setGrid(updatedGrid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [pos, grid, validCells];
};

const keys = {
  [Direction.up]: ['ArrowUp', 'w', 'W'],
  [Direction.right]: ['ArrowRight', 'd', 'D'],
  [Direction.down]: ['ArrowDown', 's', 'S'],
  [Direction.left]: ['ArrowLeft', 'a', 'A'],
};

/**
 * Returns the direction of the key input if the key input matches the "keys" dictionary above.
 * @param key - string: A key code from a Keyboard Event.
 */
const getDirection = (key: string) => {
  if (keys[Direction.up].includes(key)) {
    return Direction.up;
  }
  if (keys[Direction.right].includes(key)) {
    return Direction.right;
  }
  if (keys[Direction.down].includes(key)) {
    return Direction.down;
  }
  if (keys[Direction.left].includes(key)) {
    return Direction.left;
  }
};

/**
 * Move the position of the monkey on the grid either up, right, down, or left.
 * No movement is performed if the monkey would be moved out of the bounds of the grid.
 * @param direction - enum: direction to move the monkey
 * @param setPos - Setter<number>: Setter for index state.
 */
const move = (direction: Direction | undefined, setPos: Setter<number>) => {
  if (typeof direction === 'undefined') {
    return;
  }

  switch (direction) {
    case Direction.up:
      setPos((prev: number) => (prev >= GRID_COLUMNS ? prev - GRID_COLUMNS : prev));
      break;
    case Direction.right:
      setPos((prev: number) => (prev % GRID_COLUMNS < GRID_COLUMNS - 1 ? prev + 1 : prev));
      break;
    case Direction.down:
      setPos((prev: number) => {
        return prev < TTL_CELLS - GRID_COLUMNS ? prev + GRID_COLUMNS : prev;
      });
      break;
    case Direction.left:
      setPos((prev: number) => (prev % GRID_COLUMNS > 0 ? prev - 1 : prev));
      break;
  }
};
