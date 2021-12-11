import { ref, Ref, onMounted, onBeforeUnmount, unref } from 'vue'

export const useMouse = (target?: HTMLElement | Ref<HTMLElement>) => {
  const mouse = ref({ x: 0, y: 0 })

  const safeTarget = (unref(target) || window) as HTMLElement

  const handler = (e: MouseEvent) => {
    mouse.value = { x: e.x, y: e.y }
  }

  onMounted(() => {
    safeTarget.addEventListener('mousemove', handler)
  })


  onBeforeUnmount(() => {
    safeTarget.removeEventListener('mousemove', handler)
  })

  return {
    mouse,
  }
}