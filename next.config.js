/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  redirects: async () => [
    {
      source: '/blog/(\\d{3}-):slug',
      destination: '/blog/:slug',
      permanent: true
    }
  ],
};

module.exports = nextConfig
