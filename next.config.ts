import type { NextConfig } from "next";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

if (!BASE_PATH) {
  throw new Error('NEXT_PUBLIC_BASE_PATH environment variable is not set');
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
