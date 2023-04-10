'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export const TeamTitle = ({ slug }: { slug?: string }) => {
  const segment = useSelectedLayoutSegment()
  if (segment) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">{slug ? slug : segment}</h1>
        <p className="text-gray-500">Manage tokens, members and storage</p>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Teams</h1>
      <p className="text-gray-500">Create and search your teams</p>
    </div>
  )
}
