/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export only when building for production/export
  // Dev server requires this to be undefined/removed
  ...(process.env.NEXT_EXPORT === 'true' && { 
    output: 'export',
    basePath: '/AA-Wheels', // Required for GitHub Pages project sites
    trailingSlash: true, // Required for GitHub Pages compatibility
  }),
  images: {
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig

