/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true
    },
    reactStrictMode: false,
    env: {
        API_URL: process.env.API_URL
    },
}

module.exports = nextConfig
