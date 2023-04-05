import { useClipboard, useToasts } from '@geist-ui/core'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Footer } from '../components/Footer'

const turbo = 'npx create-turbo'
const Index = () => {
  const { data } = useSession()
  const router = useRouter()
  const { copy } = useClipboard()
  const toast = useToasts()

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Head>
        <title>Turbocache</title>
        <meta
          name="og:description"
          content="Turbocache is a remote cache server implmentation of turborepo"
        />
      </Head>
      <div className="flex h-full flex-col items-center justify-center px-4 pb-8 pt-16 sm:px-6 sm:pt-24 md:flex md:flex-col md:justify-start lg:px-8">
        <h1 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-center  text-6xl font-extrabold leading-[1.1] tracking-tighter text-transparent sm:text-7xl lg:text-8xl xl:text-8xl">
          Turbocache
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-center text-xl font-medium leading-tight text-gray-400 sm:max-w-xl sm:text-xl md:text-2xl lg:text-2xl">
          A simple remote cache server for Turborepo
        </p>
        <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md ">
            <button
              className="flex w-full items-center justify-center rounded-md border bg-black px-8 py-3 text-base font-medium text-white no-underline md:px-10 md:py-3 md:text-lg md:leading-6 betterhover:hover:bg-gray-700"
              onClick={() => {
                if (data) {
                  router.push('/turborepo/onboarding')
                } else {
                  signIn('github', {
                    callbackUrl: '/turborepo/onboarding',
                  })
                }
              }}
            >
              Start caching →
            </button>
          </div>
          <div className="relative mt-3 rounded-md sm:ml-3 sm:mt-0">
            <button
              onClick={() => {
                copy(turbo)
                toast.setToast({ text: 'Copied to clipboard', type: 'success' })
              }}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 font-mono text-sm font-medium text-gray-600 opacity-5 md:px-10 md:py-3 md:text-base md:leading-6 betterhover:hover:bg-gray-50"
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
  )
}
export default Index

export async function getServerSideProps() {
  /**
   * If required components are not configured properly
   * Redirect to setup guide page
   */

  const {
    AWS_ACCESSKEY_ID,
    AWS_ACCESSKEY_TOKEN,
    AWS_S3_BUCKET,
    AWS_S3_REGION,
  } = process.env

  if (
    !(AWS_ACCESSKEY_ID && AWS_ACCESSKEY_TOKEN && AWS_S3_BUCKET && AWS_S3_REGION)
  ) {
    return {
      redirect: {
        permanent: false,
        destination: '/setup',
      },
    }
  }

  return {
    props: {},
  }
}
