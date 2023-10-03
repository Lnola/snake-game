<template>
  <StyledSnakeChunk v-for="_ in Array(level)" v-bind="{ top, left }" />
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import styled, { css, BaseProps } from '@/plugins/emotion';
import { useDirection } from '@/composables';
import { Nullable } from '@/types/utils';
import { Directions } from '@/types/direction';
import { MOVEMENT_SPEED } from '@/constants/game-rules';

const level = ref(1);

const { direction: lastInputDirection } = useDirection();

const head = reactive({ top: 0, left: 0 });
const gameLoop = ref<Nullable<ReturnType<typeof setInterval>>>(null);

const top = computed(() => `${head.top}px`);
const left = computed(() => `${head.left}px`);

onMounted(() => {
  gameLoop.value = setInterval(() => {
    switch (lastInputDirection.value) {
      case Directions.TOP:
        head.top -= 10;
        break;

      case Directions.BOTTOM:
        head.top += 10;
        break;

      case Directions.LEFT:
        head.left -= 10;
        break;

      case Directions.RIGHT:
        head.left += 10;
        break;

      default:
        break;
    }
  }, MOVEMENT_SPEED);
});

onBeforeUnmount(() => {
  if (gameLoop.value) clearInterval(gameLoop.value);
});
</script>

<script lang="ts">
type StyledSnakeChunk = BaseProps & {
  top: string;
  left: string;
};
const StyledSnakeChunk = styled.span(
  ({ top, left }: StyledSnakeChunk) => css`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: greenyellow;
    position: absolute;
    top: ${top};
    left: ${left};
  `,
);
</script>
