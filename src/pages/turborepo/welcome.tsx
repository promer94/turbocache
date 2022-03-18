import { GetServerSideProps } from 'next'
import { sessionGuard } from '../../session'


const Welcome = () => {
  return <div>hello</div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return sessionGuard(context, async (_, session) => ({
    props: {
      session
    }
  }))
}
export default Welcome