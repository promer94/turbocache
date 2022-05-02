import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/tailwind.css';
import '../styles/main.css'
import { GeistProvider } from '@geist-ui/core';
import Head from 'next/head';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <GeistProvider>
      <Head>
        <title>Turbocache</title>
        <meta name="og:description" content="Turbocache is a remote cache server implmentation of turborepo" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta name="og:title" content="Turbocache" />
        <meta property="og:locale" content="en_IE" />
        <meta property="og:site_name" content="Turbocache" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </GeistProvider>
  );
}

export default MyApp;
