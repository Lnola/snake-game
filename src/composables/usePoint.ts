import { computed, reactive, ref } from 'vue';
import { Point } from '@/types/coordinates';
import { PLAYABLE_WIDTH, PLAYABLE_HEIGHT } from '@/constants/game-rules';

const usePoint = (initTop: number = 0, initLeft: number = 0) => {
  const point = reactive<Point>({ top: initTop, left: initLeft });
  const isVisible = ref(false);

  const topInPx = computed(() => `${point.top}px`);
  const leftInPx = computed(() => `${point.left}px`);

  const hide = () => {
    isVisible.value = false;
    point.top = initTop;
    point.left = initLeft;
  };

  const place = (top: number = 0, left: number = 0) => {
    const isOutOfBoundsVertical = top < 0 || top > PLAYABLE_HEIGHT;
    const isOutOfBoundsHorizontal = left < 0 || left > PLAYABLE_WIDTH;
    if (isOutOfBoundsVertical || isOutOfBoundsHorizontal)
      throw new Error('Point must be inside bounds');

    point.top = top;
    point.left = left;
    isVisible.value = true;
  };

  return { point, isVisible, topInPx, leftInPx, hide, place };
};

export default usePoint;
