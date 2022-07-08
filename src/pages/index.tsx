import { useClipboard, useToasts } from '@geist-ui/core';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Footer } from '../components/Footer';

const turbo = 'npx create-turbo';
const Index = () => {
  const { data } = useSession();
  const router = useRouter();
  const { copy } = useClipboard();
  const toast = useToasts();

  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <Head>
        <title>Turbocache</title>
        <meta name="og:description" content="Turbocache is a remote cache server implmentation of turborepo" />
      </Head>
      <div className="md:flex md:flex-col md:justify-start px-4 pt-16 pb-8 sm:px-6 sm:pt-24 lg:px-8 h-full flex flex-col justify-center items-center">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600  text-center text-6xl font-extrabold tracking-tighter leading-[1.1] sm:text-7xl lg:text-8xl xl:text-8xl">
          Turbocache
        </h1>
        <p className="max-w-lg mx-auto mt-6 text-xl font-medium leading-tight text-center text-gray-400 sm:max-w-xl sm:text-xl md:text-2xl lg:text-2xl">
          A simple remote cache server for Turborepo
        </p>
        <div className="max-w-xl mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md ">
            <button
              className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white no-underline bg-black border border-transparent rounded-md betterhover:hover:bg-gray-700 md:py-3 md:text-lg md:px-10 md:leading-6"
              onClick={() => {
                if (data) {
                  router.push('/turborepo/onboarding');
                } else {
                  signIn('github', {
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
                toast.setToast({ text: 'Copied to clipboard', type: 'success' });
              }}
              className="flex items-center justify-center w-full px-8 py-3 font-mono text-sm font-medium text-gray-600 bg-black border border-transparent border-gray-200 rounded-md bg-opacity-5 betterhover:hover:bg-gray-50 md:py-3 md:text-base md:leading-6 md:px-10"
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
      <Footer></Footer>
    </div>
  );
};
export default Index;

export async function getServerSideProps() {
  /**
   * If required components are not configured properly
   * Redirect to setup guide page
   */

  const {
    AWS_ACCESSKEY_ID,
    AWS_ACCESSKEY_TOKEN,
    AWS_S3_BUCKET,
    AWS_S3_REGION
  } = process.env

  if (!(
    AWS_ACCESSKEY_ID &&
    AWS_ACCESSKEY_TOKEN &&
    AWS_S3_BUCKET &&
    AWS_S3_REGION
  )) {
    return {
      redirect: {
        permanent: false,
        destination: "/setup"
      }
    }
  }

  return {
    props: {}
  }
}