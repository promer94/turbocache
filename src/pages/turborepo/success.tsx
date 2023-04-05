import { Badge, Snippet } from '@geist-ui/core'
import { Layout } from '../../components/Layout'
import { useGuideUrl } from '../../hooks/useGuideUrl'
import { GetServerSideProps } from 'next'
import { getServerSideSession } from '../../service/session'
const Success = ({ host }: { host: string }) => {
  const { url, api } = useGuideUrl({ host })
  return (
    <div className="flex flex-col">
      <div className="inline-flex justify-center bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-[40px] text-transparent">
        Turbocache connected
      </div>
      <div className="mt-[64px]"></div>
      <div className="flex items-center text-xl font-medium text-black">
        Enable remote cache <Badge className="!mx-1 !bg-pink-400">beta</Badge>
      </div>
      <div className="mt-[16px]"></div>
      <Snippet text={`npx turbo link -- --url=${url} --api=${api}`} />
      <div className="mt-[32px]"></div>
      <div className="flex items-center text-xl font-medium text-black">
        Build your Turborepo
      </div>
      <div className="mt-[16px]"></div>
      <Snippet text="npx turbo run build --remote-only --preflight" />
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

Success.getLayout = Layout
export default Success
