<template>
  <StyledSnakeChunk v-for="_ in Array(level)" v-bind="{ top, left }" />
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import styled, { css } from '@/emotion';
import { useDirection } from '@/composables';

const level = ref(1);

const { direction: lastInputDirection } = useDirection();

const head = reactive({ top: 0, left: 0 });
const gameLoop = ref(null);

const top = computed(() => `${head.top}px`);
const left = computed(() => `${head.left}px`);

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
