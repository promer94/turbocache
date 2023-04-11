import { defaultApiHandler } from '~/service/handler'
import { getSession } from '~/service/auth/next-auth'
import { editProject, findProjectBySlugOrId } from '~/service/project'
import * as z from 'zod'

const handler = defaultApiHandler()
  .get(async (req, res) => {
    const session = await getSession(req, res)
    const projectId = z.string().parse(req.query.projectId)
    const data = await findProjectBySlugOrId({
      userId: session.user.id,
      projectId,
    })
    if (!data) {
      res.status(404).end('Not Found')
      return
    }
    res.status(200).json({
      project: {
        ...data?.project,
        role: data?.role,
      },
    })
  })
  .post(async (req, res) => {
    const session = await getSession(req, res)
    const projectId = z.string().parse(req.query.projectId)
    const project = await findProjectBySlugOrId({
      userId: session.user.id,
      projectId,
    })
    if (project?.role !== 'ADMIN') {
      res.status(401).json({ success: false })
      return
    }
    await editProject({
      ...req.body,
      projectId,
    })
    res.status(200).json({ success: true })
  })

export default handler
