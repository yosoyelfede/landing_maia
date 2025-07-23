/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Restored for production
  images: {
    unoptimized: true,
  },
  basePath: '',
  trailingSlash: true,
};

module.exports = nextConfig; 