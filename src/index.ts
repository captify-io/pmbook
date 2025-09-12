"use client";

/**
 * @captify/pmbook - PMBook Main Entry Point
 *
 * Main package entry point that re-exports all modules
 */

// Export config specifically to avoid conflicts
export {
  pageRegistry,
  menuConfiguration,
  config,
  slug,
  description,
} from "./app";

// Export client-safe types
export * from "./types";

// Export other modules
export * from "./services";

export * from "./config";
