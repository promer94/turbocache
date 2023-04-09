import { SearchIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

const TeamsPage = () => {
  return (
    <section className="round-md mt-10 h-[100px]">
      <div
        className={cn(`
        flex w-[300px] items-center
        space-x-2 rounded-md
        border-[1px] 
        border-gray-200 px-3 py-2 
        focus-within:border-gray-900
        `)}
      >
        <SearchIcon className="h-5 w-5"></SearchIcon>
        <input
          className="flex-1 focus-visible:outline-none"
          type="text"
          placeholder="Search..."
        />
      </div>
    </section>
  )
}

export default TeamsPage
