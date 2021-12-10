<script setup lang="ts">
import { ref, computed, PropType, watch } from 'vue'
import { useSelected } from '../hooks/useSelected'

const emit = defineEmits(['update:items', 'update:hovered', 'update:selected'])

type Item = {
  data: any, position: { x: number, y: number },
}

const props = defineProps({
  items: { type: Array as PropType<Item[]>, default: () => [] }
})

const computedItems = computed<Item[]>({
  get() { return props.items },
  set(val) { emit('update:items', val) }
})

const { selected: selectedItem, set: selectItem, unset: unselectItem } = useSelected<Item>()
const { selected: hoveredItem, set: hoverItem, unset: unHoverItem } = useSelected<Item>()

const canvas = ref()
const clickOffset = ref({ x: 0, y: 0 })
const onMouseMove = (e: MouseEvent) => {
  if (!selectedItem.value) { return }

  const { x, y, width, height } = canvas.value.getBoundingClientRect()

  const position = { 
    x: e.x - x - (width / 2) - clickOffset.value.x,
    y: e.y - y - (height / 2) - clickOffset.value.y
  }

  selectedItem.value.position = position
}

const getItemStyle = (item: Item) => {
  return {
    transform: `translateX(${item.position.x}px) translateY(${item.position.y}px) translateX(-50%) translateY(-50%)`
  }
}

const onMouseDown = (e: MouseEvent) => {
  const { x, y, width, height } = (e.target as HTMLElement).getBoundingClientRect()
  clickOffset.value = { x: e.x - x - width / 2, y: e.y - y - height - height / 2 }

  if (!hoveredItem.value) { return }

  selectItem(hoveredItem.value);
}

const onMouseUp = () => { unselectItem(); }

const createItemListeners = (item: Item) => {
  let timer = -1

  return {
    mouseover: () => {
      clearTimeout(timer)
      hoverItem(item)
    },
    mouseout: () => {
      timer = setTimeout(() => unHoverItem(), 1000)
    },
  }
}

const createItemStyle = () => { cursor: 'move' }

watch(selectedItem, () => emit('update:selected', selectedItem.value))
watch(hoverItem, () => emit('update:hovered', hoveredItem.value))
</script>

<template>
  <div 
    class="draggable-canvas" 
    ref="canvas"
    @mousemove="onMouseMove"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mouseout="unselectItem"
  >
    <div 
      class="draggable-canvas__item"
      v-for="(item, index) in computedItems" :key="index"
      :style="getItemStyle(item)"
    >
      <slot name="item" v-bind="{ item, data: item.data, style: createItemStyle(), listeners: createItemListeners(item) }">
        <div class="draggable-canvas__item-content">
          {{ item.data }}
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
  .draggable-canvas {
    position: relative;
    background: gray;
    height: 50%;
    width: 50%;
    // overflow: hidden;

    &__item {
      cursor: pointer;
      position: absolute;
      user-select: none;
      left: 50%;
      top: 50%;
    }

    &__item-content {
      padding: 16px;
      background: white;
    }
  }
</style>