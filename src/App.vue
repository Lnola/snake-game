<template>
  <StyledGameBox>
    <StyledSnakeChunk
      v-for="_ in Array(level)"
      :top="topInPx"
      :left="leftInPx"
    />
    <StyledApple />
  </StyledGameBox>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import styled, { css, BaseProps } from '@/plugins/emotion';
import { useDirection, useMovable } from '@/composables';
import { Nullable } from '@/types/utils';
import {
  MOVEMENT_SPEED,
  GAME_BOX_WIDTH,
  GAME_BOX_HEIGHT,
} from '@/constants/game-rules';

const level = ref(1);

const { direction: lastInputDirection } = useDirection();
const { snakeChunk: head, topInPx, leftInPx, move } = useMovable();
const gameLoop = ref<Nullable<ReturnType<typeof setInterval>>>(null);

const start = () => {
  gameLoop.value = setInterval(() => {
    if (isOutOfBounds.value) return handleLoss();
    move(head, lastInputDirection.value);
  }, MOVEMENT_SPEED);
};

const stop = () => {
  if (!gameLoop.value) return;
  clearInterval(gameLoop.value);
};

const handleLoss = () => {
  stop();
  alert('You lost the game');
};

const isOutOfBounds = computed(() => {
  const isOutOfBoundsVertical = head.top > GAME_BOX_WIDTH || head.top < 0;
  const isOutOfBoundsHorizontal = head.left > GAME_BOX_HEIGHT || head.left < 0;
  return isOutOfBoundsVertical || isOutOfBoundsHorizontal;
});

onMounted(() => {
  start();
});

onBeforeUnmount(() => {
  stop();
});
</script>

<script lang="ts">
const StyledGameBox = styled.div(
  () => css`
    width: ${GAME_BOX_WIDTH}px;
    height: ${GAME_BOX_HEIGHT}px;
    background-color: red;
    position: relative;
  `,
);

type StyledSnakeChunk = BaseProps & { top: string; left: string };
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

type StyledApple = BaseProps & { top: string; left: string };
const StyledApple = styled.span(
  ({ top, left }: StyledSnakeChunk) => css`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: red;
    position: absolute;
    top: ${top};
    left: ${left};
  `,
);
</script>

<style>
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
