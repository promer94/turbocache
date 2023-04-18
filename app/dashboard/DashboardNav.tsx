'use client'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Settings, BriefcaseIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '~/lib/utils'

const linkClassName = `
  flex items-center 
  px-4 py-2 
  text-sm font-semibold
  hover:bg-green-400 hover:text-white
  rounded-md
  space-x-2
  focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2
`
const iconSize = 'h-4 w-4'
export const DashboardNav = () => {
  const segment = useSelectedLayoutSegment()
  return (
    <nav className={cn('flex flex-col gap-2')}>
      <Link
        href="/dashboard/projects"
        className={cn(linkClassName, {
          'bg-green-400 text-gray-50': segment === 'projects',
        })}
      >
        <BriefcaseIcon className={iconSize}></BriefcaseIcon>
        <div>Projects</div>
      </Link>
      <Link
        href="/dashboard/settings"
        className={cn(linkClassName, {
          'bg-green-400 text-gray-50': segment === 'settings',
        })}
      >
        <Settings className={iconSize}></Settings>
        <div>Settings</div>
      </Link>
    </nav>
  )
}
