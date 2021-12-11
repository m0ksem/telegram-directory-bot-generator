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
  const mousemove = ref({ x: 0, y: 0 })
  const buttons = ref({ left: false, middle: false, right: false })

  const safeTarget = (unref(target) || window) as HTMLElement

  const { create: onRightClick, call: callRightClick } = useHook()

  const mouseDownHandler = (e: MouseEvent) => {
    if (e.button === 1) { buttons.value.left = true; }
    if (e.button === 4) { buttons.value.middle = true; }
    if (e.button === 2) { callRightClick(e); buttons.value.right = true; }
  }

  const mouseUpHandler = (e: MouseEvent) => {
    buttons.value = { left: false, middle: false, right: false }
  }

  const moveHandler = (e: MouseEvent) => {
    mouse.value = { x: e.x, y: e.y }
    mousemove.value = { x: e.movementX, y: e.movementY }
  }

  onMounted(() => {
    safeTarget.addEventListener('mousedown', mouseDownHandler)
    safeTarget.addEventListener('mouseup', mouseUpHandler)
    safeTarget.addEventListener('mousemove', moveHandler)
  })


  onBeforeUnmount(() => {
    safeTarget.removeEventListener('mousedown', mouseDownHandler)
    safeTarget.removeEventListener('mouseup', mouseUpHandler)
    safeTarget.removeEventListener('mousemove', moveHandler)
  })

  safeTarget.oncontextmenu = (e: MouseEvent) => e.preventDefault()

  return {
    mouse,
    mousemove,
    buttons,
    onRightClick,
  }
}