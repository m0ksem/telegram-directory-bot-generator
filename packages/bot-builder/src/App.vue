<script setup lang="ts">
import { computed, ref } from 'vue'
import DraggableCanvas from './components/DraggableCanvas.vue'
import ConnectionsCanvas from './components/ConnectionsCanvas.vue'

type Point = { x: number, y: number }

type Item = {
  data: {
    id: number,
    text: string,
    buttons: {
      toId: number,
      text: string
    }[]
  },
  position: Point
}

const items = ref<Item[]>([
  {
    data: {
      id: 0,
      text: '',
      buttons: []
    },
    position: { x: 0, y: 0 }
  },
  {
    data: {
      text: '',
      id: 1,
      buttons: []
    },
    position: { x: 100, y: 250 }
  }
])

const addButton = (item: Item) => { item.data.buttons.push({ toId: -1, text: '' }) }

const connections = ref<{ start: number, end: number }[]>([])

const mouse = ref({ x: 0, y: 0 })
const selectedItem = ref<Item | null>(null)
const selectedButton = ref<Item['data']['buttons'][0] | null>(null)

const computedConnections = computed(() => {
  const activeConnections = connections.value.map((con) => ({
    start: items.value.find((item) => con.start === item.data.id)!.position,
    end: items.value.find((item) => con.end === item.data.id)!.position
  }))

  const mouseConnection: any[] = []

  if (selectedItem.value) {
    mouseConnection.push({
      start: selectedItem.value.position,
      end: mouse.value
    })
  }

  return [...activeConnections, ...mouseConnection]
})

const connectFrom = (item: Item, button: Item['data']['buttons'][0]) => {
  selectedButton.value = button
  selectedItem.value = item
}

const connectTo = (end: Item) => {
  if (!selectedItem.value || !selectedButton.value) { return }

  connections.value.push({ start: selectedItem.value.data.id, end: end.data.id })
  selectedButton.value.toId = end.data.id
  selectedItem.value = null
  selectedButton.value = null
}

const removeItem = (index: number) => {
  items.value = items.value.filter((i, index) => index !== index)
}

const createNewItem = () => {
  items.value.push({
    data: {
      text: '',
      id: items.value.length,
      buttons: []
    },
    position: { x: 0, y: 0 }
  })
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
  <DraggableCanvas 
    v-model:items="items"
    v-model:mouse="mouse"
  >
    <template #item="{ index, listeners, style, item }">
      <va-card class="card">
        <va-card-title v-on="listeners" :style="style">Action <span style="color: var(--va-info);">{{ item.data.id }}</span></va-card-title>
        <va-card-content>
          <va-input label="Answer" v-model="item.data.answer" />
        </va-card-content>
        <va-card-content v-if="item.data.buttons.length">
          <va-list-item v-for="button in item.data.buttons" class="button">
            <va-input v-model="button.text" :label="button.toId === -1 ? 'Not connected': `Connected to ${button.toId}`" />
            <div class="connect-to-circle" @click="connectFrom(item, button)" />
          </va-list-item>
        </va-card-content>
        <va-card-actions align="between">
          <va-button color="danger" @click="removeItem(index)">Delete</va-button>
          <va-button @click="addButton(item)">Add button</va-button>
        </va-card-actions>
        <div class="connect-from-circle" @click="connectTo(item)" />
      </va-card>
    </template>
  </DraggableCanvas>

  <div class="connections">
    <ConnectionsCanvas :connections="computedConnections" />
  </div>
</template>

<style lang="scss">
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

.connections {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.card {
  position: relative;
  .connect-from-circle {
    position: absolute;
    left: -16px;
    top: 50%;
    height: 24px;
    width: 24px;
    background: var(--va-danger);
    border-radius: 50%;
    transform: translateY(-50%);
  }

  .connect-to-circle {
    position: absolute;
    right: -16px;
    top: 50%;
    height: 24px;
    width: 24px;
    background: var(--va-success);
    border-radius: 50%;
    transform: translateY(-50%);
  }

  .button {
    position: relative;
  }
}

body { margin: 0; }
</style>
