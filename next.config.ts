import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      // Fourthwall product/customization images
      { protocol: "https", hostname: "cdn.fourthwall.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
