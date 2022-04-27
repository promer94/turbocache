import { Nav } from '../../components/Nav';
import { Badge, Snippet } from '@geist-ui/core';
import { useGuideUrl } from '../../hooks/useGuideUrl';
import { getServerSideSession } from '../../service/session';
import { GetServerSideProps } from 'next';

const Onboarding = () => {
  const { url, api } = useGuideUrl();

  return (
    <div className="h-full min-w-[1024px]">
      <Nav></Nav>
      <div className="mt-[140px]"></div>
      <div className="flex flex-col items-center">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24">
            <div className="flex flex-col">
              <div className="p-2 w-full">
                <div className="text-xl text-black font-medium">Install turbo CLI</div>
                <div className="mt-[16px]"></div>
                <Snippet toastText="copied" text="npx create-turbo" width="100%" />
                <div className="mt-[32px]"></div>
                <div className="text-xl text-black font-medium">Login</div>
                <div className="mt-[16px]"></div>
                <Snippet toastText="copied" text={`npx turbo login -- --url=${url} --api=${api}`} width="100%" />
                <div className="mt-[32px]"></div>
                <div className="text-xl text-black font-medium flex items-center">
                  Enable remote cache <Badge className="!bg-pink-400 !mx-1">beta</Badge>
                </div>
                <div className="mt-[16px]"></div>
                <Snippet toastText="copied" text={`npx turbo link -- --url=${url} --api=${api}`} width="100%" />
                <div className="mt-[32px]"></div>
                <div className="text-xl text-black font-medium flex items-center">
                  Build your Turborepo
                </div>
                <div className="mt-[16px]"></div>
                <Snippet toastText="copied" text={`npx turbo link -- --url=${url} --api=${api} --preflight`} width="100%" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const [data, redirect] = await getServerSideSession(context);
  if (data) {
    return {
      props: {
        session: data.session,
      },
    };
  }
  return redirect;
};
export default Onboarding;
