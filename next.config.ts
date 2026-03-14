import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
  // Allow serving HEIC files (Bhanuvishwa.HEIC) – fallback handled in JS
  // No special config needed; we handle errors in img onError callbacks
};

export default nextConfig;
