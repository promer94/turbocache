import { getSession } from '~/service/auth/next-auth'

const DashboardPage = async () => {
  const session = await getSession()
  return <div>hello</div>
}

export default DashboardPage
