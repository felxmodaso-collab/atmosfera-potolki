/** @type {import('next').NextConfig} */
const repo = "atmosfera-potolki";
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? `/${repo}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
