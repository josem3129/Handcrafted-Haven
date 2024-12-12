/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental',
    appDir: false,
  },
  images: {
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;
