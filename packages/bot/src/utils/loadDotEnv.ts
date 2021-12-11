import { config as loadDotEnv } from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  loadDotEnv({ path: './.env.development' })
  console.log('Running in development env.')
} else {
  loadDotEnv({ path: './.env' })
  console.log('Running in production env.')
}

