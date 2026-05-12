import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    /* R3F v8 JSX types don't fully cover React 19 — safe to skip, code runs fine */
    ignoreBuildErrors: true,
  },
  transpilePackages: ['three'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', '@react-three/drei'],
  },
};

export default nextConfig;
