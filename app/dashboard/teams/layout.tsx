import { DashBoardContainer } from '~/components/DashboardContainer'
import { TeamTitle } from '~/components/TeamsTitle'

const DashboardTeamsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashBoardContainer pageTitle={<TeamTitle />}>
      {children}
    </DashBoardContainer>
  )
}

export default DashboardTeamsLayout
