import { NextApiResponse } from 'next'
import prisma from '~/service/db/prisma'
import { defaultApiHandler } from '~/service/handler'
import is from '@sindresorhus/is'
import { getSession } from '~/service/auth/next-auth'
import { findTeamsByUser } from '~/service/team'
import { LoggerRequest } from '~/service/log'

const onBorad = async (req: LoggerRequest, res: NextApiResponse) => {
  const session = await getSession(req, res)
  if (session) {
    const teams = await findTeamsByUser(session.user.id)
    if (is.emptyArray(teams)) {
      const team = await prisma.team.create({
        include: {
          permissions: {
            include: {
              user: true
            }
          }
        },
        data: {
          name: 'Personal'
        }
      })
      const result = await prisma.permission.create({
        data: {
          role: 'ADMIN',
          userId: session.user.id,
          teamId: team.id
        }
      })
    }
  } 
}

const handler = defaultApiHandler()
  .get(async (req, res) => {
    await onBorad(req, res)
    res.redirect('/turborepo/onboarding')
  })

export default handler
