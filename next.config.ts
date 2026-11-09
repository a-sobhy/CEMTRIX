import type { NextConfig } from "next";

// Deployed on Vercel, which runs the API routes (contact form) as serverless
// functions. Do not set `output: 'export'` — static export cannot include the
// POST /api/contact routes or the dynamic /products/[id] page.
const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    // Skip image optimization in local dev for faster loading.
    unoptimized: process.env.NODE_ENV === 'development',
  },

  allowedDevOrigins: ['localhost', '::1'],
};

export default nextConfig;
