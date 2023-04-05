import { Badge, Snippet } from '@geist-ui/core'
import { useGuideUrl } from '../../hooks/useGuideUrl'
import { Layout } from '../../components/Layout'
import { GetServerSideProps } from 'next'
import { getServerSideSession } from '../../service/session'

const Onboarding = ({ host }: { host: string }) => {
  const { url, api } = useGuideUrl({ host })
  return (
    <div className="flex flex-col">
      <div className="text-xl font-medium text-black">Install turbo CLI</div>
      <div className="mt-[16px]"></div>
      <Snippet text="npx create-turbo" />
      <div className="mt-[32px]"></div>
      <div className="text-xl font-medium text-black">Login</div>
      <div className="mt-[16px]"></div>
      <Snippet text={`npx turbo login -- --url=${url} --api=${api}`} />
      <div className="mt-[32px]"></div>
      <div className="flex items-center text-xl font-medium text-black">
        Enable remote cache <Badge className="!mx-1 !bg-pink-400">beta</Badge>
      </div>
      <div className="mt-[16px]"></div>
      <Snippet text={`npx turbo link -- --url=${url} --api=${api}`} />
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const [result, redirect] = await getServerSideSession(context)
  if (redirect) {
    return redirect
  }
  return {
    props: {
      session: result.session,
      host: process.env.NEXTAUTH_URL,
    },
  }
}
Onboarding.getLayout = Layout
export default Onboarding
