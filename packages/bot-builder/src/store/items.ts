import { BuilderMessage } from "../types";

export const getDefaultItems = () => {
  return JSON.parse(localStorage.getItem('items') || 'null') || defaultItems
}

export const defaultItems: BuilderMessage[] = [
  {
    id: '0',
    text: 'Welcome!',
    buttons: [
      [
        {
          text: `Go to second message`,
          id: '0',
          messageId: '1',
        },
        {
          text: `Link to our repo!`,
          id: '1',
          url: 'https://github.com/m0ksem/telegram-directory-bot-generator',
        },        
      ]
    ],
    position: { x: -300, y: 0 }
  },
  {
    text: "I'm second message",
    id: '1',
    buttons: [[]],
    position: { x: 250, y: 300 }
  },
  {
    text: "I'm not connected :(",
    id: '2',
    buttons: [
      [
        {
          text: "This button does nothing",
          id: '0',
          messageId: ''
        },        
      ]
    ],
    position: { x: 300, y: -200 }
  },
]
