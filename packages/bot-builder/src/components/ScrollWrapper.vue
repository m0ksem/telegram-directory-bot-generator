<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useMouse } from '../hooks/useMouse'
import { useMouseScroll } from '../hooks/useMouseScroll'

const position = ref({ x: 0, y: 0 })

const { mousemove, buttons, mouse, normalize } = useMouse()

const { scroll } = useMouseScroll(undefined, { 
  max: 0.7,
  min: 0,
  speed: 0.1
})

const scale = computed(() => 1 - scroll.value)

const scrollContentStyle = computed(() => {
  const posx = position.value.x / (1 / scale.value)
  const posy = position.value.y / (1 / scale.value)

  return {
    transform: `translateX(${posx}px) translateY(${posy}px) scale(${scale.value}) translateX(-50%) translateY(-50%)`
  }
})

watch(mousemove, (directions) => {
  if (buttons.value.right) {
    position.value.x += directions.x * ((1 / scale.value))
    position.value.y += directions.y * ((1 / scale.value))
  }
})

const translateMouseCords = () => {
  // TODO: Scroll into cords instead of center
  return {
    x: (normalize().x) / (scale.value) - position.value.x,
    y: (normalize().y) / (scale.value) - position.value.y
  }
}
</script>

<template>
  <div class="scroll-wrapper">
    <div class="scroll-wrapper__content" :style="scrollContentStyle">
      <slot v-bind="{ position, scale }"></slot>
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
    height: 500%;
    width: 500%;
    left: 50%;
    top: 50%;
    transform-origin: 0 0 0;
  }
}
</style>