import { getSession } from '~/service/auth/next-auth'
import { editProject, findProjectBySlugOrId } from '~/service/project'
import { NextRequest, NextResponse } from 'next/server'

const GET = async (
  _: NextRequest,
  {
    params,
  }: {
    params: { projectId: string }
  }
) => {
  const session = await getSession()
  const data = await findProjectBySlugOrId({
    userId: session.user.id,
    query: params.projectId,
  })
  if (!data) {
    return new Response('Not found', { status: 404 })
  }
  return NextResponse.json({
    project: {
      ...data?.project,
      role: data?.role,
    },
  })
}

const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { projectId: string }
  }
) => {
  const session = await getSession()
  const project = await findProjectBySlugOrId({
    userId: session.user.id,
    query: params.projectId,
  })
  const body = await req.json()
  if (project?.role !== 'ADMIN') {
    return new Response('Unauthorized', { status: 401 })
  }
  await editProject({
    ...body,
    projectId: params.projectId,
  })
  return NextResponse.json({ success: true })
}

export { GET, POST }
