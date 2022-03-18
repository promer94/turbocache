import prisma from "../lib/prisma";

interface Team {
  teamId: string;
  email: string;
}

export const findTeam = ({ teamId, email }: Team) =>
  prisma.team.findUnique({
    where: {
      id: teamId,
    },
    include: {
      users: {
        where: {
          email,
        },
      },
    },
  });
