import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  poweredByHeader: false,
  allowedDevOrigins: [
    '*.e2b.app',
    ...(process.env.NEXT_DEV_ORIGINS?.split(',').map((o) => o.trim()).filter(Boolean) ?? []),
  ],
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
};

const withMDX = createMDX();

export default withMDX(config);
