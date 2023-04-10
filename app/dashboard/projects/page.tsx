import Link from 'next/link'
import React from 'react'
import { SearchProject } from '~/components/Search'
import { cn } from '~/lib/utils'
import { getSession } from '~/service/auth/next-auth'
import { findProjectsByUser } from '~/service/project'
import { View, UserCogIcon } from 'lucide-react'
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
    <section className="round-md mt-8 flex h-[100px] flex-col gap-8">
      <SearchProject></SearchProject>
      <div className='grid grid-cols-2 gap-4'>
        {result.projects.map((item) => (
          <Link
            key={item.project.id}
            href={`/dashboard/projects/${item.project.slug ?? item.project.id}`}
            className={cn(
              "flex justify-between gap-8",
              "rounded-md bg-cyan-50 shadow-sm hover:bg-cyan-100 hover:shadow-lg",
              "px-8 py-4"
            )
            }
          >
            <div className='flex flex-col gap-2'>
              <div
                className='line-clamp-1 text-lg font-bold'
              >
                {item.project.name}
              </div>
              <div className='line-clamp-2 text-gray-400' >{item.project.description ?? 'Your awesome Project'}</div>
            </div>
            <div className='flex flex-col gap-2'>
              {item.role === 'ADMIN' ? <UserCogIcon className='h-7 w-5'></UserCogIcon> : <View className='h-7 w-5'></View>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ProjectsPage
