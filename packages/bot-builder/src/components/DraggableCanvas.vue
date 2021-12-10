<script setup lang="ts">
import { ref, computed, PropType, watch } from 'vue'
import { useSelected } from '../hooks/useSelected'

const emit = defineEmits(['update:items', 'update:hovered', 'update:selected'])

type Item = { data: any, position: { x: number, y: number } }

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
  const position = item.position || { x: 0, y: 0}

  return {
    transform: `translateX(${position.x}px) translateY(${position.y}px) translateX(-50%) translateY(-50%)`
  }
}

const onMouseDown = (e: MouseEvent) => {
  if (!hoveredItem.value) { return }

  const { x, y, width, height } = (e.target as HTMLElement).getBoundingClientRect()
  clickOffset.value = { x: e.x - x - width / 2, y: e.y - y - height - height / 2 }

  selectItem(hoveredItem.value);
}

const onMouseUp = () => { unselectItem(); console.log('U') }

let timer = -1
const onItemMouseEnter = (item: Item) => { 
  clearTimeout(timer)
  hoverItem(item)
}

const onItemMouseLeave = (item: Item) => {
  unHoverItem();
  timer = setTimeout(() => { unselectItem(); }, 2000)
}

watch(selectedItem, () => emit('update:selected', selectedItem.value))
watch(hoverItem, () => emit('update:hovered', hoveredItem.value))
</script>

<template>
  <div
    class="draggable-canvas-wrapper"
    @mousemove="onMouseMove"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mouseleave="unselectItem"
  >
    <div 
      class="draggable-canvas" 
      ref="canvas"
    >
      <div 
        class="draggable-canvas__item"
        v-for="(item, index) in computedItems" :key="item.data"
        :style="getItemStyle(item)"
      >
        <slot name="item" v-bind="{ 
          index, item, data: item.data, style: { cursor: 'move' }, 
          listeners: { mouseenter: () => onItemMouseEnter(item), mouseleave: () => onItemMouseLeave(item)} 
        }">
          <div class="draggable-canvas__item-content">
            {{ item.data }}
          </div>
        </slot>
      </div>
    </div>    
  </div>
</template>

<style lang="scss">
  .draggable-canvas-wrapper {
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  .draggable-canvas {
    position: relative;
    background: gray;
    height: 100%;
    width: 100%;

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