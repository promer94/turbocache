import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '~/service/auth/next-auth'
import { findAuthUser, changeUserName } from '~/service/user'

const GET = async () => {
  const session = await getSession()
  if (session) {
    const result = await findAuthUser({
      userId: session.user.id,
    })
    return NextResponse.json(result)
  }
  return new Response('Unauthorized', { status: 401 })
}

const POST = async (req: NextRequest) => {
  const session = await getSession()

  if (session) {
    const body = await req.json()
    await changeUserName({
      ...body,
      userId: session.user.id,
    })
    return NextResponse.json({ success: true })
  }
  return new Response('Unauthorized', { status: 401 })
}

export {
  GET,
  POST
}