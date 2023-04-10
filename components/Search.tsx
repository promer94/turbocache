'use client'
import { SearchIcon, CornerDownLeftIcon, Loader2, PlusIcon } from 'lucide-react'
import { cn } from '~/lib/utils'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

interface Props {
  className?: string
  iconClass?: string
  inputClass?: string
  isLoading?: boolean
}
export const Search = React.forwardRef<HTMLInputElement, Props>(({
  className,
  iconClass,
  inputClass,
  isLoading
}: Props, ref) => {
  return (
    <div
      className={cn(
        'flex h-10 w-full items-center gap-2',
        'rounded-md border border-green-300',
        'bg-transparent',
        'px-3 py-2',
        'text-sm placeholder:text-slate-400',
        'focus-within:outline-none focus-within:ring-2',
        'focus-within:ring-green-300',
        'focus-within:ring-offset-2',
        'dark:border-slate-700 dark:text-slate-50',
        'dark:focus-within:ring-green-300 dark:focus-within:ring-offset-green-900',
        className
      )}
    >
      <SearchIcon className={cn('h-5 w-5', iconClass)} />
      <input
        ref={ref}
        name='slug'
        className={cn('flex-1 focus-visible:outline-none', inputClass)}
        type="text"
        placeholder="Search..."
      />
      {isLoading ? <Loader2 className={cn('h-3 w-3 animate-spin', iconClass)}></Loader2>
        : <CornerDownLeftIcon className={cn('h-3 w-3', iconClass)}></CornerDownLeftIcon>}

    </div>
  )
})


export const SearchProject = () => {
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
      <Search isLoading={isPending} ref={searchRef} />
      <button className='hidden' type="submit">search</button>
      <button className={cn(
        'flex w-[80px] items-center justify-center gap-1',
        'rounded-md bg-green-200 text-green-500 hover:text-green-600',
        'px-3 py-2',
        'focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-5',
      )} 
        type="button"
      >
        <PlusIcon className='h-4 w-4'></PlusIcon>
        <div className='text-sm font-bold'>New</div>
      </button>
    </form>
  )
}

Search.displayName = 'Search'