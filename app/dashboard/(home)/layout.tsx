import { DashboardPageHeader } from '~/components/DashboardPageHeader'
import { getSession } from '~/service/auth/next-auth'

const DashboardLayout = async ({ children }: {
  children?: React.ReactNode
}) => {
  const session = await getSession()
  return (
    <>
      <DashboardPageHeader title="Dashboard" description={`Welcome, ${session.user.name} !`} />
      {children}
    </>
  )
}

export default DashboardLayout