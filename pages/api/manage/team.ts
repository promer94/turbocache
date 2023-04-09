import { defaultApiHandler } from '~/service/handler'
import is from '@sindresorhus/is'
import { getSession } from '~/service/auth/next-auth'
import { findTeamsByUser, createTeam } from '~/service/team'

const handler = defaultApiHandler()
  .get(async (req, res) => {
    const session = await getSession(req, res)
    if (session) {
      const teams = await findTeamsByUser(session.user.id)
      if (is.nonEmptyArray(teams)) {
        return res.status(200).json({
          teams: teams.map((v) => ({
            role: v.role,
            ...v.team,
          })),
        })
      }
    }
    res.status(200).json({ teams: [] })
  })
  .post(async (req, res) => {
    const session = await getSession(req, res)
    if (session) {
      await createTeam({ ...req.body, userId: session.user.id, role: 'ADMIN' })
    }
    res.status(200).json({ success: true })
  })

export default handler
