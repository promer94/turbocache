import prisma from '~/service/db/prisma';
import { getSession } from '~/service/auth/next-auth'

/**
 * Find auth user through jwt session
 */
const findAuthUser = async () => {
  const session = await getSession()
  if (session) {
    return prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    })
  }
  return null
}

export {
  findAuthUser,
}