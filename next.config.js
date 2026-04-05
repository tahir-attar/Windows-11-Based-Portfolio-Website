/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'storage.googleapis.com',
      'raw.githubusercontent.com',
      'i.imgur.com',
      'i.postimg.cc',
      'firebasestorage.googleapis.com',
      'cdn.jsdelivr.net',
      'cdn.simpleicons.org',
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
    ];
  },
};
