import { Point } from '@/types/coordinates';
import { Direction, Directions } from '@/types/direction';
import { STEP_INCREMENT } from '@/constants/game-rules';
import { usePoint } from '.';

const useMovable = (initTop: number = 0, initLeft: number = 0) => {
  const point = usePoint(initTop, initLeft);

  const move = (point: Point, direction: Direction) => {
    const moveAction = {
      [Directions.TOP]: () => (point.top -= STEP_INCREMENT),
      [Directions.BOTTOM]: () => (point.top += STEP_INCREMENT),
      [Directions.LEFT]: () => (point.left -= STEP_INCREMENT),
      [Directions.RIGHT]: () => (point.left += STEP_INCREMENT),
    };
    moveAction[direction]();
  };

  return { ...point, move };
};

export default useMovable;
