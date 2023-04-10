import { cn } from '~/lib/utils'
import { getSession } from '~/service/auth/next-auth'
import { findTeamBySlugOrId } from '~/service/team'
import { notFound } from 'next/navigation'
interface Params {
  params: {
    slug: string
  }
}
const TeamSlugPage = async ({ params }: Params) => {
  const session = await getSession()
  const teams = await findTeamBySlugOrId({
    userId: session.user.id,
    slug: params.slug,
    teamId: params.slug,
  })
  if (!teams) {
    notFound()
  }
  return <h2 className="text-2xl font-semibold">{teams.team.slug} {teams.team.name}</h2>
}

export default TeamSlugPage
