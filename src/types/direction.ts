import { ValuesType } from 'utility-types';

export const Directions = {
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

export type Direction = ValuesType<typeof Directions>;
