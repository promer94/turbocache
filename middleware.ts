import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware() {
    NextResponse.next()
  }
)

export const config = { matcher: ["/turborepo/:path*"] }