import prisma from "../lib/prisma";

export const userData = async (email: string) => {
  const userInfo = await prisma.user.findUnique({
    select: { email: true, name: true },
    where: {
      email,
    },
  });
  return userInfo;
};
