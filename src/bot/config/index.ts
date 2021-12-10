import { BotConfig } from './types'

export const config: BotConfig = {
  messages: [
    {
      id: '0',
      text: 'Hello!',
      buttons: [
        [
          { text: "Move to message 2", messageId: '2' },
          { text: "Move to message 1", messageId: '1' },
        ]
      ],
      hideHomeButton: true,
    },
    {
      id: '1',
      text: '1',
      buttons: [
        [
          { text: "Move to message 2", messageId: '2' },
          { text: "Move to message 3", messageId: '3' },
        ]
      ],
    },
    {
      id: '2',
      text: '2'
    },
    {
      id: '3',
      text: '3 GO BACK!'
    }
  ],
  settings: {
    homeButton: {
      text: 'Go to home',
    }
  }
}