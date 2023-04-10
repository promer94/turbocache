import prisma from '~/service/db/prisma'
import * as z from 'zod'

const createValidator = z.object({
  name: z.string(),
  slug: z.optional(z.string().refine((v) => !v.includes('/'), {
    message: 'Slug cannot contain "/"',
  })),
  userId: z.string(),
  role: z.enum(['ADMIN', 'USER']),
  description: z.optional(z.string()),
})

const queryValidator = z.object({
  userId: z.string(),
  projectId: z.string().optional(),
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
  projectId: z.string(),
})

export const findProjectsByUser = (query: { userId: string, slug?: string, page?: string, size?: string }) => {
  const { userId, page, size, slug } = z.object({
    userId: z.string(),
    slug: z.optional(z.string()),
    page: z.optional(z.string()).transform((v) => parseInt(v ? v : '1', 10)),
    size: z.optional(z.string()).transform((v) => parseInt(v ? v : '2', 10)),
  }).parse(query)
  return prisma.$transaction(async (tx) => {
    const userProjects = await tx.permission.findMany({
      select: {
        projectId: true,
        role: true,
      },
      where: {
        userId,
      }
    })
    const validId = userProjects.map((v) => v.projectId)
    const permissionMap = new Map<string, 'ADMIN' | 'USER'>(userProjects.map((v) => [v.projectId, v.role]))
    const total = await tx.project.count({
      where: {
        id: {
          in: validId,
        },
        slug: {
          contains: slug,
        }
      }
    })
    const projects = await tx.project.findMany({
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
      projects: projects.map((v) => ({
        project: v,
        role: permissionMap.get(v.id),
      }))
    }
  })
}

export const findProjectBySlugOrId = (params: {
  userId?: string
  projectId?: string
  slug?: string
}) => {
  const result = queryValidator.parse(params)
  return prisma.permission.findFirst({
    include: {
      project: true,
    },
    where: {
      userId: result.userId,
      OR: [{
        projectId: result.projectId,
      }, {
        project: {
          slug: result.slug,
        }
      }]
    },
  })
}

export const createProject = async (params: {
  name?: string
  slug?: string
  userId: string
  role?: 'ADMIN' | 'USER'
  description?: string
}) => {
  const { name, slug, userId, role, description } = createValidator.parse(params)
  return prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        name,
        slug,
        description
      },
    })
    return tx.permission.create({
      data: {
        role,
        userId,
        projectId: project.id,
      },
    })
  })
}

export const editProject = async (params: {
  name?: string
  slug?: string
  storage?: any
  projectId: string
}) => {
  const { name, slug, storage, projectId } = editValidator.parse(params)
  return prisma.$transaction(async (tx) => {
    await tx.project.update({
      data: {
        name,
        slug,
        storage,
      },
      where: {
        id: projectId,
      },
    })
  })
}
