import { getSession } from '~/service/auth/next-auth'
import { findTeamsByUser } from '~/service/team'


export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}