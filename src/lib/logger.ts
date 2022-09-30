import pino from 'pino'
import { isDevelopement } from './env';
const transport = pino.transport({
  targets: [
    isDevelopement && {
      level: process.env.LOG_LEVEL || 'info',
      target: 'pino-pretty',
      options: {}
    },
  ].filter(Boolean) as any,
})
const logger = pino(isDevelopement ? transport : { level: process.env.LOG_LEVEL || 'info', })
export { logger };
