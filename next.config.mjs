import nextra from 'nextra'
import withBundleAnalyzer from '@next/bundle-analyzer'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: true, // Since we're using static export
  }
}

export default withNextra(bundleAnalyzer(nextConfig))
