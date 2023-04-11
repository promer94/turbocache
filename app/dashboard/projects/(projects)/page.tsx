import Link from 'next/link'
import React from 'react'
import { SearchProjects } from '~/app/dashboard/projects/(projects)/SearchProjects'
import { cn } from '~/lib/utils'
import { getSession } from '~/service/auth/next-auth'
import { findProjectsByUser } from '~/service/project'
import { View, UserCogIcon } from 'lucide-react'
import Balancer from 'react-wrap-balancer'

interface Props {
  searchParams: {
    slug?: string
    page?: string
    size?: string
  }
}
const ProjectsPage = async ({
  searchParams,
}: Props) => {
  const session = await getSession()
  const result = await findProjectsByUser({
    userId: session.user.id,
    slug: searchParams.slug,
    page: searchParams.page,
    size: searchParams.size,
  })
  return (
    <section className="round-md flex flex-col gap-8">
      <SearchProjects></SearchProjects>
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {result.projects.map((item) => (
          <Link
            key={item.project.id}
            href={`/dashboard/projects/${item.project.slug ?? item.project.id}`}
            className={cn(
              "flex flex-col gap-8",
              "rounded-lg border border-gray-200",
              "shadow-md shadow-green-50 hover:shadow-lg hover:shadow-green-100",
              "px-8 py-4"
            )
            }
          >
            <div className='flex justify-between gap-2'>
              <Balancer
                className='flex-1 text-lg font-bold text-green-400'
              >
                {item.project.name}
              </Balancer>
              {item.role === 'ADMIN' ? <UserCogIcon className='h-7 w-5'></UserCogIcon> : <View className='h-7 w-5'></View>}
            </div>
            <Balancer className='text-gray-600'>{item.project.description ?? 'Your awesome Project'}</Balancer>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ProjectsPage
