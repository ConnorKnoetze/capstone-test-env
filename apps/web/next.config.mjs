import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@roster/types"],
  outputFileTracingRoot: path.resolve("..", ".."),
};

export default nextConfig;
