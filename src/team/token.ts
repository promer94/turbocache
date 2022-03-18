import prisma from "../lib/prisma";
import crypto from "crypto";
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
