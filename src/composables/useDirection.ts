import { ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { Directions, type Direction } from '@/constants/direction';

const useDirection = () => {
  const direction = ref<Direction>(Directions.RIGHT);

  onKeyStroke(['w', 'W', 'ArrowUp'], () => {
    if (direction.value != Directions.BOTTOM) direction.value = Directions.TOP;
  });

  onKeyStroke(['s', 'S', 'ArrowDown'], () => {
    if (direction.value != Directions.TOP) direction.value = Directions.BOTTOM;
  });

  onKeyStroke(['a', 'A', 'ArrowLeft'], () => {
    if (direction.value != Directions.RIGHT) direction.value = Directions.LEFT;
  });

  onKeyStroke(['d', 'D', 'ArrowRight'], () => {
    if (direction.value != Directions.LEFT) direction.value = Directions.RIGHT;
  });

  return { direction };
};

export default useDirection;
