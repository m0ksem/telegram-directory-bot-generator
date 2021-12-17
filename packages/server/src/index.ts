import { Bot } from 'bot'
import { n } from './utils/test'

const bot = new Bot(process.env.BOT_TOKEN as string, { messages: [], settings: {} })

bot.updateConfig({ messages: [], settings: {} })

console.log(n)
