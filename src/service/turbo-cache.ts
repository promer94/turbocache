import { NextApiResponse } from "next";
import { Middleware } from "next-connect";
import is from "@sindresorhus/is";
import { parseRequest } from "../lib/parseToken";
import prisma from "../lib/prisma";
import { LoggerRequest } from "./log";
import { logger } from "../lib/logger";

export interface TokenRequst extends LoggerRequest {
  userId: string;
  teamId: string;
}
export interface CacheRequst extends LoggerRequest {
  cache: string;
  userId: string;
  teamId: string;
}

export const turboTokenMiddleWare: () => Middleware<
  TokenRequst,
  NextApiResponse
> = () => async (req, res, next) => {
  const { authorization, teamId } = parseRequest(req);
  const turbo = await prisma.turboToken.findUnique({
    where: {
      token: authorization,
    },
  });
  if (turbo && turbo.teamId === teamId) {
    req.userId = turbo.userId;
    req.teamId = turbo.teamId;
    logger.success("token verify success");
    next();
  } else {
    logger.info("token verify failed");
    next("token verify failed");
    res.status(401).end("Bad Request");
  }
};

export const turboCacheMiddleWare: () => Middleware<
  CacheRequst,
  NextApiResponse
> = () => async (req, res, next) => {
  const { hash } = req.query;
  if (is.nonEmptyString(hash)) {
    req.cache = `/${req.teamId}/${hash}`;
    next();
  } else {
    next("hash is missing");
    res.status(403).end("Bad Request");
  }
};
