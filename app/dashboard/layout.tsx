import Link from 'next/link'
import { cn } from '~/lib/utils'
import { getSession } from '~/service/auth/next-auth'
import { SearchIcon } from 'lucide-react'
import { DashboardNav } from '~/components/DashboardNav'
import { DashBoardContainer } from '~/components/DashboardContainer'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  return (
    <main className={cn('flex min-h-screen')}>
      <section className={cn('flex w-[260px] flex-col bg-slate-50 px-4')}>
        <header className={cn('flex items-center justify-between px-2 py-4')}>
          <Link href="/dashboard" className={cn('text-lg font-semibold')}>
            Turbocache
          </Link>
          <SearchIcon className={cn('h-4 w-4')}></SearchIcon>
        </header>
        <div>
          <DashboardNav></DashboardNav>
        </div>
      </section>
      <DashBoardContainer session={session}>
        {children}
      </DashBoardContainer>
    </main>
  )
}
