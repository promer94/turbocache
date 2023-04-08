import prisma from '~/service/db/prisma';
import { getSession } from '~/service/auth/next-auth'
import { NextApiRequest, NextApiResponse } from 'next';

export const findTeamsByUser = async (...args: [] | [NextApiRequest, NextApiResponse]) => {
  const session = await getSession(...args)
  if (session) {
    return prisma.permission.findMany({
      select: {
        team: true,
        role: true,
        userId: true
      },
      where: {
        userId: session.user.id
      }
    })
  }
  return null
}