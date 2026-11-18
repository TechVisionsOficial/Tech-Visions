import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.15.159"],
  experimental: {
    // Route navigations animate through React's <ViewTransition> (page crossfade,
    // product card -> product page morph).
    viewTransition: true,
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
