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
  teamId: z.string().optional(),
  slug: z.string().optional(),
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

export const findTeamsByUser = (query: { userId: string, slug?: string, page?: string, size?: string }) => {
  const { userId, page, size, slug } = z.object({
    userId: z.string(),
    slug: z.optional(z.string()),
    page: z.optional(z.string()).transform((v) => parseInt(v ? v : '1', 10)),
    size: z.optional(z.string()).transform((v) => parseInt(v ? v : '2', 10)),
  }).parse(query)
  return prisma.$transaction(async (tx) => {
    const userTeams = await tx.permission.findMany({
      select: {
        teamId: true,
        role: true,
      },
      where: {
        userId,
      }
    })
    const validId = userTeams.map((v) => v.teamId)
    const permissionMap = new Map<string, 'ADMIN' | 'USER'>(userTeams.map((v) => [v.teamId, v.role]))
    const total = await tx.team.count({
      where: {
        id: {
          in: validId,
        },
        slug: {
          contains: slug,
        }
      }
    })
    const teams = await tx.team.findMany({
      skip: (page - 1) * size,
      take: size,
      where: {
        id: {
          in: validId,
        },
        slug: {
          contains: slug,
        }
      }
    })
    return {
      total,
      teams: teams.map((v) => ({
        team: v,
        role: permissionMap.get(v.id),
      }))
    }
  })
}

export const findTeamBySlugOrId = (params: {
  userId?: string
  teamId?: string
  slug?: string
}) => {
  const result = queryValidator.parse(params)
  return prisma.permission.findFirst({
    include: {
      team: true,
    },
    where: {
      userId: result.userId,
      OR: [{
        teamId: result.teamId,
      }, {
        team: {
          slug: result.slug,
        }
      }]
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
