import "dotenv/config"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.CLOUDFLARE_R2_PLUBIC_DOMAIN}`,
      },
    ],
  },
};

export default nextConfig;
