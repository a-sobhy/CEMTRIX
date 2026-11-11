import type { NextConfig } from "next";

// Deployed on Vercel, which runs the API routes (contact form) as serverless
// functions. Do not set `output: 'export'` — static export cannot include the
// POST /api/contact routes or the dynamic /products/[id] page.
const nextConfig: NextConfig = {
  reactCompiler: true,

  // Don't enable experimental.inlineCss: tested Nov 2026, it embedded the 75 KB stylesheet three
  // times in the HTML (a <style> tag plus twice in the RSC payload), tripling HTML size and
  // making the main-thread parse task longer. The external stylesheet is ~13 KB gzipped.

  images: {
    // Skip image optimization in local dev for faster loading.
    unoptimized: process.env.NODE_ENV === 'development',
    // AVIF first (smallest), WebP for browsers without AVIF support.
    formats: ['image/avif', 'image/webp'],
  },

  allowedDevOrigins: ['localhost', '::1'],

  async headers() {
    return [
      {
        // Versioned media (file names end in -vN). Never overwrite a file here: add a new version.
        source: '/media/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
