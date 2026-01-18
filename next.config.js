/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export only when building for production/export
  // Dev server requires this to be undefined/removed
  ...(process.env.NEXT_EXPORT === 'true' && { output: 'export' }),
  images: {
    unoptimized: true,
  },
  // basePath: '/your-repo-name', // Uncomment and set for GitHub Pages if needed
  // trailingSlash: true, // Uncomment for GitHub Pages
}

module.exports = nextConfig

