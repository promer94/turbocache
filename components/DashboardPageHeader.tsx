import Balancer from 'react-wrap-balancer'
interface Props {
  children?: React.ReactNode
  title: string
  description: string
}

export const DashboardPageHeader = ({ title, description }: Props) => {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="text-gray-500">{description}</div>
    </div>
  )
}
