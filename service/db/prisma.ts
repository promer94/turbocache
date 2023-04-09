import { PrismaClient } from '@prisma/client'

// @ts-ignore
const prisma =
  // @ts-ignore
  global.prisma ||
  new PrismaClient({
    log: ['error'],
  })
// @ts-ignore
if (process.env.NODE_ENV === 'development') global.prisma = prisma
export default prisma as PrismaClient
