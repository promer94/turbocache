import { NextApiResponse, PageConfig } from "next";
import {
  CacheRequst,
  turboCacheMiddleWare,
  turboTokenMiddleWare,
} from "../../../../service/turbo-cache";
import { s3Storage } from "../../../../lib/s3-client";
import { defaultApiHandler } from '../../../../service/handler';

const hanlder = defaultApiHandler()
  .use(turboTokenMiddleWare())
  .use(turboCacheMiddleWare())
  .get<CacheRequst, NextApiResponse>(async (req, res) => {
    try {
      const url = await s3Storage.download(req.cache);
      res.setHeader("location", url);
      res.status(307);
      res.end("");
    } catch {
      res.status(404).end("");
    }
  })
  .put<CacheRequst, NextApiResponse>(async (req, res) => {
    try {
      await s3Storage.upload(req.cache, req);
      res.status(204).end("");
    } catch (e) {
      console.log("error", e);
      res.status(504).end("");
    }
  });

export default hanlder;

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
