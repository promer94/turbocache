import { useClipboard, useToasts } from '@geist-ui/core';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const turbo = 'npx create-turbo';
const Index = () => {
  const { data } = useSession();
  const router = useRouter();
  const { copy } = useClipboard();
  const toast = useToasts();
  return (
    <>
      <Head>
        <title>Turbocache</title>
        <meta name="og:description" content="Turbocache is a remote cache server implmentation of turborepo" />
      </Head>
      <div className="px-4 pt-16 pb-8 sm:px-6 sm:pt-24 lg:px-8 dark:text-white dark:bg-black ">
        <h1 className="text-center text-6xl font-extrabold tracking-tighter leading-[1.1] sm:text-7xl lg:text-8xl xl:text-8xl">
          Turbocache that
          <br className="hidden lg:block" />
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 ">
            make monorepos fast
          </span>
        </h1>
        <p className="max-w-lg mx-auto mt-6 text-xl font-medium leading-tight text-center text-gray-400 sm:max-w-xl sm:text-xl md:text-2xl lg:text-2xl">
          Turbocache is a remote cache server implmentation of Turborepo
        </p>
        <div className="max-w-xl mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md ">
            <button
              className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white no-underline bg-black border border-transparent rounded-md dark:bg-white dark:text-black betterhover:dark:hover:bg-gray-300 betterhover:hover:bg-gray-700 md:py-3 md:text-lg md:px-10 md:leading-6"
              onClick={() => {
                if (data) {
                  router.push('/turborepo/onboarding');
                } else {
                  signIn('tof4', {
                    callbackUrl: '/turborepo/onboarding',
                  });
                }
              }}
            >
              Start caching →
            </button>
          </div>
          <div className="relative mt-3 rounded-md sm:mt-0 sm:ml-3">
            <button
              onClick={() => {
                copy(turbo);
                toast.setToast({ text: '复制成功', type: 'success' });
              }}
              className="flex items-center justify-center w-full px-8 py-3 font-mono text-sm font-medium text-gray-600 bg-black border border-transparent border-gray-200 rounded-md bg-opacity-5 dark:bg-white dark:text-gray-300 dark:border-gray-700 dark:bg-opacity-5 betterhover:hover:bg-gray-50 betterhover:dark:hover:bg-gray-900 md:py-3 md:text-base md:leading-6 md:px-10"
            >
              {turbo}
              <svg
                className="ml-[4px]"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                shapeRendering="geometricPrecision"
                style={{ color: 'currentcolor' }}
              >
                <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z" />
                <style jsx>{`
                  svg {
                    width: 22px;
                    height: 22px;
                  }
                `}</style>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;