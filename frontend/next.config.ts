import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/remittance-optimizer",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
