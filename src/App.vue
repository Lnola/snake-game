<template>
  <StyledSnakeChunk v-for="_ in Array(level)" v-bind="{ top, left }" />
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import styled, { css } from './emotion';
import { Direction } from './constants/direction';

const level = ref(1);

const head = reactive({ top: 0, left: 0 });
const lastInputDirection = ref('right');
const gameLoop = ref(null);

const top = computed(() => `${head.top}px`);
const left = computed(() => `${head.left}px`);

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

onMounted(() => {
  gameLoop.value = setInterval(() => {
    switch (lastInputDirection.value) {
      case 'top':
        head.top -= 10;
        break;

      case 'bottom':
        head.top += 10;
        break;

      case 'left':
        head.left -= 10;
        break;

      case 'right':
        head.left += 10;
        break;

      default:
        break;
    }
  }, 250);
});

onBeforeUnmount(() => {
  clearInterval(gameLoop.value);
});
</script>

<script>
const StyledSnakeChunk = styled.span(
  ({ top, left }) => css`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: greenyellow;
    position: absolute;
    top: ${top};
    left: ${left};
  `
);
</script>
