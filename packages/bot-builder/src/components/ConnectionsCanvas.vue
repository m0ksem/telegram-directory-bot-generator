<script setup lang="ts">
import { onMounted, ref, PropType, onBeforeUnmount } from 'vue'
import { useColors } from 'vuestic-ui'

type Point = { x: number, y: number }

const props = defineProps({
  connections: { type: Array as PropType<{ start: Point | HTMLElement, end: Point | HTMLElement }[]>, default: [] }
})

const canvas = ref<HTMLCanvasElement>()
const context = ref<CanvasRenderingContext2D>()

const { getColor } = useColors()

const getVueElement = (comp: any) => {
  if ('$el' in comp) return comp.$el

  return comp
}

const safePoint = (point: Point | HTMLElement) => {
  if (point === undefined || !canvas.value) return { x: 0, y: 0 }

  const { x: canvasX, y: canvasY, width: canvasWidth, height: canvasHeight } = canvas.value.getBoundingClientRect()
  const canvasScale = {
    x: canvas.value!.offsetWidth / canvasWidth,
    y: canvas.value!.offsetHeight / canvasHeight
  }

  if ('x' in point && 'y' in point) {
    return {
      x: (point.x - canvasX) * canvasScale.x,
      y: (point.y - canvasY) * canvasScale.y,
    }
  }

  const el = getVueElement(point)

  if (!el.getBoundingClientRect) { return { x: 0, y: 0 } }

  const { x, y, width, height } = el.getBoundingClientRect()

  return {
    x: (x + width / 2 - canvasX) * canvasScale.x,
    y: (y + height / 2 - canvasY) * canvasScale.y,
  }
}

const draw = () => {
  const ctx = context.value as CanvasRenderingContext2D
  const w = canvas.value?.width || 0
  const h = canvas.value?.height || 0
  ctx.clearRect(0, 0, w, h)

  props.connections.forEach((connection) => {
    const start = safePoint(connection.start)
    const end = safePoint(connection.end)

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  })
}

const render = () => {
  requestAnimationFrame(() => {
    draw()
    render()
  })    
}

const updateCanvasHeight = () => {
  if (!canvas.value) { return }
  canvas.value.height = canvas.value.offsetHeight
  canvas.value.width = canvas.value.offsetWidth

  context.value = canvas.value?.getContext('2d') as CanvasRenderingContext2D
  context.value.lineWidth = 12;
  context.value.strokeStyle = getColor('gray')
}

onMounted(() => {
  if (!canvas.value) { return }

  updateCanvasHeight()

  render()

  window.addEventListener('resize', updateCanvasHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCanvasHeight)
})
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