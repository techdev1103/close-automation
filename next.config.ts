import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*", // Match all paths under /api/proxy
  //       destination: "https://api.close.com/:path*", // Proxy to the external API
  //     },
  //   ];
  // },
};

export default nextConfig;
