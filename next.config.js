const { PerfseePlugin } = require('@perfsee/webpack')

const output =
  process.env.NEXT_PUBLIC_OUTPUTSTANDALONE === '1'
    ? {
        output: 'standalone',
      }
    : {}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  experimental: {
    typedRoutes: true,
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new PerfseePlugin({
          project: 'turbocache',
          enableAudit: true,
        })
      )
      return config
    }
    return config
  },
  ...output,
}

module.exports = nextConfig
