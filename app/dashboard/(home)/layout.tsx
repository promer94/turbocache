import DashboardPageHeader from '~/components/dashboard-page-header'
import { getSession } from '~/service/auth/next-auth'
import { findAuthUser } from '~/service/user'

const DashboardLayout = async ({
  children,
}: {
  children?: React.ReactNode
}) => {
  const session = await getSession()
  const user = await findAuthUser({
    userId: session.user.id,
  })
  return (
    <>
      <DashboardPageHeader
        title="Dashboard"
        description={`Welcome, ${user.name} !`}
      />
      {children}
    </>
  )
}

export default DashboardLayout
