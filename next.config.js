/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disabled for CMS functionality
  // output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',
  trailingSlash: true,
};

module.exports = nextConfig; 