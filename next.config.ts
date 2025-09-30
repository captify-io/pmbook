// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Strict Mode to prevent double-rendering in development
  reactStrictMode: false,

  // Don't generate source maps in production
  productionBrowserSourceMaps: false,

  // Keep webpack config minimal – package.json "exports" handles subpaths
  webpack(config) {
    return config;
  },

  // Turbopack rule to import .svg files as React components
  turbopack: {
    rules: {
      "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" },
    },
  },
};

export default nextConfig;
