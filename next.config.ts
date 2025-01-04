import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['media.canva.com'], // Add your allowed domains here
  },
  eslint: {
    ignoreDuringBuilds: true, // Bỏ qua kiểm tra ESLint khi build
  },
  /* other config options here */
};

export default nextConfig;
