import Link from 'next/link'
import { cn } from '~/lib/utils'
import { DashboardNav } from '~/app/dashboard/DashboardNav'
import { AuthProvider } from '~/components/AuthProvider'
import { getSession } from '~/service/auth/next-auth'

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
          <Link href="/dashboard" className={cn('text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2')}>
            Turbocache
          </Link>
        </header>
        <div>
          <DashboardNav></DashboardNav>
        </div>
      </section>
      <section className={'ml-[240px] flex flex-col gap-12 px-12 py-10'}>
        <AuthProvider session={session as any}>{children}</AuthProvider>
      </section>
    </main>
  )
}
