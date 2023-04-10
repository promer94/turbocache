interface Props {
  children?: React.ReactNode
  title: string,
  description: string
}


export const DashboardPageHeader = ({ title, description }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-4">
        <div className="text-2xl font-semibold">{title}</div>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  )
}