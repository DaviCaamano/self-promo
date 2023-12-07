interface MonkeyCellProps {
  monkey: boolean;
  enabled: boolean;
}

/**
 * Get Individual Cells for the Monkey Grid.
 * @param monkey - boolean: true if the monkey is on this cell.
 * @param enabled - boolean: flag to indicate whether the cell's x,y axis digits sum is less than 19.
 * @constructor
 */
export const MonkeyCell = ({ monkey, enabled }: MonkeyCellProps) => {
  return (
    <div className={`monkey-cell flex-1 flex justify-center items-center text-black ${monkey && 'bg-red'}`}>
      {<div className={`w-full h-full ${getCellColor(monkey, enabled)}`} />}
    </div>
  );
};

const getCellColor = (monkey: boolean, enabled: boolean) => {
  if (monkey) {
    if (enabled) {
      return 'bg-green-500';
    }
    return 'bg-purple-600';
  }
  if (enabled) {
    return 'bg-white';
  }
  return 'bg-red-500';
};
