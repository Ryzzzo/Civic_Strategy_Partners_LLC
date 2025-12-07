/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '**.hubspot.com',
      },
      {
        protocol: 'https',
        hostname: '**.hubspotusercontent.net',
      },
    ],
  },
};

module.exports = nextConfig;
