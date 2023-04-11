'use client'
import { SearchIcon, CornerDownLeftIcon, Loader2 } from 'lucide-react'
import { cn } from '~/lib/utils'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { Input } from '~/components/ui/Input'
import { NewProjectDialog } from './NewProjectDialog'

export const SearchProjects = () => {
  const searchRef = React.useRef<HTMLInputElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams();
  const slug = searchParams?.get('slug')
  const [isPending, start] = React.useTransition()
  React.useLayoutEffect(() => {
    if (searchRef.current && slug) {
      searchRef.current.value = slug
      searchRef.current.focus()
    }
  }, [slug])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchRef.current?.value) {
      const search = new URLSearchParams(searchParams?.toString())
      search.set('slug', searchRef.current?.value)
      search.delete('page')
      start(() => {
        router.replace(`/dashboard/projects?${search.toString()}`)
      })
    } else {
      start(() => {
        router.replace(`/dashboard/projects`)
      })
    }
  }
  return (
    <form
      className="flex gap-8"
      onSubmit={handleSubmit}
    >
      <Input
        prefixItem={<SearchIcon className={cn('h-5 w-5')} />}
        suffixItem={isPending ? <Loader2 className={cn('h-3 w-3 animate-spin')} /> : <CornerDownLeftIcon className={cn('h-3 w-3')} />}
        ref={searchRef}
        placeholder="Search..."
      />
      <button className='hidden' type="submit">search</button>
      <NewProjectDialog></NewProjectDialog>
    </form>
  )
}