import is from '@sindresorhus/is'
import { getSession } from '~/service/auth/next-auth'
import { createProject, findProjectsByUser } from '~/service/project'
import { NextResponse } from 'next/server'

const GET = async () => {
  const session = await getSession()
  const result = await findProjectsByUser({
    userId: session.user.id,
  })
  if (is.emptyArray(result.projects)) {
    await createProject({
      name: `${session.user.name}'s Personal Project`,
      userId: session.user.id,
      role: 'ADMIN',
      description: 'Your awesome project !',
    })
  }
  NextResponse.redirect(`/dashboard`)
}

export {
  GET
}