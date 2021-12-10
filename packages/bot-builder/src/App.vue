<script setup lang="ts">
import { ref } from 'vue'
import DraggableCanvas from './components/DraggableCanvas.vue'

const items = ref([
  {
    data: 'Hello',
    position: { x: 0, y: 0 }
  },
    {
    data: 'Hello',
    position: { x: 0, y: 0 }
  },
    {
    data: 'Hello',
    position: { x: -10, y: 0 }
  },
])
</script>

<template>
  <DraggableCanvas v-model:items="items">
  </DraggableCanvas>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

body { margin: 0; }
</style>
