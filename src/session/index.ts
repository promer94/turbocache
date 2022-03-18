import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getSession } from "next-auth/react";
import { Middleware } from "next-connect";
import is from "@sindresorhus/is";
import { Session } from "next-auth";

export interface RequestWithSession extends NextApiRequest {
  user: {
    name: string;
    email: string;
  };
}

export interface Request extends NextApiRequest {
  user?: {
    name: string;
    email: string;
  };
}

const getValidSession = (session: Session | null) => {
  if (
    is.nonEmptyObject(session) &&
    is.nonEmptyObject(session.user) &&
    is.nonEmptyString(session.user.name) &&
    is.nonEmptyString(session.user.email) &&
    is.nonEmptyString(session.user.image)
  ) {
    return {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }
  return null;
};

export const sessionGuard = async <P>(
  context: GetServerSidePropsContext,
  handler: (
    context: GetServerSidePropsContext,
    session: {
      name: string;
      email: string;
      image: string;
    }
  ) => Promise<GetServerSidePropsResult<P>>
): Promise<GetServerSidePropsResult<P>> => {
  const session = getValidSession(await getSession(context));
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  } else {
    return handler(context, session);
  }
};

export const sessionMiddleWare: () => Middleware<Request, NextApiResponse> =
  () => async (req, res, next) => {
    try {
      const session = await getSession({ req });
      if (!session) {
        res.status(401).send("Unauthorized");
      } else {
        const user = getValidSession(session);
        if (user) {
          req.user = user;
        } else {
          res.status(404).send("user info is missing");
        }
        next();
      }
    } catch {
      res.status(500).send("Internal Error");
    }
  };
