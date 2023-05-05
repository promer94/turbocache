import { getRSCSession } from '~/service/auth/next-auth'
import SettingForm from './setting-form'
import { findAuthUser } from '~/service/user'

const SettingsPage = async () => {
  const session = await getRSCSession()
  const user = await findAuthUser({
    userId: session.user.id,
  })
  return (
    <SettingForm initialName={user.name || session.user.name}></SettingForm>
  )
}

export default SettingsPage
