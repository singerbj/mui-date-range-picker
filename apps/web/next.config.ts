import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@mui-date-range-picker/react"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
