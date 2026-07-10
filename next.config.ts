import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strongbody-files-api.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
  /* config options here */
  trailingSlash: true,
};

export default nextConfig;
