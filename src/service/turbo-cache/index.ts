import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-connect";
import is from "@sindresorhus/is";
import { parseToken } from "../../lib/parseToken";
import prisma from "../../lib/prisma";

export interface TokenRequst extends NextApiRequest {
  userId: string;
  teamId: string;
}
export interface CacheRequst extends TokenRequst {
  cache: string;
  userId: string;
  teamId: string;
}

export const turboTokenMiddleWare: () => Middleware<
  TokenRequst,
  NextApiResponse
> = () => async (req, res, next) => {
  const team = req.query["teamId"];
  if (is.nonEmptyString(team)) {
    const authorization = parseToken(req.headers.authorization);
    const teamId = team.replace("team_", "");
    const turbo = await prisma.turboToken.findUnique({
      where: {
        token: authorization,
      },
    });
    if (turbo && turbo.teamId === teamId) {
      req.userId = turbo.userId;
      req.teamId = turbo.teamId;
      next();
    } else {
      res.status(401).end("Bad Request");
    }
  } else {
    res.status(403).end("Bad Request");
  }
};

export const turboCacheMiddleWare: () => Middleware<
  CacheRequst,
  NextApiResponse
> = () => async (req, res, next) => {
  const hash = req.query["hash"];
  if (is.nonEmptyString(hash)) {
    req.cache = `/${req.teamId}/${hash}`;
    next();
  } else {
    res.status(403).end("Bad Request");
  }
};
