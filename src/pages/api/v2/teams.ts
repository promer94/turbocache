import { NextApiResponse } from 'next'
import { parseToken } from '../../../lib/parseToken'
import prisma from '../../../lib/prisma'
import { defaultApiHandler } from '../../../service/handler'
import { LoggerRequest } from '../../../service/log'

const teams = async (req: LoggerRequest, res: NextApiResponse) => {
  const token = parseToken(req.headers.authorization)
  try {
    const info = await prisma.turboToken.findUnique({
      where: {
        token,
      },
    })
    if (!info) {
      res.status(401).end('Unauthorized')
    } else {
      res.status(200).json({
        teams: [
          {
            id: `team_${info.teamId}`,
            name: 'default team',
          },
        ],
        pagination: {
          count: 1,
          next: null,
          prev: null,
        },
      })
    }
  } catch (e) {
    req.logger.error({ error: e }, 'Teams Middleware Error')
    res.status(500).end('')
  }
}

const handler = defaultApiHandler().get(teams)

export default handler
