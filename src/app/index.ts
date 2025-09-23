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

  // Add default/home page - point to work tasks
  registry.home = () => import("./pages/work/tasks");
  registry.dashboard = () => import("./pages/work/tasks");

  // Static import mapping to avoid bundler warnings
  const staticImports: Record<string, PageImport> = {
    "work-tasks": () => import("./pages/work/tasks"),
    "work-tickets": () => import("./pages/work/tickets"),
    "work-requests": () => import("./pages/work/requests"),
    "contracts-active": () => import("./pages/contracts/active"),
    "contracts-opportunities": () => import("./pages/contracts/opportunities"),
    "contracts-budget": () => import("./pages/contracts/pools"),
    "contracts-burn": () => import("./pages/contracts/burn"),
    "people-team": () => import("./pages/people/team"),
    "streams-overview": () => import("./pages/streams/area"),
    "streams-catalog": () => import("./pages/streams/catalog"),
    "people-performance": () => import("./pages/people/performance"),
  };

  // Process menu items recursively to generate dynamic imports
  function processMenuItems(items: any[]) {
    items.forEach((item) => {
      if (item.children) {
        processMenuItems(item.children);
      } else if (item.href && item.id) {
        const staticImport = staticImports[item.id];
        if (staticImport) {
          registry[item.id] = staticImport;
        }
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
