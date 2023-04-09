import { defaultApiHandler } from '~/service/handler'
import { getSession } from '~/service/auth/next-auth'
import { findTeamByUser, editTeam } from '~/service/team'
import * as z from 'zod'

const handler = defaultApiHandler()
  .get(async (req, res) => {
    const session = await getSession(req, res)
    const teamId = z.string().parse(req.query.teamId)
    const { role, team } = await findTeamByUser({
      userId: session.user.id,
      teamId,
    })
    res.status(200).json({
      team: {
        ...team,
        role,
      },
    })
  })
  .post(async (req, res) => {
    const session = await getSession(req, res)
    const teamId = z.string().parse(req.query.teamId)
    const team = await findTeamByUser({
      userId: session.user.id,
      teamId,
    })
    if (team.role !== 'ADMIN') {
      res.status(401).json({ success: false })
      return
    }
    await editTeam({
      ...req.body,
      teamId,
    })
    res.status(200).json({ success: true })
  })

export default handler
