import { ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { Directions, type Direction } from '@/types/direction';
import { MOVEMENT_SPEED } from '@/constants/game-rules';

const useDirection = () => {
  const direction = ref<Direction>(Directions.RIGHT);
  const isTimedOut = ref<boolean>(false);

  const handleTimeout = () => {
    isTimedOut.value = true;
    setTimeout(() => {
      isTimedOut.value = false;
    }, MOVEMENT_SPEED);
  };

  onKeyStroke(['w', 'W', 'ArrowUp'], () => {
    if (direction.value === Directions.BOTTOM || isTimedOut.value) return;
    direction.value = Directions.TOP;
    handleTimeout();
  });

  onKeyStroke(['s', 'S', 'ArrowDown'], () => {
    if (direction.value === Directions.TOP || isTimedOut.value) return;
    direction.value = Directions.BOTTOM;
    handleTimeout();
  });

  onKeyStroke(['a', 'A', 'ArrowLeft'], () => {
    if (direction.value === Directions.RIGHT || isTimedOut.value) return;
    direction.value = Directions.LEFT;
    handleTimeout();
  });

  onKeyStroke(['d', 'D', 'ArrowRight'], () => {
    if (direction.value === Directions.LEFT || isTimedOut.value) return;
    direction.value = Directions.RIGHT;
    handleTimeout();
  });

  return { direction };
};

export default useDirection;
