// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Strict Mode to prevent double-rendering in development
  reactStrictMode: false,

  // Don't generate source maps in production
  productionBrowserSourceMaps: false,

  // Keep webpack config minimal – package.json "exports" handles subpaths
  webpack(config, { dev, isServer }) {
    if (dev) {
      // Ignore missing source maps from node_modules (AWS SDK, etc.)
      config.ignoreWarnings = [
        ...(config.ignoreWarnings || []),
        /Failed to parse source map/,
        /source-map-loader/,
      ];

      // Configure source-map-loader to skip node_modules
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      config.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules/,
      });
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
