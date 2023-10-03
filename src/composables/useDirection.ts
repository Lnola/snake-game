import { ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { Direction } from '@/constants/direction';

const useDirection = () => {
  const direction = ref(Direction.RIGHT);

  onKeyStroke(['w', 'W', 'ArrowUp'], () => {
    if (direction.value != Direction.BOTTOM) direction.value = 'top';
  });

  onKeyStroke(['s', 'S', 'ArrowDown'], () => {
    if (direction.value != Direction.TOP) direction.value = 'bottom';
  });

  onKeyStroke(['a', 'A', 'ArrowLeft'], () => {
    if (direction.value != Direction.RIGHT) direction.value = 'left';
  });

  onKeyStroke(['d', 'D', 'ArrowRight'], () => {
    if (direction.value != Direction.LEFT) direction.value = 'right';
  });

  return { direction };
};

export default useDirection;
