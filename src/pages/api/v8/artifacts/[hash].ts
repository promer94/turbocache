import { NextApiResponse, PageConfig } from "next";
import nc from "next-connect";
import {
  RequestWithCachePath,
  turboCacheMiddleWare,
} from "../../../../turbo-cache";
import { supaBaseStorageClient } from "../../../../lib/supabase";

const hanlder = nc<RequestWithCachePath, NextApiResponse>()
  .use(turboCacheMiddleWare())
  .get(async (req, res) => {
    try {
      const url = await supaBaseStorageClient.download(req.cache);
      res.setHeader("location", url);
      res.status(307);
      res.end("");
    } catch {
      res.status(404).end("");
    }
  })
  .put(async (req, res) => {
    try {
      const result = await supaBaseStorageClient.query(req.cache);
      if (!result) {
        await supaBaseStorageClient.upload(req.cache, req);
      }
      res.status(204).end("");
    } catch {
      res.status(504).end("");
    }
  });

export default hanlder;

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
