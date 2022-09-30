import pino from 'pino'
const transport = pino.transport({
  targets: [
    process.env.NODE_ENV === 'development' && {
      level: process.env.LOG_LEVEL || 'info',
      target: 'pino-pretty',
      options: {}
    },
  ].filter(Boolean) as any,
})
const logger = pino(process.env.NODE_ENV === 'development' ? transport : { level: process.env.LOG_LEVEL || 'info', })
export { logger };
