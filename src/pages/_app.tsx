import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import '../styles/tailwind.css';
import '../styles/main.css'
import { GeistProvider } from '@geist-ui/core';
import Head from 'next/head';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  /** @ts-expect-error */
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <GeistProvider>
      <Head>
        <title>Turbocache</title>
        <meta name="og:description" content="A simple remote cache server for Turborepo" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta name="og:title" content="Turbocache" />
        <meta property="og:locale" content="en_IE" />
        <meta property="og:site_name" content="Turbocache" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="image" content="https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26description%3DA%2Bsimple%2Bremote%2Bcache%2Bserver%2Bfor%2BTurborepo%26title%3DTurbocache" />
        <meta itemProp="image" content="https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26description%3DA%2Bsimple%2Bremote%2Bcache%2Bserver%2Bfor%2BTurborepo%26title%3DTurbocache" />
        <meta name="twitter:image" content="https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26description%3DA%2Bsimple%2Bremote%2Bcache%2Bserver%2Bfor%2BTurborepo%26title%3DTurbocache" />
        <meta property="og:image" content="https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26description%3DA%2Bsimple%2Bremote%2Bcache%2Bserver%2Bfor%2BTurborepo%26title%3DTurbocache" />
      </Head>
      <SessionProvider session={session}>
        <SWRConfig 
          value={{
            refreshInterval: 3000,
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          {getLayout(<Component {...pageProps} />)}
        </SWRConfig>
      </SessionProvider>
    </GeistProvider>
  );
}

export default MyApp;
