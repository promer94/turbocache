import Link from 'next/link'
import { cn } from '~/lib/utils'
import { getSession } from '~/service/auth/next-auth'
import { DashboardNav } from '~/components/DashboardNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  return (
    <main className={'px-6 py-2'}>
      <section className={cn('sticky top-0 h-0 w-[240px] flex-col')}>
        <header className={cn('flex items-center justify-between px-2 py-4')}>
          <Link href="/dashboard" className={cn('text-lg font-semibold')}>
            Turbocache
          </Link>
        </header>
        <div>
          <DashboardNav></DashboardNav>
        </div>
      </section>
      <section className={'ml-[240px] flex flex-col gap-12 px-12 py-10'}>
        {children}
      </section>
    </main>
  )
}
