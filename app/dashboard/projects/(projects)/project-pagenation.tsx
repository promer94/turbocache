'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { cn } from '~/lib/utils'
interface Props {
  total: number
  pageParamName: string
  sizeParamName: string
  pageSize: number
}

const Pagenation = ({
  total,
  pageParamName,
  sizeParamName,
  pageSize,
}: Props) => {
  const searchParam = useSearchParams()
  const pageNum = (() => {
    const num = searchParam?.get(pageParamName)
    if (num) {
      return parseInt(num)
    }
    return 1
  })()
  const sizeNum = (() => {
    const size = searchParam?.get(sizeParamName)
    if (size) {
      return parseInt(size)
    }
    return pageSize
  })()
  const totalPage = Math.ceil(total / sizeNum)
  const disablePrev = pageNum <= 1
  const disableNext = pageNum >= totalPage
  const nextPageParam = new URLSearchParams({
    [pageParamName]: (pageNum + 1).toString(),
    [sizeParamName]: sizeNum.toString(),
  }).toString()
  const prevPageParam = new URLSearchParams({
    [pageParamName]: (pageNum - 1).toString(),
    [sizeParamName]: sizeNum.toString(),
  }).toString()
  if (total === 0) return null
  return (
    <div className="inline-flex items-center justify-center gap-3">
      <Link
        href={`/dashboard/projects?${prevPageParam}`}
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center rounded-md bg-green-100 text-green-600 hover:text-green-800',
          {
            'pointer-events-none bg-slate-50 text-slate-200': disablePrev,
          }
        )}
      >
        <span className="sr-only">Next Page</span>
        <ChevronLeft></ChevronLeft>
      </Link>
      <p className="text-l">
        {pageNum}
        <span className="mx-2">/</span>
        {totalPage}
      </p>
      <Link
        href={`/dashboard/projects?${nextPageParam}`}
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 hover:text-green-800',
          { 'pointer-events-none bg-slate-50 text-slate-200': disableNext }
        )}
      >
        <span className="sr-only">Next Page</span>
        <ChevronRight></ChevronRight>
      </Link>
    </div>
  )
}

export default Pagenation
