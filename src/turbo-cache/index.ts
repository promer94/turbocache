import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-connect";
import is from "@sindresorhus/is";
import { RequestWithTokenInfo } from "../team/token";

export interface RequestWithCachePath extends NextApiRequest {
  cache: string;
}

export interface Request extends NextApiRequest {
  user?: string;
}

export const turboCacheMiddleWare: () => Middleware<
  RequestWithTokenInfo,
  NextApiResponse
> = () => async (req, res, next) => {
  const hash = req.query["hash"];
  if (is.nullOrUndefined(hash)) {
    res.status(403).end("no hash");
  } else {
    if (is.nullOrUndefined(req.info)) {
      res.status(403).end("no user info");
    } else {
      req.cache = `${req.info.team.id}/${hash}`;
      next();
    }
  }
};
