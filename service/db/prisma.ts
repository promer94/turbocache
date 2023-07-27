import { PrismaClient } from '@prisma/client'
import { serverEnv } from '~/env/server-env'
// @ts-ignore
const prisma =
  // @ts-ignore
  global.prisma || new PrismaClient()
// @ts-ignore
if (serverEnv.NODE_ENV === 'development') global.prisma = prisma
export default prisma as PrismaClient
