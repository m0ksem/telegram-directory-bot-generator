export type BotMessageId = string

// TODO: add link or messageID
export type BotButton = {
  text: string,
  messageId: BotMessageId
}

export type BotButtonRow = BotButton[]

export type BotMessage = {
  text: string,
  id: BotMessageId,
  buttons?: BotButtonRow[],
  hideHomeButton?: boolean
}

export type BotConfig = {
  messages: BotMessage[],
  settings: {
    homeButton?: {
      text: string,
      messageId?: string
    }
  }
}
