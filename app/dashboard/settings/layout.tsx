import { DashBoardContainer } from '~/components/DashboardContainer'

const DashboardSettingsLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <DashBoardContainer
      pageTitle={
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-gray-500">Manage your account settings</p>
        </div>
      }
    >
      {children}
    </DashBoardContainer>
  )
}

export default DashboardSettingsLayout
