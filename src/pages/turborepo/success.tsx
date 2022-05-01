import { Badge, Snippet } from '@geist-ui/core';
import { Nav } from '../../components/Nav';
import { useGuideUrl } from '../../hooks/useGuideUrl';

const Success = () => {
  const { url, api } = useGuideUrl();
  return (
    <div className="main-container flex flex-col">
      <Nav></Nav>
      <div className="mt-[120px]"></div>
      <div className="m-auto flex flex-col items-center">
        <div className="text-[40px] inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 ">
          Turbocache connected
        </div>
        <div className="mt-[64px]"></div>
        <div className="text-xl text-black font-medium flex items-center">
          Enable remote cache <Badge className="!bg-pink-400 !mx-1">beta</Badge>
        </div>
        <div className="mt-[16px]"></div>
        <Snippet toastText="copied" text={`npx turbo link -- --url=${url} --api=${api}`} />
        <div className="mt-[32px]"></div>
        <div className="text-xl text-black font-medium flex items-center">
          Build your Turborepo
        </div>
        <div className="mt-[16px]"></div>
        <Snippet toastText="copied" text={`npx turbo run build --preflight`} />
      </div>
    </div>
  );
};

export default Success;
