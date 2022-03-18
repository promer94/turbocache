import prisma from "../lib/prisma"

interface Team {
  name: string
  userId: string
}

export const createTeam = ({ name, userId }: Team) =>
  prisma.team.create({
    data: {
      name,
      users: {
        connect: {
          id: userId,
        },
      },
    },
  })
