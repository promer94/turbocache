import Balancer from 'react-wrap-balancer'
interface Props {
  children?: React.ReactNode
  title: string
  description: string
}

export const DashboardPageHeader = ({ title, description }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col space-y-4">
        <Balancer className="text-2xl font-semibold">{title}</Balancer>
        <Balancer className="text-gray-500">{description}</Balancer>
      </div>
    </div>
  )
}
