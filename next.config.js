/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: '/blog/:prefix(\\d{3})-:slug([^/]+)',
      destination: '/blog/:slug',
      permanent: true
    }
  ],
};

module.exports = nextConfig
