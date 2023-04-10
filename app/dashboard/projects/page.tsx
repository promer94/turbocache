import Link from 'next/link'
import React from 'react'
import { SearchProject } from '~/components/Search'
import { cn } from '~/lib/utils'
import { getSession } from '~/service/auth/next-auth'
import { findProjectsByUser } from '~/service/project'
import { View, UserCogIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar"
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
    <>
      <div className="flex justify-between">
        <div className="flex flex-1 flex-col gap-4">
          <div className="text-2xl font-semibold">Dashboard</div>
          <Balancer className=" text-gray-500">Create and search your awesome projects here</Balancer>
        </div>
        <div className='flex flex-col items-end gap-4'>
          <Avatar>
            <AvatarImage className='h-8 w-8' src={session.user.image} alt={session.user.email} />
            <AvatarFallback className='h-8 w-8'>{session.user.name}</AvatarFallback>
          </Avatar>
          <div className='text-gray-600'>
            {session.user.email}
          </div>
        </div>
      </div>
      <section className="round-md flex flex-col gap-8">
        <SearchProject></SearchProject>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {result.projects.map((item) => (
            <Link
              key={item.project.id}
              href={`/dashboard/projects/${item.project.slug ?? item.project.id}`}
              className={cn(
                "flex justify-between gap-8",
                "rounded-lg border border-gray-200",
                "shadow-md shadow-green-50 hover:shadow-lg hover:shadow-green-100",
                "px-8 py-4"
              )
              }
            >
              <div className='flex flex-1 flex-col gap-2'>
                <Balancer
                  className='text-lg font-bold text-green-400'
                >
                  {item.project.name}
                </Balancer>
                <Balancer className='text-gray-600'>{item.project.description ?? 'Your awesome Project'}</Balancer>
              </div>
              <div className='flex flex-col gap-2'>
                {item.role === 'ADMIN' ? <UserCogIcon className='h-7 w-5'></UserCogIcon> : <View className='h-7 w-5'></View>}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default ProjectsPage
