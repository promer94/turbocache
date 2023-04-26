import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '~/service/auth/next-auth'
import { findProjectsByUser, createProject } from '~/service/project'

const GET = async () => {
  const session = await getSession()
  if (session) {
    const result = await findProjectsByUser({
      userId: session.user.id,
    })
    return NextResponse.json(result)
  }
  return NextResponse.json({ projects: [], total: 0 })
}

const POST = async (req: NextRequest) => {
  const session = await getSession()
  const body = await req.json()
  if (session) {
    await createProject({
      ...body,
      userId: session.user.id,
      role: 'ADMIN',
    })
  }
  return NextResponse.json({ success: true })
}

export { GET, POST }
