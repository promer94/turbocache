import prisma from '../../lib/prisma'
import { sessionMiddleWare, UserRequest } from '../../service/session'
import { randomBytes } from 'crypto'
import { defaultApiHandler } from '../../service/handler'
import { NextApiResponse } from 'next'

const handler = defaultApiHandler()
  .use(sessionMiddleWare())
  .post<UserRequest, NextApiResponse>(async (req, res) => {
    const token = await prisma.turboToken.create({
      data: {
        token: randomBytes(32).toString('hex'),
        userId: req.user.id,
        teamId: req.user.id,
      },
    })
    res.json({
      token: token.token,
    })
  })

export default handler
