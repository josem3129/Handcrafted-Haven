/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  images: {
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;
