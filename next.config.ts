// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don’t generate source maps in production
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
