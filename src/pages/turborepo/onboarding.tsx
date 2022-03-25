import { GetServerSideProps } from 'next'
import { getServerSideSession } from '../../service/session'


const Welcome = () => {
  return <div>hello</div>
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
export default Welcome