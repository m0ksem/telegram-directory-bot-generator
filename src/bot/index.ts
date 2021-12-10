import { BotButton, BotMessage, BotConfig } from './config/types';
import { Context, Telegraf,  }  from 'telegraf'
import { config } from './config'
import { InlineKeyboardButton, InlineKeyboardMarkup, Update } from 'telegraf/typings/core/types/typegram';
import { keyboard } from 'telegraf/typings/markup';

const createTelegramButtons = (button: BotButton): InlineKeyboardButton => {
  return {
    text: button.text,
    callback_data: `go-to-message-${button.messageId}`
  }
}

const createTelegramKeyboard = (buttons: BotButton[][] = [], homeButton?: BotConfig['settings']['homeButton']): InlineKeyboardMarkup => {
  const keyboard = buttons.map((buttonRow) => buttonRow.map((button) => createTelegramButtons(button)))

  if (homeButton) {
    keyboard.push([
      createTelegramButtons({ text: homeButton.text, messageId: homeButton.messageId || '0' })
    ])
  }

  return {
    inline_keyboard: keyboard
  }
}

export const initBot = (token: string) => {
  const bot = new Telegraf(token)
  const messages = config.messages

  const createTelegramMessage = (message: BotMessage) => {
    const homeButton = message.hideHomeButton ? undefined : config.settings.homeButton
  
    return {
      text: message.text,
      extra: {
        reply_markup: createTelegramKeyboard(message.buttons, homeButton),
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

      const message = messages.find((message) => message.id === messageId)

      if (!message) { throw new Error(`Invalid message id ${messageId}`)}

      const { text, extra } = createTelegramMessage(message)

      ctx.editMessageText(text, extra)
    }
  })

  bot.launch()
}