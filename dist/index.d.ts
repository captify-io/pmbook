/**
 * @captify/pmbook - PMBook Main Entry Point
 *
 * Main package entry point that re-exports all modules
 */
export { pageRegistry, menuConfiguration, config, slug, description, } from "./app";
export * from "./types";
export * from "./services";
export * from "./config";
export * from "./components";
export { default } from "./components/PageRouter";
