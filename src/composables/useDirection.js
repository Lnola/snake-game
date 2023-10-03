import { ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { Direction } from '@/constants/direction';

const useDirection = () => {
  const direction = ref(Direction.RIGHT);

  onKeyStroke(['w', 'W', 'ArrowUp'], () => {
    if (lastInputDirection.value != Direction.BOTTOM)
      lastInputDirection.value = 'top';
  });

  onKeyStroke(['s', 'S', 'ArrowDown'], () => {
    if (lastInputDirection.value != Direction.TOP)
      lastInputDirection.value = 'bottom';
  });

  onKeyStroke(['a', 'A', 'ArrowLeft'], () => {
    if (lastInputDirection.value != Direction.RIGHT)
      lastInputDirection.value = 'left';
  });

  onKeyStroke(['d', 'D', 'ArrowRight'], () => {
    if (lastInputDirection.value != Direction.LEFT)
      lastInputDirection.value = 'right';
  });

  return { direction };
};

export default useDirection;
