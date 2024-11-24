/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  env: {
    API_NEWS: process.env.API_NEWS,
  },
};

module.exports = nextConfig;
