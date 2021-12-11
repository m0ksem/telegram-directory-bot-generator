<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useMouse } from '../hooks/useMouse'
import { useMouseScroll } from '../hooks/useMouseScroll'

const position = ref({ x: 0, y: 0 })

const { mousemove, buttons } = useMouse()

watch(mousemove, (directions) => {
  if (buttons.value.right) {
    position.value.x += directions.x
    position.value.y += directions.y
  }
})

const { scroll } = useMouseScroll(undefined, { 
  max: 0.9,
  min: 0,
  speed: 0.1
})

const scrollContentStyle = computed(() => {
  const scrollValue = 1 - scroll.value

  return {
    // width: `${scroll.value * 100}%`,
    // height: `${scroll.value * 100}%`,
    transform: `translateX(${position.value.x}px) translateY(${position.value.y}px) scale(${scrollValue}) translateX(-50%) translateY(-50%)`
  }
})
</script>

<template>
  <div class="scroll-wrapper">
    <div class="scroll-wrapper__content" :style="scrollContentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.scroll-wrapper {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;

  &__content {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 50%;
    top: 50%;
    transform-origin: 0 0 0;
  }
}
</style>