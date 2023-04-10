import React from 'react'

interface Props {
  pageTitle?: React.ReactNode
  children?: React.ReactNode
}

export const DashBoardContainer = ({ pageTitle = null, children }: Props) => {
  return (
    <section className={'container p-20'}>
      <div className="flex items-center justify-between">{pageTitle}</div>
      {children}
    </section>
  )
}

export const DashboardLoading = () => {
  return (
    <section className={'container animate-pulse p-20 '}>
      <div className="space-y-4">
        <div className="h-9 w-1/3 bg-slate-100"></div>
        <div className="h-4 w-1/2 bg-slate-100"></div>
      </div>
    </section>
  )
}
