/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export only when building for production/export
  // Dev server requires this to be undefined/removed
  ...(process.env.NEXT_EXPORT === 'true' && { 
    output: 'export',
    trailingSlash: true, // Required for GitHub Pages compatibility
  }),
  images: {
    unoptimized: true, // Required for static export
  },
  // If your site is hosted at a subdirectory (e.g., github.io/repo-name), uncomment below:
  // basePath: '/AA-Wheels',
}

module.exports = nextConfig

