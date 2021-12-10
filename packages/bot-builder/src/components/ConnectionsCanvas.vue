<script setup lang="ts">
import { onMounted, ref, PropType, watch } from 'vue'

type Point = { x: number, y: number }

const props = defineProps({
  connections: { type: Array as PropType<{ start: Point, end: Point }[]>, default: [] }
})

const canvas = ref<HTMLCanvasElement>()
const context = ref<CanvasRenderingContext2D>()

const draw = () => {
  const ctx = context.value as CanvasRenderingContext2D
  ctx.lineWidth = 15;
  const w = canvas.value?.width || 0
  const h = canvas.value?.height || 0
  ctx.clearRect(0, 0, w, h)

  props.connections.forEach((connection) => {
    ctx.beginPath();
    ctx.moveTo(connection.start.x + w / 2, connection.start.y + h / 2);
    ctx.lineTo(connection.end.x + w / 2, connection.end.y + h / 2);
    ctx.stroke();
  })
}

onMounted(() => {
  if (!canvas.value) { return }

  context.value = canvas.value?.getContext('2d') as CanvasRenderingContext2D
  canvas.value.height = canvas.value.offsetHeight
  canvas.value.width = canvas.value.offsetWidth

  draw()
})

watch(() => props.connections, () => {
  draw()
}, { deep: true })
</script>

<template>
  <canvas ref="canvas" />
</template>

<style lang="scss">
canvas {
  width: 100%;
  height: 100%;
}
</style>