"use client";

/**
 * @captify/pmbook - App Module
 * 
 * Dynamically generates page registry from config.json menu structure
 * for automatic discovery by the Captify platform.
 */

import { ComponentType } from "react";
import { menu as menuConfig } from "../config";

// Type definitions for dynamic imports compatible with Next.js
export type NextPageComponent = ComponentType<any>;
export type PageImport = () => Promise<{ default: NextPageComponent }>;
export type PageRegistry = Record<string, PageImport>;

// Generate page registry dynamically from config.json
function generatePageRegistry(): PageRegistry {
  const registry: PageRegistry = {};
  
  // Add default/home page - point to command center directly
  registry.home = async () => {
    const module = await import("./pages/ops/people/page");
    return { default: module.CommandCenterPage };
  };
  registry.dashboard = async () => {
    const module = await import("./pages/ops/people/page");
    return { default: module.CommandCenterPage };
  };
  
  // Process menu items recursively to generate dynamic imports
  function processMenuItems(items: any[], parentPath = "") {
    items.forEach((item) => {
      if (item.children) {
        // Process submenu items
        processMenuItems(item.children, parentPath);
      } else if (item.href) {
        // Generate dynamic import path based on href
        const importPath = item.href.replace(/^\//, "").replace(/\//g, "/");
        
        // Create registry entries for different access patterns
        const cleanId = item.id.replace("pmbook-", "").replace(/-/g, "-");
        const hrefKey = item.href.slice(1).replace("/", "-"); // Remove leading slash, replace / with -
        
        // Dynamic import based on the href structure
        const dynamicImport = async () => {
          try {
            const module = await import(`./pages/${importPath}/page`);
            return { default: module.default };
          } catch (error) {
            // Fallback to index if page.tsx doesn't exist
            const module = await import(`./pages/${importPath}/index`);
            return { default: module.default };
          }
        };
        
        registry[cleanId] = dynamicImport;
        registry[hrefKey] = dynamicImport;
        registry[item.id] = dynamicImport;
      }
    });
  }
  
  processMenuItems(menuConfig);
  
  return registry;
}

// Export the dynamically generated registry
export const pageRegistry: PageRegistry = generatePageRegistry();

// Export the menu configuration for platform use
export const menuConfiguration = menuConfig;

// Re-export config for convenience
export { config, slug, description } from "../config";

// Export the registered apps lookup
export { registeredApps } from "./pages";