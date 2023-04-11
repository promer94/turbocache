export const DashboardLoading = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={'flex flex-col gap-12 px-12 py-10'}>
      <div className="space-y-4">
        <div className="h-9 w-1/3 bg-slate-100"></div>
        <div className="h-4 w-1/2 bg-slate-100"></div>
      </div>
      {children}
    </section>
  )
}
