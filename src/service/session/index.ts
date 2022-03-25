import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { Middleware } from "next-connect";
import { Session } from "next-auth";
import { serverSession } from "../../lib/next-auth";
import prisma from "../../lib/prisma";
import { User } from "@prisma/client";

export interface UserRequest extends NextApiRequest {
  user: {
    id: string;
    name: string | null
    
  };
}

export const getServerSideSession = async <P>(
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
    return [null, {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }];
  } else {
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
  }
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
      } else {
        res.status(404).send("user info is missing");
      }
      next();
    }
  } catch {
    res.status(500).send("Internal Error");
  }
};
