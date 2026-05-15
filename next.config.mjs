/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["qb8bl3jg-3000.euw.devtunnels.ms", "localhost:3000"],
    },
  },
}

export default nextConfig
