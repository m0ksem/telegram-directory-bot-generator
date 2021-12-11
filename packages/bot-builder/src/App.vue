<script setup lang="ts">
import { computed, ref } from 'vue'
import DraggableCanvas from './components/DraggableCanvas.vue'
import ConnectionsCanvas from './components/ConnectionsCanvas.vue'
import { useTheme } from './hooks/useTheme'
import { useMouse } from './hooks/useMouse'
import { Point, Item, ItemButton } from './types'
import { defaultItems } from './store/items'

const { toggle: toggleTheme } = useTheme()

const items = ref<Item[]>(defaultItems)

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

const removeItem = (index: number) => {
  items.value = items.value.filter((i, index) => index !== index)
}

const addButton = (item: Item) => { item.data.buttons.push({ toId: -1, text: '', id: item.data.buttons.length }) }
const removeButton = (item: Item, button: ItemButton) => { 
  item.data.buttons = item.data.buttons.filter((b) => b.id !== button.id)
  connections.value = connections.value.filter((conn) => conn.button.id !== button.id )
}

type Connection = { item: Item, el?: HTMLElement }
type StartConnection = Connection & { button: ItemButton }

const connections = ref<{ start: Connection, end: Connection, button: ItemButton }[]>([])

const connectionsCanvas = ref()
const { mouse } = useMouse(connectionsCanvas)
const startConnection = ref<StartConnection | null>(null)

const computedConnections = computed(() => {
  const activeConnections = connections.value.map((con) => ({
    start: con.start.el,
    end: con.end.el,
  }))

  const mouseConnection: any[] = []

  if (startConnection.value) {
    mouseConnection.push({
      start: startConnection.value.el,
      end: mouse.value
    })
  }

  return [...activeConnections, ...mouseConnection]
})

const connectFrom = (item: Item, button: ItemButton, event: MouseEvent) => {
  startConnection.value = { item, button, el: event.target as HTMLElement }
}

const connectTo = (item: Item, event: MouseEvent) => {
  if (!startConnection.value) { return }

  connections.value.push({ 
    start: startConnection.value, 
    end: { item, el: event.target as HTMLElement },
    button: startConnection.value.button
  })

  startConnection.value.button.toId = item.data.id
  startConnection.value = null
}

const isButtonConnected = (button: ItemButton) => button.toId !== -1
const isItemConnected = (item: Item) => connections.value.some((con) => con.end.item.data.id === item.data.id)
</script>

<template>
<div class="app">
  <va-navbar>
    <template #right>
      <va-navbar-item>
        <va-button class="mr-2" @click="createNewItem"> Add </va-button>
        <va-button @click="toggleTheme"> Switch theme </va-button>
      </va-navbar-item>
    </template>
  </va-navbar>
  <DraggableCanvas 
    v-model:items="items"
    v-model:mouse="mouse"
    style="z-index: 1;"
  >
    <template #item="{ index, listeners, style, item }">
      <va-card class="card" color="white">
        <va-card-title v-on="listeners" :style="{ color: 'var(--va-info)', ...style }" >
        Action {{ item.data.id }}
        </va-card-title>
        <va-card-content>
          <va-input label="Text" v-model="item.data.text" placeholder="Message text" />
        </va-card-content>
  
        <va-card-content v-if="item.data.buttons.length">
          <va-list-label>Buttons</va-list-label>
          <va-list-item v-for="button in item.data.buttons" class="button">
            <va-button icon="delete" color="danger" @click="removeButton(item, button)" />
            <div class="px-2">
              <va-input
                v-model="button.text" 
                :label="isButtonConnected(button) ? `Connected to ${button.toId}` : 'Not connected'"
                placeholder="Button text"
              />             
            </div>
            <div @click="connectFrom(item, button, $event)">
              <va-button 
                :icon="isButtonConnected(button) ? 'moving' : 'show_chart'" 
                :color="isButtonConnected(button) ? 'success' : 'warning'"
              />
            </div>
          </va-list-item>
        </va-card-content>
  
        <va-card-actions align="between">
          <va-button color="danger" @click="removeItem(index)">Delete</va-button>
          <va-button @click="addButton(item)">Add button</va-button>
        </va-card-actions>
        <div class="connect-from-circle d-flex align--center justify--center" @click="connectTo(item, $event)">
          <va-button 
            icon="fiber_manual_record"
            :color="isItemConnected(item) ? 'success' : 'warning'"
          />
        </div>
      </va-card>
    </template>
  </DraggableCanvas>

  <div class="connections">
    <ConnectionsCanvas ref="connectionsCanvas" :connections="computedConnections" />
  </div> 
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
  background: var(--va-background);
}

.va-navbar {
  width: 100%;
}

.connections {
  position: absolute;
  width: 100%;
  height: 100%;
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

.app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .draggable-canvas-wrapper {
    flex: 1;
  }
}

body { margin: 0; overflow: hidden; }
</style>
