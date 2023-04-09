'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export const TeamTitle = () => {
  const segment = useSelectedLayoutSegment()
  if (segment) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Team {segment}</h1>
        <p className="text-gray-500">Tokens and members</p>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Teams</h1>
      <p className="text-gray-500">Create and search your teams</p>
    </div>
  )
}
