import { cn } from '~/lib/utils'
import { getSession } from '~/service/auth/next-auth'
import { findProjectBySlugOrId } from '~/service/project'
import { notFound } from 'next/navigation'
interface Params {
  params: {
    slug: string
  }
}
const ProjectSlugPage = async ({ params }: Params) => {
  const session = await getSession()
  const result = await findProjectBySlugOrId({
    userId: session.user.id,
    slug: params.slug,
    projectId: params.slug,
  })
  if (!result) {
    notFound()
  }
  return <h2 className="text-2xl font-semibold">{result.project.slug} {result.project.name}</h2>
}

export default ProjectSlugPage
