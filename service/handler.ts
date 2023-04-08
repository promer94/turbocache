import { NextApiResponse } from 'next'
import nc from 'next-connect'
import { LoggerRequest, loggerMiddleware } from './log'

export const defaultApiHandler = () =>
  nc<LoggerRequest, NextApiResponse>().use(loggerMiddleware())
