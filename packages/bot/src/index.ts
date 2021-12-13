import { initBot } from './bot'
import { config } from './config'
import './utils/loadDotEnv'

initBot(process.env.BOT_TOKEN as string, config)

export { initBot } from './bot'