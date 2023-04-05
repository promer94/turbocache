import { NextApiRequest, NextApiResponse, PageConfig } from 'next'
import { turboTokenMiddleWare } from '../../../../service/turbo-cache'
import { defaultApiHandler } from '../../../../service/handler'

const hanlder = defaultApiHandler()
  .use(turboTokenMiddleWare())
  .get<NextApiRequest, NextApiResponse>(async (_, res) => {
    res.status(200).json({
      status: 'enabled',
    })
  })

export default hanlder

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}
