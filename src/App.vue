<template>
  <StyledSnakeChunk v-for="_ in Array(level)" :top="topInPx" :left="leftInPx" />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import styled, { css, BaseProps } from '@/plugins/emotion';
import { useDirection, useMovable } from '@/composables';
import { Nullable } from '@/types/utils';
import { MOVEMENT_SPEED } from '@/constants/game-rules';

const level = ref(1);

const { direction: lastInputDirection } = useDirection();

const { snakeChunk: head, topInPx, leftInPx, move } = useMovable();
const gameLoop = ref<Nullable<ReturnType<typeof setInterval>>>(null);

onMounted(() => {
  gameLoop.value = setInterval(() => {
    move(head, lastInputDirection.value);
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
