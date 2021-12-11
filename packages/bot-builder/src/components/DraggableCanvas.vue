<script setup lang="ts">
import { ref, computed, PropType, watch } from 'vue'
import { useSelected } from '../hooks/useSelected'
import { useItemRefs } from '../hooks/useItemRefs'
import { useSyncProp } from '../hooks/useSyncProp'

const emit = defineEmits(['update:items', 'update:hovered', 'update:selected', 'update:mouse'])

type Item = { position: { x: number, y: number }, data: any, }

const props = defineProps({
  items: { type: Array as PropType<Item[]>, default: () => [] }
})

const [computedItems] = useSyncProp(props, 'items', emit)

const { itemRefs, setItemRef } = useItemRefs<HTMLElement>()

const { selected: selectedItem, set: selectItem, unset: unSelectItem } = useSelected<Item>()
const { selected: hoveredItemIndex, set: hoverItem, unset: unHoverItem } = useSelected<number>()

const canvas = ref()
const clickOffset = ref({ x: 0, y: 0 })
const onMouseMove = (e: MouseEvent) => {
  const { x, y, width, height } = canvas.value.getBoundingClientRect()

  emit('update:mouse', {
    x: e.x - x - (width / 2),
    y: e.y - y - (height / 2)
  })

  if (!selectedItem.value || hoveredItemIndex.value === null) { return }

  const itemRef = itemRefs.value[hoveredItemIndex.value]

  const position = { 
    x: e.x - x - (width / 2) - clickOffset.value.x + itemRef.offsetWidth / 2,
    y: e.y - y - (height / 2) - clickOffset.value.y +  itemRef.offsetHeight / 2
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
  if (hoveredItemIndex.value === null) { return }

  const { x, y } = (e.target as HTMLElement).getBoundingClientRect()
  clickOffset.value = { x: e.x - x, y: e.y - y }

  selectItem(computedItems.value[hoveredItemIndex.value]);
}

const onMouseUp = () => { unSelectItem(); }

let timer = -1
const onItemMouseEnter = (item: Item, index: number) => { 
  clearTimeout(timer)
  hoverItem(index)
}

const onItemMouseLeave = (item: Item) => {
  unHoverItem();
  timer = setTimeout(() => { unSelectItem(); }, 2000)
}

watch(selectedItem, (newVal) => { emit('update:selected', newVal) })
watch(hoveredItemIndex, (newVal) => { emit('update:hovered', newVal) })
</script>

<template>
  <div
    class="draggable-canvas-wrapper"
    @mousemove="onMouseMove"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mouseleave="unSelectItem"
  >
    <div 
      class="draggable-canvas" 
      ref="canvas"
    >
      <div 
        class="draggable-canvas__item"
        v-for="(item, index) in computedItems" :key="index"
        :style="getItemStyle(item)"
        :ref="setItemRef"
      >
        <slot name="item" v-bind="{ 
          index, item, style: { cursor: 'move' }, 
          listeners: { mouseenter: () => onItemMouseEnter(item, index), mouseleave: () => onItemMouseLeave(item)} 
        }">
          <div class="draggable-canvas__item-content">
            {{ item.position }}
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
    overflow-x: auto;
    overflow-y: auto
  }

  .draggable-canvas {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

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