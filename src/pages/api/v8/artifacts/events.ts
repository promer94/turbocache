import is from '@sindresorhus/is'
import { NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
import { defaultApiHandler } from '../../../../service/handler'
import {
  TokenRequst,
  turboTokenMiddleWare,
} from '../../../../service/turbo-cache'

const hanlder = defaultApiHandler()
  .use(turboTokenMiddleWare())
  .options((_, res) => {
    res.setHeader('Access-Control-Allow-Headers', 'Authorization')
    res.status(200).end('')
  })
  .post<TokenRequst, NextApiResponse>(async (req, res) => {
    try {
      if (is.nonEmptyArray(req.body)) {
        await prisma.eventItem.createMany({
          data: (req.body as any).map((v: any) => ({
            ...v,
            userId: req.userId,
            teamId: req.teamId,
          })),
        })
      }
    } catch (e) {
      req.logger.error({ error: e }, 'Events Middleware Error')
    }
    res.status(200).send('')
  })

export default hanlder
