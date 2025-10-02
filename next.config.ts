// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Strict Mode to prevent double-rendering in development
  reactStrictMode: false,

  // Don't generate source maps in production or development to avoid 404s from AWS SDK source files
  productionBrowserSourceMaps: false,

  // Keep webpack config minimal – package.json "exports" handles subpaths
  webpack(config, { dev }) {
    // Disable source maps in development to prevent 404s from node_modules
    if (dev) {
      config.devtool = false;
    }
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
