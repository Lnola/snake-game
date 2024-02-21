<template>
  <StyledGameBox>
    <StyledSnakeChunk
      v-for="_ in Array(level)"
      :top="topInPx"
      :left="leftInPx"
    />
    <StyledApple
      v-if="isAppleVisible"
      :top="appleTopInPx"
      :left="appleLeftInPx"
    />
  </StyledGameBox>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import random from 'lodash/random';
import styled, { css, BaseProps } from '@/plugins/emotion';
import { useDirection, useMovable, usePoint } from '@/composables';
import { Nullable } from '@/types/utils';
import {
  MOVEMENT_SPEED,
  GAME_BOX_WIDTH,
  GAME_BOX_HEIGHT,
  POINT_SIZE,
  PLAYABLE_WIDTH,
  PLAYABLE_HEIGHT,
} from '@/constants/game-rules';

const level = ref(1);

const {
  point: apple,
  isVisible: isAppleVisible,
  topInPx: appleTopInPx,
  leftInPx: appleLeftInPx,
  remove: removeApple,
  place: placeApple,
} = usePoint();
const { direction: lastInputDirection } = useDirection();
const { point: head, topInPx, leftInPx, move } = useMovable();
const gameLoop = ref<Nullable<ReturnType<typeof setInterval>>>(null);

const showApple = () => {
  placeApple(
    random(0, PLAYABLE_WIDTH / 10) * 10,
    random(0, PLAYABLE_HEIGHT / 10) * 10,
  );
};

const start = () => {
  gameLoop.value = setInterval(() => {
    if (isOutOfBounds.value) return handleLoss();
    if (isApplePickedUp.value) handleApplePickup();
    move(head, lastInputDirection.value);
  }, MOVEMENT_SPEED);
};

const stop = () => {
  if (!gameLoop.value) return;
  clearInterval(gameLoop.value);
};

const handleApplePickup = () => {
  removeApple();
  level.value++;

  setTimeout(() => {
    showApple();
  }, 2000);
};

const handleLoss = () => {
  stop();
  alert('You lost the game');
};

const isOutOfBounds = computed(() => {
  const isOutOfBoundsVertical = head.top > PLAYABLE_HEIGHT || head.top < 0;
  const isOutOfBoundsHorizontal = head.left > PLAYABLE_WIDTH || head.left < 0;
  return isOutOfBoundsVertical || isOutOfBoundsHorizontal;
});

const isApplePickedUp = computed(() => {
  const isTouchingFromAbove =
    head.top + (2 / 3) * POINT_SIZE >= apple.top &&
    head.top <= apple.top + (2 / 3) * POINT_SIZE;
  const isApplePickedUpVertical = isTouchingFromAbove;
  const isTouchingFromLeft =
    head.left + (2 / 3) * POINT_SIZE >= apple.left &&
    head.left <= apple.left + (2 / 3) * POINT_SIZE;
  const isApplePickedUpHorizontal = isTouchingFromLeft;
  return isApplePickedUpVertical && isApplePickedUpHorizontal;
});

onMounted(() => {
  start();
  showApple();
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
    border: ${POINT_SIZE}px solid black;
    position: relative;
  `,
);

type StyledSnakeChunk = BaseProps & { top: string; left: string };
const StyledSnakeChunk = styled.span(
  ({ top, left }: StyledSnakeChunk) => css`
    display: inline-block;
    width: ${POINT_SIZE}px;
    height: ${POINT_SIZE}px;
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
    width: ${POINT_SIZE}px;
    height: ${POINT_SIZE}px;
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
