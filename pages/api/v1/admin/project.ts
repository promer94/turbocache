import { defaultApiHandler } from '~/service/handler'
import is from '@sindresorhus/is'
import { getSession } from '~/service/auth/next-auth'
import { findProjectsByUser, createProject } from '~/service/project'

const handler = defaultApiHandler()
  .get(async (req, res) => {
    const session = await getSession(req, res)
    if (session) {
      const result = await findProjectsByUser({
        userId: session.user.id,
      })
      if (is.nonEmptyArray(result.projects)) {
        return res.status(200).json(result)
      }
    }
    res.status(200).json({ projects: [], total: 0 })
  })
  .post(async (req, res) => {
    const session = await getSession(req, res)
    if (session) {
      await createProject({
        ...req.body,
        userId: session.user.id,
        role: 'ADMIN',
      })
    }
    res.status(200).json({ success: true })
  })

export default handler
