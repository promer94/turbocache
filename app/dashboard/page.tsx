import { DashBoardContainer } from '~/components/DashboardContainer'
import { getSession } from '~/service/auth/next-auth'

const DashboardPage = async () => {
  const session = await getSession()
  return (
    <DashBoardContainer
      pageTitle={
        <div className="space-y-4">
          <div className="text-2xl font-semibold">Dashboard</div>
          <p className="text-gray-500">Welcome, {session.user.name}</p>
        </div>
      }
    ></DashBoardContainer>
  )
}

export default DashboardPage
