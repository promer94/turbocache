import { cn } from '~/lib/utils'

interface Params {
  params: {
    slug: string
  }
}
const TeamSlugPage = ({ params }: Params) => {
  return <h2 className="text-2xl font-semibold">{params.slug}</h2>
}

export default TeamSlugPage
