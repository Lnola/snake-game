import { computed, reactive } from 'vue';
import { Point } from '@/types/coordinates';

const usePoint = (initTop: number = 0, initLeft: number = 0) => {
  const point = reactive<Point>({ top: initTop, left: initLeft });

  const topInPx = computed(() => `${point.top}px`);
  const leftInPx = computed(() => `${point.left}px`);

  return { point, topInPx, leftInPx };
};

export default usePoint;
