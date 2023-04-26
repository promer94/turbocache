import { getSession } from '~/service/auth/next-auth'
import { findProjectBySlugOrId } from '~/service/project'
import { notFound } from 'next/navigation'
import DashboardPageHeader from '~/components/dashboard-page-header'
interface Props {
  params: {
    slug: string
  }
  children?: React.ReactNode
}
const ProjectSlugLayout = async ({ params, children }: Props) => {
  const session = await getSession()
  const result = await findProjectBySlugOrId({
    userId: session.user.id,
    query: params.slug,
  })
  if (!result) {
    notFound()
  }
  return (
    <>
      <DashboardPageHeader
        title={result.project.name ?? 'Awesome Project'}
        description={result.project.description ?? session.user.email}
      ></DashboardPageHeader>
      {children}
    </>
  )
}

export default ProjectSlugLayout
