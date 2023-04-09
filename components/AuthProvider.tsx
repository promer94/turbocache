'use client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

const AuthProvider = ({
  session,
  children,
}: {
  session: Session | null
  children?: React.ReactNode
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export { AuthProvider }
