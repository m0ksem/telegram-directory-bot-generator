<script setup lang="ts">
import { ref, markRaw } from 'vue'
import DraggableCanvas from './components/DraggableCanvas.vue'

const items = ref([
  {
    data: {
      title: 'Message',
      answer: '',
      id: 0,
    },
    position: { x: 0, y: 0 }
  },
])

const removeItem = (index: number) => {
  items.value = items.value.filter((i, index) => index !== index)
}

const createNewItem = () => {
  items.value.push(  {
    data: {
      title: 'Message',
      answer: '',
      id: items.value.length,
    },
    position: { x: 0, y: 0 }
  },)
}
</script>

<template>
  <va-navbar>
    <template #right>
      <va-navbar-item>
        <va-button @click="createNewItem">
          Add
        </va-button>
      </va-navbar-item>
    </template>
  </va-navbar>
  <DraggableCanvas v-model:items="items">
    <template #item="{ index, data, listeners, style }">
      <va-card>
        <va-card-title v-on="listeners" :style="style">{{ data.title }} <span style="color: var(--va-info);">{{ data.id }}</span></va-card-title>
        <va-card-content>
          <va-input label="Answer" v-model="data.answer" />
        </va-card-content>
        <va-card-actions align="between">
          <va-button color="danger" @click="removeItem(index)">Delete</va-button>
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

.va-navbar {
  width: 100%;
}

body { margin: 0; }
</style>
