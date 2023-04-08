import { NextApiResponse } from 'next'
import prisma from '~/src/lib/prisma'
import { defaultApiHandler } from '~/src/service/handler'
import { sessionMiddleWare, UserRequest } from '~/src/service/session'
import is from '@sindresorhus/is'
const onBorad = async ({ id, name }: { id: string; name?: string | null }) => {
  const team = await prisma.permission.findMany({
    where: {
      userId: id,
    },
  })
  if (is.nonEmptyArray(team)) {
    const result = await prisma.team.create({
      data: {
        name,
      },
    })
    await prisma.permission.create({
      data: {
        teamId: result.id,
        userId: id,
        role: 'ADMIN',
      }
    })
  }
}

const handler = defaultApiHandler()
  .use(sessionMiddleWare())
  .get<UserRequest, NextApiResponse>(async (req, res) => {
    await onBorad({ id: req.user.id, name: `personal` })
    res.redirect('/turborepo/onboarding')
  })

export default handler
