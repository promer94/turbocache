import prisma from "../lib/prisma";

export const getUser = async (email: string) => {
  const userId = await prisma.user.findUnique({
    select: { id: true },
    where: {
      email,
    },
  });
  return userId
};
