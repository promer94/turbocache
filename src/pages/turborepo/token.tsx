import { GetServerSideProps } from 'next'
import { getServerSideSession } from '../../service/session'

const Token = ({ redirectUrl = 'http://127.0.0.1:9789' }: {
  redirectUrl: string
}) => {
  return (
    <div onClick={() => {
      fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(v => v.json()).then(v => {
        window.location.href = `${redirectUrl}?token=${v.token}`
      })
    }}>authorize
    </div>


  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [data, redirect] = await getServerSideSession(context)
  if (data) {
    return {
      props: {
        session: data.session
      }
    }
  } else {
    return redirect
  }
}
export default Token