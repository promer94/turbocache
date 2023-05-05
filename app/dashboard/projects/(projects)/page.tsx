import Link from 'next/link'
import { cn } from '~/lib/utils'
import { getSession } from '~/service/auth/next-auth'
import { findProjectsByUser } from '~/service/project'
import { View, UserCogIcon } from 'lucide-react'
import Balancer from 'react-wrap-balancer'
import Pagenation from './project-pagenation'

interface Props {
  searchParams: {
    slug?: string
    page?: string
    size?: string
  }
}
const ProjectsPage = async ({ searchParams }: Props) => {
  const session = await getSession()
  const size = parseInt(searchParams.size ?? '12', 10)
  const result = await findProjectsByUser({
    userId: session.user.id,
    slug: searchParams.slug,
    page: searchParams.page,
    size: size.toString(10),
  })
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {result.projects.map((item) => (
          <Link
            key={item.project.id}
            href={`/dashboard/projects/${item.project.slug ?? item.project.id}`}
            className={cn(
              'flex flex-col gap-8',
              'rounded-lg border border-gray-200',
              'shadow-md shadow-green-50 hover:shadow-lg hover:shadow-green-100',
              'px-8 py-4',
              'focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2'
            )}
          >
            <div className="flex justify-between gap-2">
              <Balancer className="flex-1 text-lg font-bold text-green-400">
                {item.project.name}
              </Balancer>
              {item.role === 'ADMIN' ? (
                <UserCogIcon className="h-7 w-5"></UserCogIcon>
              ) : (
                <View className="h-7 w-5"></View>
              )}
            </div>
            <Balancer className="text-gray-600">
              {item.project.description ?? 'Your awesome Project'}
            </Balancer>
          </Link>
        ))}
      </div>
      <Pagenation
        total={result.total}
        pageSize={size}
        pageParamName="page"
        sizeParamName="size"
      />
    </>
  )
}

export default ProjectsPage
