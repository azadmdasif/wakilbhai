/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The legacy Vite SPA lives in /legacy for reference only.
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    // Legacy SPA routes (hash-based /#/x routes are handled by an inline
    // script since fragments never reach the server; these cover direct
    // path hits and old links).
    return [
      { source: '/help-guides', destination: '/help', permanent: true },
      { source: '/:locale(hi|ur|bn)/help-guides', destination: '/:locale/help', permanent: true },
      { source: '/documents', destination: '/templates', permanent: true },
      { source: '/:locale(hi|ur|bn)/documents', destination: '/:locale/templates', permanent: true },
      { source: '/blog', destination: '/help', permanent: true },
      { source: '/:locale(hi|ur|bn)/blog', destination: '/:locale/help', permanent: true },
      { source: '/blog/:slug', destination: '/help', permanent: true },
      { source: '/:locale(hi|ur|bn)/blog/:slug', destination: '/:locale/help', permanent: true },
    ];
  },
};

export default nextConfig;
