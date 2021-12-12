import { BotConfig } from 'types'

export const config: BotConfig = {
  messages: [
    {
      id: '0',
      text: '**Hello!**',
      buttons: [
        [
          { text: "Move to message 2", messageId: '2' },
          { text: "Move to message 1", messageId: '1' },
        ]
      ],
      hideHomeButton: true,
      hideBackButton: true,
    },
    {
      id: '1',
      text: '1',
      buttons: [
        [
          { text: "Move to message 2", messageId: '2' },
          { text: "Move to message 3", messageId: '3' },
        ],
        [
          { text: "Go to google", url: 'https://google.com' },
        ]
      ],
    },
    {
      id: '2',
      text: '[​​​​​​​​​​​](https://i.pinimg.com/564x/a7/1e/1f/a71e1f35342d524d3dbd11f42966902f.jpg) 2'
    },
    {
      id: '3',
      text: '3 GO BACK!'
    }
  ],
  settings: {
    homeButton: {
      text: 'Go to home',
    },
    backButton: {
      text: 'Back',
    }
  }
}