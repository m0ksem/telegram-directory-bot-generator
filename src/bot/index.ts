import { BotButton, BotMessage } from './config/types';
import { Telegraf }  from 'telegraf'
import { config } from './config'
import { InlineKeyboardButton, InlineKeyboardMarkup, Update } from 'telegraf/typings/core/types/typegram';
import { createSessions } from './session';
import { ExtraEditMessageText } from 'telegraf/typings/telegram-types';

type BotCustomButton = { text: string, data: string}

const createTelegramButtons = (button: (BotButton | BotCustomButton)): InlineKeyboardButton => {
  if ('data' in button) {
    return {
      text: button.text,
      callback_data: `${button.data}`
    }
  }

  if (button.messageId) {
    return {
      text: button.text,
      callback_data: `go-to-message-${button.messageId}`
    }    
  }

  if (button.url) {
    return {
      text: button.text,
      url: `${button.url}`
    }
  }

  throw new Error(`Url or messageId is required`)
}

const createTelegramKeyboard = (buttons: BotButton[][] = [],): InlineKeyboardMarkup => {
  const keyboard = buttons.map((buttonRow) => buttonRow.map((button) => createTelegramButtons(button)))

  return {
    inline_keyboard: keyboard
  }
}

export const initBot = (token: string) => {
  const bot = new Telegraf(token)
  const messages = config.messages
  const sessions = createSessions({ 
    history: [] as string[],
    getPrevious() {
      return this.history[this.history.length - 1 - 1]
    },
    pop() {
      return this.history.pop()
    }
  })

  const createTelegramMessage = (message: BotMessage): { text: string, extra?: ExtraEditMessageText } => {
    const keyboard = createTelegramKeyboard(message.buttons)

    const homeButton = message.hideHomeButton ? undefined : config.settings.homeButton
    const backButton = message.hideBackButton ? undefined : config.settings.backButton

    if (backButton) {
      keyboard.inline_keyboard.push([
        createTelegramButtons({ text: backButton.text, data: `back` })
      ])
    }

    if (homeButton) {
      keyboard.inline_keyboard.push([
        createTelegramButtons({ text: homeButton.text, messageId: homeButton.messageId || '0' })
      ])
    }
  
    return {
      text: message.text,
      extra: {
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      }
    }
  }

  bot.start((ctx) => {
    const { text, extra } = createTelegramMessage(messages[0])
    ctx.reply(text, extra)
  })

  bot.on('callback_query', (ctx) => {
    if (!('data' in ctx.callbackQuery)) {
      return
    }

    const data = ctx.callbackQuery.data

    if (data.startsWith('back')) {
      const session = sessions[ctx.from?.id || '']

      const messageId = session.getPrevious()

      const message = messages.find((message) => message.id === messageId)

      if (!message) { throw new Error(`Invalid message id ${messageId}`)}

      const { text, extra } = createTelegramMessage(message)

      ctx.editMessageText(text, extra)

      session.pop()
      return
    }

    if (data.startsWith('go-to-message-')) {
      const messageId = data.replace('go-to-message-', '')
      const session = sessions[ctx.from?.id || '']

      const message = messages.find((message) => message.id === messageId)

      if (!message) { throw new Error(`Invalid message id ${messageId}`)}

      const { text, extra } = createTelegramMessage(message)

      ctx.editMessageText(text, extra)

      session.history.push(message.id)
      return
    }
  })

  bot.launch()
}