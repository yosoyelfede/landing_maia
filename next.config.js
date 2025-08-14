/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disabled for GitHub Pages compatibility
  // output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',
  trailingSlash: true,
};

module.exports = nextConfig; 