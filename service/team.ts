import prisma from '~/service/db/prisma';
import { getSession } from '~/service/auth/next-auth'
import { NextApiRequest, NextApiResponse } from 'next';

export const findTeamsByUser = async (...args: [] | [NextApiRequest, NextApiResponse]) => {
  const session = await getSession(...args)
  if (session) {
    return prisma.team.findMany({
      include: {
        permissions: {
          where: {
            userId: session.user.id
          }
        }
      }
    })
  }
  return null
}