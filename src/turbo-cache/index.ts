import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-connect";
import is from "@sindresorhus/is";
import { parseToken } from "../lib/parseToken";
import { findToken } from "../team/token";

export interface RequestWithCachePath extends NextApiRequest {
  cache: string;
}

export interface Request extends NextApiRequest {
  user?: string;
}

export const turboCacheMiddleWare: () => Middleware<
  RequestWithCachePath,
  NextApiResponse
> = () => async (req, res, next) => {
  const token = parseToken(req.headers.authorization);
  if (is.nullOrUndefined(token)) {
    res.status(401).end("Unauthorized");
  } else {
    const info = await findToken(token);
    if (is.nullOrUndefined(info)) {
      res.status(401).end("Unauthorized");
    } else {
      const hash = req.query["hash"];
      if (is.nullOrUndefined(hash)) {
        res.status(403).end("no hash");
      } else {
        req.cache = `${info.team.id}/${hash}`;
        next();
      }
    }
  }
};
