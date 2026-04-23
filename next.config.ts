import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/voc-si-test",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/voc-si-test",
    PORT: "7007",
  },
  images: {
    unoptimized: true,
  },
  output: "standalone",
  // reactCompiler: true,
};

export default nextConfig;
