import { NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "../../lib/prisma";
import { sessionMiddleWare, UserRequest } from "../../service/session";

const onBorad = async ({ id, name }: { id: string; name?: string | null }) => {
  const team = await prisma.team.findUnique({
    where: {
      id,
    },
  });
  if (!team) {
    return prisma.team.create({
      data: {
        id,
        name,
        users: {
          connect: {
            id,
          },
        },
      },
    });
  }
};

const handler = nc<UserRequest, NextApiResponse>()
  .use(sessionMiddleWare())
  .get(async (req, res) => {
    await onBorad({ ...req.user });
    res.redirect("/turborepo/onboarding");
  });

export default handler;
