import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/mui-date-range-picker/docs" : "",
  transpilePackages: ["@mui-date-range-picker/react"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
