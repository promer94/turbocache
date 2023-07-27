import { getSession } from '~/service/auth/next-auth'
import { NextRequest, NextResponse,  } from 'next/server'

const GET = async (request: NextRequest, ctx: any) => {
  return NextResponse.redirect(new URL('/dashboard', request.url))
}

export { GET }
