<template>
  <StyledSnakeChunk v-for="_ in Array(level)" v-bind="{ top, left }" />
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import styled, { css, BaseProps } from '@/plugins/emotion';
import { useDirection } from '@/composables';
import { Nullable } from '@/types/utils';
import { Directions, Direction } from '@/types/direction';
import { Node } from '@/types/node';
import { MOVEMENT_SPEED, STEP_INCREMENT } from '@/constants/game-rules';

const level = ref(1);

const { direction: lastInputDirection } = useDirection();

const head = reactive<Node>({ top: 0, left: 0 });
const gameLoop = ref<Nullable<ReturnType<typeof setInterval>>>(null);

const top = computed(() => `${head.top}px`);
const left = computed(() => `${head.left}px`);

const move = (node: Node, direction: Direction) => {
  const moveAction = {
    [Directions.TOP]: () => (node.top -= STEP_INCREMENT),
    [Directions.BOTTOM]: () => (node.top += STEP_INCREMENT),
    [Directions.LEFT]: () => (node.left -= STEP_INCREMENT),
    [Directions.RIGHT]: () => (node.left += STEP_INCREMENT),
  };
  moveAction[direction]();
};

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
