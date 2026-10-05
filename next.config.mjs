/** @type {import('next').NextConfig} */
const nextConfig = {
  // Icon packs are imported through their barrel. Turbopack tree-shakes them in
  // the production build, but this keeps dev and build from walking the whole
  // package on every import.
  experimental: {
    optimizePackageImports: ['@hugeicons/core-free-icons', '@hugeicons/react', '@heroicons/react'],
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    // `loader: 'custom'` turns the built-in optimizer off entirely — no image
    // goes through /_next/image any more. deviceSizes/imageSizes still matter:
    // they decide the `w` steps in the srcset that the loader passes to the
    // source CDN. The 16/32/48/64/96 steps (tiny icons) and 3840 (4K) are
    // dropped because nothing renders at those widths.
    deviceSizes: [640, 828, 1080, 1200, 1920, 2048],
    imageSizes: [128, 256, 384],
    // Only the hosts this template actually loads images from. Add your own the
    // same way, and keep `pathname` as narrow as it can be.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
