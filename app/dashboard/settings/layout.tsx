import { DashboardPageHeader } from '~/components/DashboardPageHeader'

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
