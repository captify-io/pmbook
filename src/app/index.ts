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
  registry.home = () => import("./pages/ops/people/page");
  registry.dashboard = () => import("./pages/ops/people/page");

  // Process menu items recursively to generate dynamic imports
  function processMenuItems(items: any[], parentPath = "") {
    items.forEach((item) => {
      if (item.children) {
        // Process submenu items
        processMenuItems(item.children, parentPath);
      } else if (item.href) {
        // Generate dynamic import path based on href
        const importPath = item.href.replace(/^\//, "").replace(/\//g, "/");

        // Static import mapping to avoid bundler warnings
        const staticImports: Record<string, PageImport> = {
          'exe/my-tickets': () => import('./pages/exe/my-tickets/page'),
          'exe/value-streams': () => import('./pages/exe/value-streams/page'),
          'ops/contracts': () => import('./pages/ops/contracts/page'),
          'ops/insights': () => import('./pages/ops/insights/page'),
          'ops/people': () => import('./pages/ops/people/page'),
          'ops/performance': () => import('./pages/ops/performance/page'),
          'services': () => import('./pages/services/page'),
          'strategic': () => import('./pages/strategic/page'),
          'work': () => import('./pages/work/page'),
        };

        const dynamicImport = async () => {
          const moduleImport = staticImports[importPath];
          if (moduleImport) {
            const module = await moduleImport();
            return { default: module.default };
          }
          throw new Error(`Page not found: ${importPath}`);
        };

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
