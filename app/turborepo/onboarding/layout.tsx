import { findTeamsByUser } from '~/service/team'


export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const teams = await findTeamsByUser()
  console.log('teams', teams)
  return children
}