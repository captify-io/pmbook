"use client";

/**
 * @captify/pmbook - PMBook App Entry Point
 *
 * This module dynamically generates page registry from config.json menu structure
 * for automatic discovery by the Captify platform.
 */

import { ComponentType } from "react";
import menuConfig from "./config.json";

// Type definitions for dynamic imports compatible with Next.js
export type NextPageComponent = ComponentType<any>;
export type PageImport = () => Promise<{ default: NextPageComponent }>;
export type PageRegistry = Record<string, PageImport>;
export type ComponentRegistry = Record<string, PageImport>;

// Export individual types for external use
export type { ComponentType };

// Page path mapping based on config.json structure
const PAGE_MAPPINGS: Record<string, string> = {
  // Operations pages
  "/ops/insights": "./app/pages/ops/insights/page",
  "/ops/contracts": "./app/pages/ops/contracts/page", 
  "/ops/people": "./app/pages/ops/people/page",
  "/ops/performance": "./app/pages/ops/performance/page",
  
  // Execution pages
  "/exe/value-streams": "./app/pages/exe/value-streams/page",
  "/exe/my-tickets": "./app/pages/exe/my-tickets/page",
  "/exe/service-hub": "./app/pages/services/ServicesHub",
};

// Generate page registry dynamically from config.json
function generatePageRegistry(): PageRegistry {
  const registry: PageRegistry = {};
  
  // Add default/home page
  registry.home = () => import("./app/pages/ops/people/page");
  registry.dashboard = () => import("./app/pages/ops/people/page");
  
  // Process menu items recursively
  function processMenuItems(items: any[], parentPath = "") {
    items.forEach((item) => {
      if (item.children) {
        // Process submenu items
        processMenuItems(item.children, parentPath);
      } else if (item.href) {
        // Map menu item to page component
        const pagePath = PAGE_MAPPINGS[item.href];
        if (pagePath) {
          // Create registry entries for different access patterns
          const cleanId = item.id.replace("pmbook-", "").replace(/-/g, "-");
          const hrefKey = item.href.slice(1).replace("/", "-"); // Remove leading slash, replace / with -
          
          registry[cleanId] = () => import(pagePath);
          registry[hrefKey] = () => import(pagePath);
          registry[item.id] = () => import(pagePath);
        }
      }
    });
  }
  
  processMenuItems(menuConfig);
  
  return registry;
}

// Generate component registry for direct component access
function generateComponentRegistry(): ComponentRegistry {
  return {
    // Operations components
    IntelligencePage: () => import("./app/pages/ops/insights/page"),
    ContractsPage: () => import("./app/pages/ops/contracts/page"),
    CommandCenterPage: () => import("./app/pages/ops/people/page"),
    PerformancePage: () => import("./app/pages/ops/performance/page"),
    
    // Execution components
    ValueStreamsPage: () => import("./app/pages/exe/value-streams/page"),
    MyTicketsPage: () => import("./app/pages/exe/my-tickets/page"),
    ServicesHubPage: () => import("./app/pages/services/ServicesHub"),
    
    // Legacy compatibility
    WorkDashboardPage: () => import("./app/pages/work/WorkDashboard"),
  };
}

// Export the dynamically generated registries
export const pageRegistry: PageRegistry = generatePageRegistry();
export const componentRegistry: ComponentRegistry = generateComponentRegistry();

// Export the menu configuration for platform use
export const menuConfiguration = menuConfig;

// Export pages from the pages index
export * from "./app/pages";

// Export client-safe types
export * from "./types";