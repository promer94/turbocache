import { Badge, Snippet } from '@geist-ui/core';
import { GetServerSideProps } from 'next';
import { Layout } from '../../components/Layout';
import { useGuideUrl } from '../../hooks/useGuideUrl';
import { getServerSideSession } from '../../service/session';

const Success = () => {
  const { url, api } = useGuideUrl();
  return (
    <div className="flex flex-col">
      <div className="text-[40px] inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 ">
        Turbocache connected
      </div>
      <div className="mt-[64px]"></div>
      <div className="text-xl text-black font-medium flex items-center">
        Enable remote cache <Badge className="!bg-pink-400 !mx-1">beta</Badge>
      </div>
      <div className="mt-[16px]"></div>
      <Snippet text={`npx turbo link -- --url=${url} --api=${api}`} />
      <div className="mt-[32px]"></div>
      <div className="text-xl text-black font-medium flex items-center">
        Build your Turborepo
      </div>
      <div className="mt-[16px]"></div>
      <Snippet text={`npx turbo run build --preflight`} />
    </div>

  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const [data, redirect] = await getServerSideSession(context);
  if (data) {
    return {
      props: {
        session: data.session
      },
    };
  }
  return redirect;
};

Success.getLayout = Layout
export default Success;
