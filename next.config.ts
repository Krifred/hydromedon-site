import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow Next.js Image optimisation for all HTTPS sources (Fourthwall CDN, etc.)
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
