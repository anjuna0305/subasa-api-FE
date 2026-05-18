import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  // env: {
  //   NEXT_PUBLIC_BASE_PATH: "/voc-si-test",
  //   PORT: "7007",
  // },
  // images: {
  //   unoptimized: true,
  // },
  // output: "standalone",
  reactCompiler: true,
};

// TODO this thing is ruining the forntend. make this only applicable for the deployment.
export default nextConfig;
