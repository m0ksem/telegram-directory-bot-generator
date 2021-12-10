<script setup lang="ts">
import { ref, markRaw } from 'vue'
import DraggableCanvas from './components/DraggableCanvas.vue'

const items = ref([
  {
    data: {
      title: 'Message',
      answer: '',
    },
    position: { x: 0, y: 0 }
  },
])
</script>

<template>
  <DraggableCanvas v-model:items="items">
    <template #item="{ data, listeners, style }">
      <va-card>
        <va-card-title v-on="listeners" :style="style">{{ data.title }}</va-card-title>
        <va-card-content>
          <va-input label="Answer" v-model="data.answer" />
        </va-card-content>
        <va-card-actions align="between">
          <va-button>Action 1</va-button>
          <va-button>Action 2</va-button>
        </va-card-actions>
      </va-card>
    </template>
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
