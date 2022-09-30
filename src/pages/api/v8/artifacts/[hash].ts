import { NextApiResponse, PageConfig } from "next";
import {
  turboCacheMiddleWare,
  turboTeamMiddleWare,
  turboTokenMiddleWare,
} from "../../../../service/turbo-cache";
import { defaultApiHandler } from "../../../../service/handler";
import { storageMiddleware, StorageRequest } from '../../../../service/storage'
import { S3 } from '../../../../lib/s3/aws';
import { minio } from '../../../../lib/s3/minio';

const storage = process.env.NODE_ENV === 'development' ? minio : S3
const hanlder = defaultApiHandler()
  .use(turboTokenMiddleWare())
  .use(turboTeamMiddleWare())
  .use(turboCacheMiddleWare())
  .use(storageMiddleware(storage))
  .options<StorageRequest, NextApiResponse>(async (req, res) => {
    try {
      const method = req.headers["access-control-request-method"];
      if (method && method.toLowerCase().includes("put")) {
        const url = await req.storage.signedUploadUrl(req.cache);
        res.setHeader("location", url);
        res.status(200).end("");
      } else if (method && method.toLowerCase().includes("get")) {
        const url = await req.storage.download(req.cache);
        res.setHeader("location", url);
        res.status(200).end("");
      } else {
        res.setHeader("Access-Control-Allow-Headers", "Authorization");
        res.status(200).end("");
      }
    } catch (e) {
      req.logger.error({ error: e }, 'Preflight Middleware Error');
      res.status(404).end("");
    }
  })
  .get<StorageRequest, NextApiResponse>(async (req, res) => {
    try {
      const url = await req.storage.download(req.cache);
      res.setHeader("location", url);
      res.status(307);
      res.end("");
    } catch (e) {
      res.status(404).end("");
    }
  })
  .put<StorageRequest, NextApiResponse>(async (req, res) => {
    try {
      await req.storage.upload(req.cache, req);
      res.status(204).end("");
    } catch (e) {
      req.logger.error({ error: e }, 'Artifacts Upload Error');
      res.status(504).end("");
    }
  });

export default hanlder;

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
