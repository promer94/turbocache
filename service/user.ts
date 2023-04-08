import prisma from '~/service/db/prisma';


const findAuthUser = async (userId: string) => prisma.user.findUnique({
  where: {
    id: userId,
  },
})

export {
  findAuthUser,
}