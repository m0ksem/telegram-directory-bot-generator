<script setup lang="ts">
import { computed, onMounted, ref, watch, getCurrentInstance, nextTick } from 'vue'
import DraggableCanvas from './components/DraggableCanvas.vue'
import ConnectionsCanvas from './components/ConnectionsCanvas.vue'
import GithubLogo from './components/icons/GithubIcon.vue'
import ScrollWrapper from './components/ScrollWrapper.vue'
import ExportJsonConfigPopupButton from './components/ExportJsonConfigPopupButton.vue'
import ImportJsonConfigPopupButton from './components/ImportJsonConfigPopupButton.vue'
import { useTheme } from './hooks/useTheme'
import { useMouse } from './hooks/useMouse'
import { useHash } from './hooks/useHash'
import type { BuilderMessage, BuilderButton, Connection, StartConnection, BuilderButtonRow } from './types'
import { getDefaultItems } from './store/items'

const isLoading = ref(false)

const { toggle: toggleTheme, isDark } = useTheme()

const items = ref<BuilderMessage[]>(getDefaultItems())

const { generateHash } = useHash()

const createNewItem = () => {
  items.value.push({
    text: '',
    id: generateHash(),
    buttons: [[]],
    position: { x: 0, y: 0 }
  })
}

const removeItem = (index: number) => {
  const item = items.value[index]
  items.value = items.value.filter((i, idx) => idx !== index)
  connections.value = connections.value.filter((conn) => conn.end.item.id !== item.id)
}

const addButton = (item: BuilderMessage) => { 
  item.buttons.push([{
    text: '', 
    messageId: '',
    id: `${item.id}-${generateHash()}`,
  }]) 
}

const removeButton = (item: BuilderMessage, button: BuilderButton) => {
  item.buttons = item.buttons
    .map((row: BuilderButtonRow) => row.filter((b: BuilderButton) => b.id !== button.id))
    .filter((row: BuilderButtonRow) => row.length > 0)

  connections.value = connections.value.filter((conn) => conn.button.id !== button.id )
}

const connections = ref<{ start: Connection, end: Connection, button: BuilderButton }[]>([])

const connectionsCanvas = ref()
const { mouse, onRightClick } = useMouse(connectionsCanvas)
const startConnection = ref<StartConnection | null>(null)

onRightClick(() => undoConnectFrom())

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

const connectFrom = (item: BuilderMessage, button: BuilderButton, event: MouseEvent) => {
  startConnection.value = { item, button, el: event.target as HTMLElement }
}

const connectTo = (item: BuilderMessage, event: MouseEvent) => {
  if (!startConnection.value) { return }

  connections.value.push({ 
    start: startConnection.value, 
    end: { item, el: event.target as HTMLElement },
    button: startConnection.value.button
  })

  startConnection.value.button.messageId = String(item.id)

  startConnection.value = null
}

const unconnectButton = (button: BuilderButton) => {
  connections.value = connections.value.filter((conn) => conn.button.id !== button.id)
  button.messageId = undefined
}

const undoConnectFrom = () => { startConnection.value = null }

const isButtonConnected = (button: BuilderButton) => connections.value.some((con) => con.button.id === button.id)
const isItemConnected = (item: BuilderMessage) => connections.value.some((con) => con.end.item.id === item.id)

const unconnectedItemsCount = computed(() => items.value.reduce((acc, item) => {
  if (item.id === '0') { return acc } 

  return connections.value.some((con) => con.end.item.id === item.id) ? acc : acc + 1
}, 0))

const unusedButtonsCount = computed(() => items.value.reduce((itemAcc, item) => {
  if (!item.buttons) { return 0 }
  return item.buttons
    .reduce((acc, buttonRow: BuilderButtonRow) => {
      if (!buttonRow) { return 0 }

      return acc + buttonRow.reduce((buttonAcc, btn: BuilderButton) => {
          if ('url' in btn) { return 0 }

          return connections.value.some((con) => con.button.id === btn.id) ? buttonAcc : buttonAcc + 1
        }, 0)
    }, 0) + itemAcc
}, 0))

const createBotConfig = () => {
  return items.value.map((item) => {
    return {
      text: item.text,
      id: item.id,
      buttons: item.buttons
        .map((buttonRow) => 
          buttonRow.map((button) => ({
            text: button.text,
            messageId: 'messageId' in button ? button.messageId : undefined,
            url: 'url' in button ? button.url : undefined
          }))
        ),
      position: item.position,
    }
  })
}

const setButtonRef = (button: BuilderButton) => (el: HTMLElement) => { button.el = el; }

const setItemConnectRef = (item: BuilderMessage) => (el: any) => { item.el = el }

const generateConnections = () => {
  items.value.forEach((startItem) => {
    startItem.buttons.forEach((buttonRow) => {
      buttonRow.forEach((button) => {
        if (!('messageId' in button)) { return }

        const endItem = items.value.find((item) => String(item.id) === button.messageId)

        if (!endItem) { return }

        connections.value.push({
          start: { item: startItem, el: button.el },
          end: { item: endItem, el: endItem.el },
          button,
        })
      })
    })
  })
}

onMounted(() => { generateConnections() })

const onConfigUpdate = (config: any) => {
  items.value = config.map((item: any) => {
    if (!item.buttons) {
      item.buttons = []
    }

    return item
  })

  isLoading.value = true

  nextTick(() => {
    isLoading.value = false;
    nextTick(() => {
      generateConnections()
    })
  })
}

const save = () => {
  localStorage['items'] = JSON.stringify(items.value)
}
</script>

<template>
<div class="app">
  <va-navbar>
    <template #left>
      <va-navbar-item class="display-5">
        Bot dictionary generator
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item class="d-flex align--center">
        <va-popover v-if="unconnectedItemsCount !== 0" :message="`${unconnectedItemsCount} item(s) unconnected`" color="background">
          <va-badge overlap :text="unconnectedItemsCount" class="mr-4" color="warning">
            <va-icon name="comments_disabled" color="gray" />
          </va-badge>
        </va-popover>
        <va-popover v-if="unusedButtonsCount !== 0" :message="`${unusedButtonsCount} button(s) unused`" color="background">
          <va-badge overlap :text="unusedButtonsCount" class="mr-4" color="warning">
            <va-icon name="link_off" color="gray" />
          </va-badge>
        </va-popover>
        
        <va-button class="mr-2" @click="createNewItem" icon="add"> Add </va-button>
        <va-button class="mr-2" @click="save" icon="save"> Save </va-button>
        <ImportJsonConfigPopupButton class="mr-2" @update:config="onConfigUpdate"> Import from JSON </ImportJsonConfigPopupButton>
        <ExportJsonConfigPopupButton class="mr-2" :create-config="createBotConfig"> Export to JSON </ExportJsonConfigPopupButton>
        <va-button class="mr-2" @click="toggleTheme" round :color="isDark ? '#f4f8fa' : '#202020'" text-color="white">
          <va-icon name="palette" :color="!isDark ? '#f4f8fa' : '#202020'" />
        </va-button>
        <va-button href="https://github.com/m0ksem/telegram-directory-bot-generator" round color="#000">
          <GithubLogo style="color: white; fill: white;"/> 
        </va-button>
      </va-navbar-item>
    </template>
  </va-navbar>
  <ScrollWrapper v-if="!isLoading">
    <DraggableCanvas 
      v-model:items="items"
      v-model:mouse="mouse"
      style="z-index: 1;"
    >
      <template #item="{ index, listeners, style, item }">
        <va-card class="action-card" style="opacity: 0.94;">
          <va-card-title v-on="listeners" :style="{ color: 'var(--va-primary)', background: 'rgba(0, 0, 0, 0.1)', ...style }" >
          Action <span class="ml-2">{{ item.id + 1 }}</span>
          </va-card-title>
          <va-card-content class="pt-2">
            <va-input label="Text" type="textarea" v-model="item.text" placeholder="Message text" />
          </va-card-content>
    
          <va-card-content v-if="item.buttons.length">
              <va-list-label color="primary">Buttons</va-list-label>
              <template v-for="buttonRow in (item as BuilderMessage).buttons">
                <va-card outlined v-for="button in buttonRow" style="margin: 0 -8px;" class="mb-1">
                  <va-list-item class="bot-button">
                      <va-button class="mr-2" icon="delete" color="danger" @click="removeButton(item, button)" />
                      <div class="pr-2">
                        <va-input
                          v-model="button.text"
                          label="Button Text"
                          placeholder="Button text"
                        />
                        <va-input
                          v-if="button.url !== undefined"
                          class="mt-2"
                          v-model="button.url" 
                          label="Button url"
                          placeholder="Button url"
                        /> 
                      </div>
                      <div class="bot-button__state-buttons">
                        <va-button
                          class="state-button"
                          :class="{ 'state-button--selected':  button.url === undefined }"
                          @click="connectFrom(item, button, $event); button.url = undefined"
                          :icon="isButtonConnected(button) ? 'moving' : 'show_chart'" 
                          :color="isButtonConnected(button) ? 'success' : 'warning'"
                          :ref="setButtonRef(button)"
                        />
                        <va-button
                          class="state-button"
                          :class="{ 'state-button--selected':  button.url !== undefined }"
                          @click="undoConnectFrom(); unconnectButton(button); button.url = ''"
                          icon="link" 
                        />
                      </div>
                  </va-list-item>
                </va-card>
              </template>
          </va-card-content>
    
          <va-card-actions align="between">
            <va-button :disabled="items.length === 1" color="danger" @click="removeItem(index)" icon="delete" fab></va-button>
            <va-button @click="addButton(item)" icon="add">Add button</va-button>
          </va-card-actions>
          <div class="connect-to-circle d-flex align--center justify--center" @click="connectTo(item, $event)" :ref="setItemConnectRef(item)">
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
  </ScrollWrapper>
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
  top: 0;
  z-index: -1;
}

.action-card {
  position: relative;
  .connect-to-circle {
    position: absolute;
    left: -16px;
    top: 30px;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    transform: translateY(-50%);
  }

  .bot-button {
    position: relative;
    align-items: flex-start;

    &__state-buttons {
      position: relative;
      padding: 12px;
      transform: translateY(10%);
      & > .state-button {
        position: absolute;
        transform: translateX(50%) translateY(-10%);
        left: 0;
        top: 0;
        z-index: 0;
        &.state-button--selected {
          margin: 0;
          position: relative;
          transform: none;
        }
      }
      & > .state-button--selected {
        z-index: 1;
      }
    }
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
