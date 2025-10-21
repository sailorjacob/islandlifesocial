import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'fezgwnozzqforwekquwc.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fezgwnozzqforwekquwc.supabase.co',
        pathname: '/**',
      },
    ],
  },
  // Enable Turbopack for faster development
  turbopack: {
    root: './',
  },
};

export default nextConfig;
