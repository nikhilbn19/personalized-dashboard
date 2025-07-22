import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
};

export default nextConfig;
