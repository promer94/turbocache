import { defaultApiHandler } from '~/service/handler'
import { getSession } from '~/service/auth/next-auth'
import { findAuthUser, changeUserName } from '~/service/user'

const handler = defaultApiHandler()
  .get(async (req, res) => {
    const session = await getSession(req, res)
    if (session) {
      const result = await findAuthUser({
        userId: session.user.id,
      })
      return res.status(200).json(result)
    }
    res.status(401).end('Unauthorized')
  })
  .post(async (req, res) => {
    const session = await getSession(req, res)
    if (session) {
      await changeUserName({
        ...req.body,
        userId: session.user.id,
      })
      return res.status(200).json({ success: true })
    }
    res.status(401).end('Unauthorized')
  })

export default handler