import { defaultApiHandler } from '~/service/handler'
import is from '@sindresorhus/is'
import { getSession } from '~/service/auth/next-auth'
import { createProject, findProjectsByUser } from '~/service/project'

const handler = defaultApiHandler().get(async (req, res) => {
  const session = await getSession(req, res)
  const result = await findProjectsByUser({
    userId: session.user.id,
  })
  if (is.emptyArray(result.projects)) {
    await createProject({
      name: `${session.user.name}'s Personal Project`,
      userId: session.user.id,
      role: 'ADMIN',
      description: 'Your awesome project !',
    })
  }
  res.redirect(`/dashboard`)
})

export default handler
