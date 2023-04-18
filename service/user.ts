import prisma from '~/service/db/prisma'

const findAuthUser = async ({
  userId
}: {
  userId: string
}) =>
  prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  })

const changeUserName = async ({
  userId,
  name
}: {
  userId: string
  name: string
}) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  })
  return user
}

export { findAuthUser, changeUserName }

