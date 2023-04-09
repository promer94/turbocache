'use client'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Settings, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '~/lib/utils'

const linkClassName = `
  flex items-center 
  px-4 py-2 
  text-sm font-semibold text-black-300
  hover:bg-slate-200 hover:text-black-500
  rounded-md
  space-x-2
`
const iconSize = 'h-4 w-4'
export const DashboardNav = () => {
  const segment = useSelectedLayoutSegment()
  return (
    <nav className={cn('flex flex-col gap-2')}>
      <Link
        href="/dashboard/teams"
        className={cn(linkClassName, {
          'bg-slate-200 text-black-500': segment === 'teams',
        })}
      >
        <UsersIcon className={iconSize}></UsersIcon>
        <div>Teams</div>
      </Link>
      <Link
        href="/dashboard/settings"
        className={cn(linkClassName, {
          'bg-slate-200 text-black-500': segment === 'settings',
        })}
      >
        <Settings className={iconSize}></Settings>
        <div>Settings</div>
      </Link>
    </nav>
  )
}