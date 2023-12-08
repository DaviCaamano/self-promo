import { CellStatus, GRID_COLUMNS } from '../constants/grid';
import { useCallback, useEffect, useRef } from 'react';
import styles from '../styles/monkey.module.scss';

interface GridProps {
  grid?: CellStatus[];
  monkey: number;
}
export const MonkeyCanvas = ({ grid, monkey }: GridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback((context: CanvasRenderingContext2D | null | undefined, index: number, color: string) => {
    if (context) {
      const x = (index % GRID_COLUMNS) * 2;
      const y = Math.floor(index / GRID_COLUMNS);
      context.beginPath();
      context.fillStyle = color;
      context.rect(x, y * 2, 2, 2);
      context.fill();
    }
  }, []);

  useEffect(() => {
    if (grid?.length && canvasRef.current) {
      console.log('grid', grid);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = 'white';
        for (let index = 0; index < grid.length; index++) {
          if (context) {
            const status: CellStatus = grid[index];
            if (status === CellStatus.invalid) {
              draw(context, index, 'red');
            } else if (status === CellStatus.path) {
              draw(context, index, 'green');
            } else if (status === CellStatus.valid) {
              draw(context, index, '#e1e1e1');
            }
          }
        }
      }
    }
  }, [draw, grid, monkey]);

  if (!grid) {
    return <div className={'loader w-[40rem] h-[40rem]'} />;
  }
  return (
    <div className={`monkey-grid ${styles.monkeyGrid}`}>
      <canvas
        ref={canvasRef}
        width={996}
        height={996}
        className={'w-[62.5rem] h-[62.5rem] bg-white border-4 border-black'}
      />
    </div>
  );
};
