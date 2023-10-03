import { computed, reactive, ref } from 'vue';
import { Point } from '@/types/coordinates';
import {
  GAME_BOX_HEIGHT,
  GAME_BOX_WIDTH,
  POINT_SIZE,
} from '@/constants/game-rules';

const usePoint = (initTop: number = 0, initLeft: number = 0) => {
  const point = reactive<Point>({ top: initTop, left: initLeft });
  const isVisible = ref(false);

  const topInPx = computed(() => `${point.top}px`);
  const leftInPx = computed(() => `${point.left}px`);

  const place = (top: number = 0, left: number = 0) => {
    const isOutOfBoundsVertically =
      top < 0 || top > GAME_BOX_HEIGHT - POINT_SIZE;
    const isOutOfBoundsHorizontally =
      left < 0 || left > GAME_BOX_WIDTH - POINT_SIZE;
    if (isOutOfBoundsVertically || isOutOfBoundsHorizontally)
      throw new Error('Point must be inside bounds');

    point.top = top;
    point.left = left;
    isVisible.value = true;
  };

  return { point, isVisible, topInPx, leftInPx, place };
};

export default usePoint;
