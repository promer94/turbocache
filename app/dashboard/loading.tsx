import { cn } from '~/lib/utils'

const DashboardLoading = () => {
  return (
    <section className={cn('container animate-pulse px-10 py-5')}>
      <div className="h-8 bg-slate-100"></div>
    </section>
  )
}


export default DashboardLoading