
import { DashboardPageHeader } from '~/components/DashboardPageHeader'
import { getSession } from '~/service/auth/next-auth'

const DashboardPage = async () => {
  const session = await getSession()
  return (
    <>
      <DashboardPageHeader title="Dashboard" description={`Welcome, ${session.user.name} !`} />
      <div>hello</div>
    </>

  )
}

export default DashboardPage
