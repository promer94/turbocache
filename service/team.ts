import prisma from '~/service/db/prisma'
import * as z from 'zod'

const createValidator = z.object({
  name: z.string(),
  slug: z.string().refine((v) => !v.includes('/'), {
    message: 'Slug cannot contain "/"',
  }),
  userId: z.string(),
  role: z.enum(['ADMIN', 'USER']),
})

const queryValidator = z.object({
  userId: z.string(),
  teamId: z.string(),
})

const editValidator = z.object({
  name: z.optional(z.string()),
  slug: z.optional(
    z.string().refine((v) => !v.includes('/'), {
      message: 'Slug cannot contain "/"',
    })
  ),
  storage: z.optional(z.any()),
  userId: z.string(),
  teamId: z.string(),
})

export const findTeamsByUser = (query: {userId: string, slug?: string}) => {
  const { userId, slug } = z.object({
    userId: z.string(),
    slug: z.optional(z.string()),
  }).parse(query)
  return prisma.permission.findMany({
    select: {
      team: true,
      role: true,
      userId: true,
    },
    where: {
      userId,
      team: {
        slug
      }
    },
  })
}

export const findTeamByUser = (params: {
  userId?: string
  teamId?: string
}) => {
  const result = queryValidator.parse(params)
  return prisma.permission.findFirstOrThrow({
    include: {
      team: true,
    },
    where: {
      ...result,
    },
  })
}

export const createTeam = async (params: {
  name?: string
  slug?: string
  userId: string
  role?: 'ADMIN' | 'USER'
}) => {
  const { name, slug, userId, role } = createValidator.parse(params)
  return prisma.$transaction(async (tx) => {
    const team = await tx.team.create({
      data: {
        name,
        slug,
      },
    })
    return tx.permission.create({
      data: {
        role,
        userId,
        teamId: team.id,
      },
    })
  })
}

export const editTeam = async (params: {
  name?: string
  slug?: string
  storage?: any
  teamId: string
}) => {
  const { name, slug, storage, teamId } = editValidator.parse(params)
  return prisma.$transaction(async (tx) => {
    await tx.team.update({
      data: {
        name,
        slug,
        storage,
      },
      where: {
        id: teamId,
      },
    })
  })
}
