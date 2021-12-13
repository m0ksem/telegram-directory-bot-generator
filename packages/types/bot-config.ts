export type BotMessageId = string
export type BotButtonId = string
export type BotButtonUrl = string

export type BotMessageIdButton = {
  text: string,
  messageId: BotMessageId,
}

export type BotUrlButton = {
  text: string,
  url: string,
}

export type BotButton = (BotMessageIdButton | BotUrlButton) & { [key: string]: any }

export type BotButtonRow = BotButton[]

export type BotMessage = {
  text: string,
  id: BotMessageId,
  buttons?: BotButtonRow[],

  // Unused for now
  hideHomeButton?: boolean,
  hideBackButton?: boolean

  [key: string]: any
}

export type BotConfig = {
  messages: BotMessage[],
  settings: {
    homeButton?: {
      text: string,
      messageId?: BotMessageId
    },
    backButton?: {
      text: string,
    }
  }
}
