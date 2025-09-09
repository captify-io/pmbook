import { defineConfig } from "tsup";

const isDev = process.env.NODE_ENV === "development";

// Helper function to create config for each entry
const createEntryConfig = (
  entryName: string,
  entryPath: string,
  addUseClient: boolean
) => ({
  entry: { [entryName]: entryPath },
  format: ["esm"] as ["esm"],
  outExtension: () => ({ js: ".mjs" }),
  dts: false, // Disable for now - types from peer deps not resolving in CI
  splitting: false,
  sourcemap: true,
  clean: entryName === "app", // Only clean once (first entry alphabetically)
  target: "es2022",
  minify: false,
  treeshake: false,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
    "next",
    "next/link",
    "next/navigation",
    "next/router",
    "@aws-sdk/*",
    "@captify-io/core",
    "@captify-io/core/*",
  ],
  esbuildOptions(options: {
    jsx: string;
    jsxImportSource: string;
    keepNames: boolean;
    legalComments: string;
  }) {
    options.jsx = "automatic";
    options.jsxImportSource = "react";
    options.keepNames = true;
    options.legalComments = "none";
  },
  ...(addUseClient && {
    banner: {
      js: '"use client";',
    },
  }),
  onSuccess: isDev ? `echo '@captify/pmbook ${entryName} rebuilt!'` : undefined,
  watch: isDev ? [`src/**/*.ts`, `src/**/*.tsx`] : false,
});

export default defineConfig([
  // Client-side modules (with "use client")
  createEntryConfig("app", "src/app/index.ts", true),
  createEntryConfig("components", "src/components/index.ts", true),
  createEntryConfig("hooks", "src/hooks/index.ts", true),
  createEntryConfig("lib", "src/lib/index.ts", true),
  
  // Server-side modules (without "use client")
  createEntryConfig("services", "src/services/index.ts", false),
  
  // Type exports (no "use client" needed)
  createEntryConfig("types", "src/types/index.ts", false),
]);
