export type Point = { x: number, y: number }

export type ItemButton = {
  text: string,
  id: number | string,
  el?: HTMLElement,
  messageId?: string
  url?: string
}

export type Item = {
  data: {
    id: number,
    text: string,
    buttons: ItemButton[]
  },
  position: Point
}

export type Connection = {
  item: Item, el?: HTMLElement
}

export type StartConnection = Connection & { button: ItemButton }
