import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/service/db/prisma'
import { defaultApiHandler } from '~/service/handler'
import is from '@sindresorhus/is'
import { getApiSession } from '~/service/auth/next-auth'
import { findTeamsByUser } from '~/service/team'

const onBorad = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getApiSession(req, res)
  if (session) {
    const teams = await findTeamsByUser(req, res)
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
      await prisma.permission.create({
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
