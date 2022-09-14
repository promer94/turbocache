const output =
  process.env.NEXT_PUBLIC_OUTPUTSTANDALONE === "1"
    ? {
        output: "standalone",
      }
    : {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  ...output
};

module.exports = nextConfig;
