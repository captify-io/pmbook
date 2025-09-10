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

// Page component imports for proper bundling
import {
  IntelligencePage,
  ContractsPage,
  CommandCenterPage,
  PerformancePage,
  ValueStreamsPage,
  MyTicketsPage,
  ServicesHubPage,
  WorkDashboardPage,
} from "./app/pages";

// Page path mapping based on config.json structure
const PAGE_MAPPINGS: Record<string, NextPageComponent> = {
  // Operations pages
  "/ops/insights": IntelligencePage,
  "/ops/contracts": ContractsPage, 
  "/ops/people": CommandCenterPage,
  "/ops/performance": PerformancePage,
  
  // Execution pages
  "/exe/value-streams": ValueStreamsPage,
  "/exe/my-tickets": MyTicketsPage,
  "/exe/service-hub": ServicesHubPage,
};

// Generate page registry dynamically from config.json
function generatePageRegistry(): PageRegistry {
  const registry: PageRegistry = {};
  
  // Add default/home page
  registry.home = async () => ({ default: CommandCenterPage });
  registry.dashboard = async () => ({ default: CommandCenterPage });
  
  // Process menu items recursively
  function processMenuItems(items: any[], parentPath = "") {
    items.forEach((item) => {
      if (item.children) {
        // Process submenu items
        processMenuItems(item.children, parentPath);
      } else if (item.href) {
        // Map menu item to page component
        const pageComponent = PAGE_MAPPINGS[item.href];
        if (pageComponent) {
          // Create registry entries for different access patterns
          const cleanId = item.id.replace("pmbook-", "").replace(/-/g, "-");
          const hrefKey = item.href.slice(1).replace("/", "-"); // Remove leading slash, replace / with -
          
          registry[cleanId] = async () => ({ default: pageComponent });
          registry[hrefKey] = async () => ({ default: pageComponent });
          registry[item.id] = async () => ({ default: pageComponent });
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
    IntelligencePage: async () => ({ default: IntelligencePage }),
    ContractsPage: async () => ({ default: ContractsPage }),
    CommandCenterPage: async () => ({ default: CommandCenterPage }),
    PerformancePage: async () => ({ default: PerformancePage }),
    
    // Execution components
    ValueStreamsPage: async () => ({ default: ValueStreamsPage }),
    MyTicketsPage: async () => ({ default: MyTicketsPage }),
    ServicesHubPage: async () => ({ default: ServicesHubPage }),
    
    // Legacy compatibility
    WorkDashboardPage: async () => ({ default: WorkDashboardPage }),
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