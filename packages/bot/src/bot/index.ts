import { BotConfig, BotMessage } from 'types';
import { Context, Telegraf }  from 'telegraf'
import { createTelegramButtons, createTelegramKeyboard } from './keyboard'
import { createSessions } from './session';
import { ExtraEditMessageText } from 'telegraf/typings/telegram-types';

export class Bot extends Telegraf {
  config
  sessions

  get messages() { return this.config.messages }

  constructor(token: string, config: BotConfig) {
    super(token)
    this.config = config;

    this.sessions = createSessions({ 
      history: [] as string[],
      getPrevious() { return this.history[this.history.length - 1 - 1] },
    })

    this.start((ctx) => {
      const { text, extra } = this.createTelegramMessage(this.messages[0])
      ctx.reply(text, extra)
    })

    this.on('callback_query', (ctx) => {
      if (!('data' in ctx.callbackQuery)) {
        return
      }
  
      const data = ctx.callbackQuery.data
  
      if (data.startsWith('back')) {
        const session = this.sessions[ctx.from?.id || '']
        const messageId = session.getPrevious()
  
        this.answer(ctx, messageId)
  
        session.history.pop()
        return
      }
  
      if (data.startsWith('go-to-message-')) {
        const session = this.sessions[ctx.from?.id || '']
        const messageId = data.replace('go-to-message-', '')

        const message = this.answer(ctx, messageId)
  
        session.history.push(message.id)
        return
      }
    })

    this.launch()
  }

  createTelegramMessage(message: BotMessage): { text: string, extra?: ExtraEditMessageText }  {
    const keyboard = createTelegramKeyboard(message.buttons)

    const homeButton = message.hideHomeButton ? undefined : this.config.settings.homeButton
    const backButton = message.hideBackButton ? undefined : this.config.settings.backButton

    if (backButton) {
      keyboard.inline_keyboard.push([
        createTelegramButtons({ text: backButton.text, data: `back` })
      ])
    }

    if (homeButton) {
      keyboard.inline_keyboard.push([
        createTelegramButtons({ text: homeButton.text, messageId: homeButton.messageId || this.messages[0].id })
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

  answer(ctx: Context, messageId: string) {
    // TODO: Hot fixed: If message is invalid, return to first message.
    const message = this.messages.find((message) => message.id === messageId) || this.messages[0]
  
    if (!message) { throw new Error(`Invalid message id ${messageId}`)}

    const { text, extra } = this.createTelegramMessage(message)

    ctx.editMessageText(text, extra)

    return message
  }

  updateConfig(config: BotConfig) { this.config = config; this.sessions = {} }
}
