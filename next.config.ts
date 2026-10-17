import type { NextConfig } from "next";

// GitHub Pages project sites: set NEXT_PUBLIC_BASE_PATH=/repository-name at build time.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

if (basePath && !/^\/[a-zA-Z0-9._-]+$/.test(basePath)) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must be empty or /repository-name");
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  devIndicators: false,
};

export default nextConfig;
