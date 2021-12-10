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
const mouse = ref({ x: 0, y: 0 })
const onMouseMove = (e: MouseEvent) => {
  const { x, y, width, height } = canvas.value.getBoundingClientRect()

  mouse.value = { 
    x: e.clientX - x - (width / 2), 
    y: e.clientY - y - (height / 2)
  }

  if (!selectedItem.value) { return }

  selectedItem.value.position =  { ...mouse.value }
}

const getItemStyle = (item: Item) => {
  return {
    transform: `translateX(${item.position.x}px) translateY(${item.position.y}px) translateX(-50%) translateY(-50%)`
  }
}

watch(selectedItem, () => emit('update:selected', selectedItem.value))
watch(hoverItem, () => emit('update:hovered', hoveredItem.value))
</script>

<template>
  <div 
    class="draggable-canvas" 
    ref="canvas"
    @mousemove="onMouseMove"
  >
    <div 
      class="draggable-canvas__item"
      v-for="(item, index) in computedItems" :key="index"
      :style="getItemStyle(item)"
      @mousedown="selectItem(item)"
      @mouseup="unselectItem()"
      @mouseover="hoverItem(item)"
      @mouseout="unHoverItem()"
    >
      <slot name="item">
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
    height: 50vh;
    width: 50vw;

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