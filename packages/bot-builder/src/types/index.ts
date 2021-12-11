export type Point = { x: number, y: number }

export type ItemButton = {
  toId: number,
  text: string,
  id: number,
  el?: HTMLElement, 
}

export type Item = {
  data: {
    id: number,
    text: string,
    buttons: ItemButton[]
  },
  position: Point
}