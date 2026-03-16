import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@indexlabs/mui-date-range-picker"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
