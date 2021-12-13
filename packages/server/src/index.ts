import { Bot } from 'bot'

const bot = new Bot(process.env.BOT_TOKEN as string, { messages: [], settings: {} })

bot.updateConfig({ messages: [], settings: {} })
