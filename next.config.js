/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Ensure Railway API URL is available to API routes
  env: {
    RAILWAY_API_URL: process.env.RAILWAY_API_URL,
  },
  // Optimize for modular project structure
  transpilePackages: [],
}

module.exports = nextConfig
