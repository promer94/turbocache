import { getRSCSession } from '~/service/auth/next-auth'

const DashboardPage = async () => {
  const session = await getRSCSession()
  return <div>Hello, {session.user.name}</div>
}

export default DashboardPage
