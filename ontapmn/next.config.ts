import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  turbopack: {
    root: process.cwd()
  },
  // Enable build cache for production
  cacheHandler: process.env.NODE_ENV === 'production' ? require.resolve('./cache-handler.js') : undefined,
  cacheMaxMemorySize: 50 * 1024 * 1024, // 50 MB
  
  // Skip trailing slash redirect for dynamic routes during development
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
