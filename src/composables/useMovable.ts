import { computed, reactive } from 'vue';
import { SnakeChunk } from '@/types/snake';
import { Direction, Directions } from '@/types/direction';
import { STEP_INCREMENT } from '@/constants/game-rules';

const useMovable = () => {
  const snakeChunk = reactive<SnakeChunk>({ top: 0, left: 0 });

  const topInPx = computed(() => `${snakeChunk.top}px`);
  const leftInPx = computed(() => `${snakeChunk.left}px`);

  const move = (snakeChunk: SnakeChunk, direction: Direction) => {
    const moveAction = {
      [Directions.TOP]: () => (snakeChunk.top -= STEP_INCREMENT),
      [Directions.BOTTOM]: () => (snakeChunk.top += STEP_INCREMENT),
      [Directions.LEFT]: () => (snakeChunk.left -= STEP_INCREMENT),
      [Directions.RIGHT]: () => (snakeChunk.left += STEP_INCREMENT),
    };
    moveAction[direction]();
  };

  return { snakeChunk, move, topInPx, leftInPx };
};

export default useMovable;
