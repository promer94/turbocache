interface Props {
  children?: React.ReactNode
  title: string
  description: string
}

const DashboardPageHeader = ({ title, description }: Props) => {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="text-gray-500">{description}</div>
    </div>
  )
}

export default DashboardPageHeader
