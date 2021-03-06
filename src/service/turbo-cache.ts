import { NextApiResponse } from "next";
import { Middleware } from "next-connect";
import is from "@sindresorhus/is";
import { parseRequest } from "../lib/parseToken";
import prisma from "../lib/prisma";
import { LoggerRequest } from "./log";

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
  const { authorization } = parseRequest(req);
  const turbo = await prisma.turboToken.findUnique({
    where: {
      token: authorization,
    },
  });
  if (turbo) {
    req.userId = turbo.userId;
    req.teamId = turbo.teamId;
    next();
  } else {
    req.logger.error("Token verify failed");
    res.status(401).end("Token verify failed");
  }
};

export const turboTeamMiddleWare: () => Middleware<
  TokenRequst,
  NextApiResponse
> = () => async (req, res, next) => {
  const { teamId } = parseRequest(req);
  if (req.teamId === teamId) {
    next();
  } else {
    req.logger.error("Team mismatch");
    res.status(401).end("Team mismatch");
  }
};

export const turboCacheMiddleWare: () => Middleware<
  CacheRequst,
  NextApiResponse
> = () => async (req, res, next) => {
  const { hash } = req.query;
  if (is.nonEmptyString(hash)) {
    req.cache = `${req.teamId}/${hash}`;
    next();
  } else {
    res.status(403).end("Bad Request");
  }
};
