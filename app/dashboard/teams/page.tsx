import React from 'react'
import { SearchTeam } from '~/components/Search'
import { getSession } from '~/service/auth/next-auth'
import { findTeamsByUser } from '~/service/team'
interface Props {
  searchParams: {
    slug?: string
  }
}
const TeamsPage = async ({
  searchParams,
}: Props) => {
  const session = await getSession()
  const teams = await findTeamsByUser({
    userId: session.user.id,
    slug: searchParams.slug,
  })
  return (
    <section className="round-md mt-10 h-[100px]">
      <SearchTeam></SearchTeam>
      <ul>
        {teams.map((item) => (
          <li key={item.team.id}>{item.team.name} {item.team.slug} {item.role}</li>
        ))}
      </ul>
    </section>
  )
}

export default TeamsPage
