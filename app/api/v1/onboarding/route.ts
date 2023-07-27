import { getSession } from '~/service/auth/next-auth'
import { findProjectsByUser } from '~/service/project'
import { NextResponse } from 'next/server'

const GET = async () => {
  const session = await getSession()
  await findProjectsByUser({
    userId: session.user.id,
  })
  NextResponse.redirect(`/dashboard`)
}

export { GET }
