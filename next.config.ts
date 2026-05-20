import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  // Turbopack is the default in Next.js 16; Velite runs via prebuild npm script
  turbopack: {},
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default bundleAnalyzer(nextConfig)
