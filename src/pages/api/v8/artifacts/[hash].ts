import { NextApiResponse, PageConfig } from "next";
import {
  CacheRequst,
  turboCacheMiddleWare,
  turboTokenMiddleWare,
} from "../../../../service/turbo-cache";
import { s3Storage } from "../../../../lib/s3-client";
import { defaultApiHandler } from "../../../../service/handler";
import { logger } from "../../../../lib/logger";

const hanlder = defaultApiHandler()
  .use(turboTokenMiddleWare())
  .use(turboCacheMiddleWare())
  .options<CacheRequst, NextApiResponse>(async (req, res) => {
    try {
      const method = req.headers["access-control-request-method"];
      if (method && method.toLowerCase().includes("put")) {
        const url = await s3Storage.signedUploadUrl(req.cache);
        res.setHeader("location", url);
        req.logger.info(`OPTION, signed upload url: ${url}`);
        res.status(307).end("");
      } else {
        res.setHeader("Access-Control-Allow-Headers", "Authorization");
        res.status(200).end("");
      }
    } catch (e) {
      req.logger.error(e);
      res.status(500).end("Internal Error");
    }
  })
  .get<CacheRequst, NextApiResponse>(async (req, res) => {
    try {
      const url = await s3Storage.download(req.cache);
      req.logger.info(`GET, signed download url: ${url}`);
      res.setHeader("location", url);
      res.status(307);
      res.end("");
    } catch(e) {
      req.logger.error(e);
      res.status(404).end("");
    }
  })
  .put<CacheRequst, NextApiResponse>(async (req, res) => {
    try {
      await s3Storage.upload(req.cache, req);
      res.status(204).end("");
    } catch (e) {
      req.logger.error(e);
      res.status(504).end("");
    }
  });

export default hanlder;

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
