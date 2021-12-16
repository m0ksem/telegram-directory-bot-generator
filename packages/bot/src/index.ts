import { Bot } from './bot'
import { config } from './config'
import './utils/loadDotEnv'

new Bot(process.env.BOT_TOKEN as string, config)
