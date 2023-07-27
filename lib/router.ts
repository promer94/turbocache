import type { NextRequest } from "next/server";
import { createEdgeRouter } from "next-connect";
import { getSession } from '~/service/auth/next-auth';
import { consola, createConsola } from "consola";
interface RequestContext {
  session: Awaited<ReturnType<typeof getSession>>
}
const router = () => 
  createEdgeRouter<NextRequest, RequestContext>()
  .use((_, __, next) => {
    next()
  })
  .use(async (_, ctx, next) => {
    const session = await getSession()
    ctx.session = session
    next()
  })