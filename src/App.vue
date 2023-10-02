<template>
  <StyledSnakeChunk v-for="_ in Array(level)" v-bind="{ top, left }" />
</template>

<script setup>
import styled, { css } from './emotion';
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';

const level = ref(1);

const head = reactive({ top: 0, left: 0 });
const gameLoop = ref(null);

const top = computed(() => `${head.top}px`);
const left = computed(() => `${head.left}px`);

onMounted(() => {
  gameLoop.value = setInterval(() => {
    head.left += 10;
  }, 750);
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
