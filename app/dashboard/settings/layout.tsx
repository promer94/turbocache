import { DashboardPageHeader } from '~/components/dashboard-page-header'

const SettingLayout = async ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <DashboardPageHeader
        title="Settings"
        description="Manage your account settings here"
      />
      {children}
    </>
  )
}

export default SettingLayout
