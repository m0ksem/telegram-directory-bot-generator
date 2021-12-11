import { ref, Ref, onMounted, onBeforeUnmount, unref } from 'vue'

const useHook = () => { 
  const handler = { cb: undefined as any }

  const create = (cb: (...args: any[]) => any) => {
    handler.cb = cb
  }

  const call = (...args: any[]) => {
    if (handler.cb) { handler.cb(...args) }
  }

  return { create, call }
}

export const useMouse = (target?: HTMLElement | Ref<HTMLElement>) => {
  const mouse = ref({ x: 0, y: 0 })

  const safeTarget = (unref(target) || window) as HTMLElement

  const { create: onRightClick, call: callRightClick } = useHook()

  const mouseDownHandler = (e: MouseEvent) => {
    if (e.button === 2) { callRightClick(e) }
  }

  const moveHandler = (e: MouseEvent) => {
    mouse.value = { x: e.x, y: e.y }
  }

  onMounted(() => {
    safeTarget.addEventListener('mousedown', mouseDownHandler)
    safeTarget.addEventListener('mousemove', moveHandler)
  })


  onBeforeUnmount(() => {
    safeTarget.removeEventListener('mousemove', moveHandler)
  })

  safeTarget.oncontextmenu = (e: MouseEvent) => e.preventDefault()

  return {
    mouse,
    onRightClick,
  }
}