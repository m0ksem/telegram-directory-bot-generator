import { BotButtonUrl } from './../../../types/bot-config';
import { BotMessage, BotButton, BotButtonId, BotMessageId } from 'types'

export type Point = { x: number, y: number }

export type BuilderButton = BotButton & { 
  el?: HTMLElement,
  id: BotButtonId,
  messageId?: BotMessageId,
  url?: BotButtonUrl
}

export type BuilderButtonRow = BuilderButton[]

export type BuilderMessage = Omit<BotMessage, 'buttons'> & {
  buttons: BuilderButtonRow[]
  position: Point,
  el?: HTMLElement
}

export type Connection = { item: BuilderMessage, el?: HTMLElement }

export type StartConnection = Connection & { button: BuilderButton }
