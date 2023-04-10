'use client'
import React from 'react'
import {  usePathname } from 'next/navigation'
interface Props {
  children?: React.ReactNode
  session: {
    user: {
      name: string
    }
  }
}

const config = (session: Props['session'], pathname: string | null) => {
  if (!pathname) return null
  if (pathname === '/dashboard') {
    return {
      title: 'Dashboard',
      description: 'Welcome, ' + session.user.name,
    }
  } else if (pathname === '/dashboard/projects') {
    return {
      title: 'Projects',
      description: 'Search, create and manage your awesome projects',
    }
  } else if (pathname === '/dashboard/settings') {
    return {
      title: 'Settings',
      description: 'Manage your account settings and preferences',
    }
  } else if (pathname.startsWith('/dashboard/projects')) {
    return {
      title: 'Project',
      description: 'Manage your tokens, members and storage here',
    }
  } else {
    return null
  }
}

export const DashBoardContainer = ({ children, session }: Props) => {
  const pathname = usePathname()
  const data = config(session, pathname)
  if (data === null) return <DashboardLoading>{children}</DashboardLoading>
  return (
    <section className={'container p-20'}>
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <div className="text-2xl font-semibold">{data.title}</div>
          <p className="text-gray-500">{data.description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

export const DashboardLoading = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={'container animate-pulse p-20 '}>
      <div className="space-y-4">
        <div className="h-9 w-1/3 bg-slate-100"></div>
        <div className="h-4 w-1/2 bg-slate-100"></div>
      </div>
      {children}
    </section>
  )
}
