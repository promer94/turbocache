import { cn } from '~/lib/utils'

const ProjectsLoading = () => {
  return (
    <div className="grid animate-pulse gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 12 })
        .fill(1)
        .map((_, i) => (
          <div
            key={i.toString()}
            className={cn(
              'flex flex-col gap-8 bg-gray-100',
              'rounded-lg',
              'h-36 px-8 py-4'
            )}
          ></div>
        ))}
    </div>
  )
}

export default ProjectsLoading
