import { defaultApiHandler } from '~/service/handler'
import is from '@sindresorhus/is'
import { getSession } from '~/service/auth/next-auth'
import { createTeam, findTeamsByUser } from '~/service/team'

const handler = defaultApiHandler().get(async (req, res) => {
  const session = await getSession(req, res)
  const result = await findTeamsByUser(session.user.id)
  if (is.emptyArray(result)) {
    await createTeam({
      name: 'My Team',
      userId: session.user.id,
      role: 'ADMIN',
    })
  }
  res.redirect('/dashboard')
})

export default handler
