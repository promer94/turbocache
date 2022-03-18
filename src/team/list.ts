import prisma from "../lib/prisma";

export const teamList = (email: string) =>
  prisma.team.findMany({
    where: {
      users: {
        every: {
          email: {
            equals: email,
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
    take: 100,
  });
