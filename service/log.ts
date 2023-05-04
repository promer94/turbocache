import { NextRequest } from 'next/server'
import { logger } from '../lib/logger'

const withLogger = (handler: (req: NextRequest, nextData: any, context: any) => Promise<Response>) => {
  return async (req: NextRequest, nextData: any) => {
    const log = logger.child({ scpoe: 'API' })
    const response = await handler(req, nextData, {log})
    return response
  }
}
