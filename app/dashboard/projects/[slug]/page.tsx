import { getSession } from '~/service/auth/next-auth'
import { findProjectBySlugOrId } from '~/service/project'
import { notFound } from 'next/navigation'
import { DashboardPageHeader } from '~/components/DashboardPageHeader'
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
  return (
    <>
      <DashboardPageHeader title={result.project.name ?? 'Awesome Project'} description={result.project.description ?? session.user.email} >
      </DashboardPageHeader>
      <div>token</div>
      <div>member</div>
      <div>storage</div>
    </>
  )
}

export default ProjectSlugPage
