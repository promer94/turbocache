import { defaultApiHandler } from '~/service/handler'
import * as z from 'zod'
import { verifySlug } from '~/service/project'

const handler = defaultApiHandler().get(async (req, res) => {
  const slug = z.string().safeParse(req.query.slug)
  if (slug.success) {
    const result = await verifySlug(slug.data)
    if (result) {
      return res.status(200).json({ used: true })
    }
    return res.status(200).json({ used: false })
  }
  res.status(400).json({ error: 'Invalid slug' })
})

export default handler
