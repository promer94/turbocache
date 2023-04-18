import { getSession } from '~/service/auth/next-auth'
import { SettingForm } from './SettingForm'
import { findAuthUser } from '~/service/user'


const SettingsPage = async () => {
  const session = await getSession()
  const user = await findAuthUser({
    userId: session.user.id,
  })
  return <SettingForm initialName={user.name || session.user.name}></SettingForm>
}

export default SettingsPage
