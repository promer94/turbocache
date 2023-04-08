import { getSession } from '~/service/auth/next-auth'
import { AuthProvider } from './AuthProvider'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  return <AuthProvider session={session}>{children}</AuthProvider>
}