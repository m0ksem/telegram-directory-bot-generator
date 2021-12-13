import { initBot } from 'bot'

const stopBot = initBot(process.env.BOT_TOKEN as string, { messages: [], settings: {} })

setTimeout(() => stopBot(), 1000)
