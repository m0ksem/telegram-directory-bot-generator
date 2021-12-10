import { BotButton, BotMessage } from './config/types';
import { Telegraf }  from 'telegraf'
import { config } from './config'
import { InlineKeyboardButton, InlineKeyboardMarkup, Update } from 'telegraf/typings/core/types/typegram';
import { createSessions } from './session';
import { ExtraEditMessageText } from 'telegraf/typings/telegram-types';

const createTelegramButtons = (button: BotButton): InlineKeyboardButton => {
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
  const sessions = createSessions<{ prevMessage?: string }>({ prevMessage: undefined })

  const createTelegramMessage = (message: BotMessage, prevMessage?: string): { text: string, extra?: ExtraEditMessageText } => {
    const keyboard = createTelegramKeyboard(message.buttons)

    const homeButton = message.hideHomeButton ? undefined : config.settings.homeButton
    const backButton = message.hideBackButton ? undefined : config.settings.backButton

    if (backButton) {
      keyboard.inline_keyboard.push([
        createTelegramButtons({ text: backButton.text, messageId: prevMessage || '0' })
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

    if (ctx.callbackQuery.data.startsWith('go-to-message-')) {
      const messageId = ctx.callbackQuery.data.replace('go-to-message-', '')
      const session = sessions[ctx.from?.id || '']

      const message = messages.find((message) => message.id === messageId)

      if (!message) { throw new Error(`Invalid message id ${messageId}`)}

      const { text, extra } = createTelegramMessage(message, session.prevMessage)

      ctx.editMessageText(text, extra)

      session.prevMessage = message.id
    }
  })

  bot.launch()
}