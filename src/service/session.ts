import { GetServerSidePropsContext, NextApiResponse } from "next";
import { Middleware } from "next-connect";
import { Session } from "next-auth";
import { User } from "@prisma/client";
import prisma from "../lib/prisma";
import { serverSession } from "../lib/next-auth";
import { LoggerRequest } from "./log";
export interface UserRequest extends LoggerRequest {
  user: {
    id: string;
    name: string | null;
  };
}

export const getServerSideSession = async (
  context: GetServerSidePropsContext
): Promise<
  | [{ session: Session; user: User }, null]
  | [
    null,
    {
      redirect: {
        destination: string;
        permanent: boolean;
      };
    }
  ]
> => {
  const session = await serverSession(context);
  if (!session) {
    return [
      null,
      {
        redirect: {
          destination: "/api/auth/signin",
          permanent: false,
        },
      },
    ];
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
  });
  if (!user) {
    return [
      null,
      {
        redirect: {
          destination: "/api/auth/signin",
          permanent: false,
        },
      },
    ];
  }
  return [{ session, user }, null];
};

export const sessionMiddleWare: () => Middleware<
  UserRequest,
  NextApiResponse
> = () => async (req, res, next) => {
  try {
    const session = await serverSession({ req, res });
    if (!session) {
      res.status(401).send("Unauthorized");
    } else {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
      });
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).send("user info is missing");
      }
    }
  } catch (e) {
    req.logger.error({ error: e }, 'sessionMiddleWare Error');
    res.status(500).send("Internal Error");
  }
};
