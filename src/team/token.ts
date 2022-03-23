import prisma from "../lib/prisma";
import crypto from "crypto";
import { Middleware } from "next-connect";
import { RequestWithCachePath } from "../turbo-cache";
import { NextApiResponse } from "next";
import { parseToken } from "../lib/parseToken";
import is from "@sindresorhus/is";
interface TeamToken {
  teamId: string;
  userId: string;
}

export const createToken = async ({ teamId, userId }: TeamToken) => {
  const token = crypto.randomBytes(32).toString("hex");
  await prisma.turboToken.create({
    data: {
      token,
      teamId,
      userId,
    },
  });
  return token;
};

export interface RequestWithTokenInfo extends RequestWithCachePath {
  info: {
    team: {
      id: string;
      name: string | null;
    };
    user: {
      email: string | null;
      name: string | null;
      id: string
    };
  };
}
export const tokenInfoMiddleWare: () => Middleware<
  RequestWithTokenInfo,
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
      req.info = info;
      next();
    }
  }
};

export const findToken = async (token: string) => {
  return prisma.turboToken.findUnique({
    where: {
      token,
    },
    include: {
      user: {
        select: {
          email: true,
          name: true,
          id: true,
        },
      },
      team: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};
