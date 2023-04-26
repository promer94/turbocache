import React from 'react'
import { getSession } from '~/service/auth/next-auth'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/radix-avatar'
import Balancer from 'react-wrap-balancer'
interface Props {
  children: React.ReactNode
}
const ProjectLayout = async ({ children }: Props) => {
  const session = await getSession()
  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-1 flex-col gap-4">
          <div className="text-2xl font-semibold">Projects</div>
          <Balancer className="text-gray-500">
            Create and search your awesome projects here
          </Balancer>
        </div>
        <div className="flex flex-col items-end gap-4">
          <Avatar>
            <AvatarImage
              className="h-8 w-8"
              src={session.user.image}
              alt={session.user.email}
            />
            <AvatarFallback className="h-8 w-8">
              {session.user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="text-gray-600">{session.user.email}</div>
        </div>
      </div>
      {children}
    </>
  )
}

export default ProjectLayout
