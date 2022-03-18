import { GetServerSideProps } from 'next'
import { teamList } from '../../team/list'
import { sessionGuard } from '../../session'


const Token = ({ teams, redirectUrl }: {
  teams: {
    id: string;
    name: string | null;
  }[]
  redirectUrl: string
}) => {
  return (
    <div>
      {teams.map(v => (
        <div key={v.id} onClick={() => {
          fetch('/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: v.id,
            }
            )
          }).then(v => v.json()).then(v => {
            window.location.href = `${redirectUrl}?token=${v.token}`
          })
        }}>authorize {v.name}
        </div>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return sessionGuard(context, async (_, session) => {
    const teams = await teamList(session.email)
    const redirectUrl = context.query['redirect_uri'] || 'http://127.0.0.1:9789'
    return {
      props: {
        teams,
        redirectUrl
      }
    }
  })
}
export default Token