import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // FIX: Add these configurations
  images: {
    // If you're using local images, this helps with loading
    unoptimized: process.env.NODE_ENV === 'development',
    // If you have remote images, add their domains here
    domains: ['localhost'],
  },

  allowedDevOrigins: ['localhost', '10.0.0.23', '::1'],

  // FIX: If you're using standalone output
  output: 'standalone',
};

export default nextConfig;