import prisma from '~/service/db/prisma';

export const findTeamsByUser = async (userId: string) => {
  return prisma.permission.findMany({
    select: {
      team: true,
      role: true,
      userId: true
    },
    where: {
      userId
    }
  })
}