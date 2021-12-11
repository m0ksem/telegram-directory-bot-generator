import { Item } from "../types";

export const defaultItems: Item[] = [
  {
    data: {
      id: 0,
      text: '',
      buttons: [{
        text: ``,
        id: 0, 
      }]
    },
    position: { x: 0, y: 0 }
  },
  {
    data: {
      text: '',
      id: 1,
      buttons: []
    },
    position: { x: 100, y: 250 }
  }
]
