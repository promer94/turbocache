import { Badge, Snippet } from '@geist-ui/core';
import { useGuideUrl } from '../../hooks/useGuideUrl';
import { Layout } from '../../components/Layout';
import { GetServerSideProps } from 'next';
import { getServerSideSession } from '../../service/session';

const Onboarding = () => {
  const { url, api } = useGuideUrl();
  return (
    <div className="flex flex-col">
      <div className="text-xl text-black font-medium">Install turbo CLI</div>
      <div className="mt-[16px]"></div>
      <Snippet text="npx create-turbo" />
      <div className="mt-[32px]"></div>
      <div className="text-xl text-black font-medium">Login</div>
      <div className="mt-[16px]"></div>
      <Snippet text={`npx turbo login -- --url=${url} --api=${api}`} />
      <div className="mt-[32px]"></div>
      <div className="text-xl text-black font-medium flex items-center">
        Enable remote cache <Badge className="!bg-pink-400 !mx-1">beta</Badge>
      </div>
      <div className="mt-[16px]"></div>
      <Snippet text={`npx turbo link -- --url=${url} --api=${api}`} />
    </div>

  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const [result, redirect] = await getServerSideSession(context)
  if (redirect) {
    return redirect
  }
  return {
    props: {
      session: result.session
    }
  }
}
Onboarding.getLayout = Layout
export default Onboarding;
