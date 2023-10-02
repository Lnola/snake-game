<template>
  <SnakeChunk v-for="_ in Array(length)" />
  <Apple v-if="isAppleShown" />
</template>

<script setup>
import SnakeChunk from './components/SnakeChunk.vue';
import Apple from './components/Apple.vue';
import { ref } from 'vue';

const level = ref(1);
// TODO: replace apple shown ref with computed prop
const isAppleShown = ref(false);
</script>

<style scoped></style>
