import { BotButton } from 'types';
import { InlineKeyboardButton, InlineKeyboardMarkup, Update } from 'telegraf/typings/core/types/typegram';

type BotCustomButton = { text: string, data: string}

export const createTelegramButtons = (button: (BotButton | BotCustomButton)): InlineKeyboardButton => {
  if ('data' in button) {
    return {
      text: button.text,
      callback_data: `${button.data}`
    }
  }

  if ('messageId' in button) {
    return {
      text: button.text,
      callback_data: `go-to-message-${button.messageId}`
    }    
  }

  if ('url' in button) {
    return {
      text: button.text,
      url: button.url
    }
  }

  throw new Error(`Url or messageId is required`)
}

export const createTelegramKeyboard = (buttons: BotButton[][] = [],): InlineKeyboardMarkup => {
  const keyboard = buttons.map((buttonRow) => buttonRow.map((button) => createTelegramButtons(button)))

  return {
    inline_keyboard: keyboard
  }
}