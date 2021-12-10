<script setup lang="ts">
import { computed, ref } from 'vue'
import DraggableCanvas from './components/DraggableCanvas.vue'
import ConnectionsCanvas from './components/ConnectionsCanvas.vue'

const items = ref([
  {
    data: {
      title: 'Message',
      answer: '',
      id: 0,
    },
    position: { x: 0, y: 0 }
  },
  {
    data: {
      title: 'Message',
      answer: '',
      id: 1,
    },
    position: { x: 100, y: 250 }
  }
])

const connections = ref<{ start: number, end: number }[]>([])

const mouse = ref({ x: 0, y: 0 })
const selectedItem = ref<any>(null)

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

const connect = (start: any, end: any) => {
  connections.value.push({ start: start.data.id, end: end.data.id})
  selectedItem.value = null
}

const removeItem = (index: number) => {
  items.value = items.value.filter((i, index) => index !== index)
}

const createNewItem = () => {
  items.value.push({
    data: {
      title: 'Message',
      answer: '',
      id: items.value.length,
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
    <template #item="{ index, data, listeners, style, item }">
      <va-card class="card">
        <va-card-title v-on="listeners" :style="style">{{ data.title }} <span style="color: var(--va-info);">{{ data.id }}</span></va-card-title>
        <va-card-content>
          <va-input label="Answer" v-model="data.answer" />
        </va-card-content>
        <va-card-actions align="between">
          <va-button color="danger" @click="removeItem(index)">Delete</va-button>
          <va-button>Connect</va-button>
        </va-card-actions>
        <div class="connect-to-circle" @click="selectedItem = item" />
        <div class="connect-from-circle" @click="connect(selectedItem, item)" />
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
    background: red;
    border-radius: 50%;
  }

  .connect-to-circle {
    position: absolute;
    right: -16px;
    top: 50%;
    height: 24px;
    width: 24px;
    background: green;
    border-radius: 50%;
  }
}

body { margin: 0; }
</style>
