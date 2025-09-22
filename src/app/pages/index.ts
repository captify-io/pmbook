"use client";

/**
 * Simple page registry - maps IDs to dynamic imports
 * Just a lookup for apps registered in the application
 */

import { menu as menuConfig } from "../../config";

// Generate simple registry: id -> dynamic import function
function generateRegisteredApps() {
  const registeredApps: Record<string, () => Promise<{ default: any }>> = {};

  // Add home page
  registeredApps.home = () => import("./ops/people/page");

  // Static import mapping to avoid critical dependency warnings
  const staticImports: Record<string, () => Promise<{ default: any }>> = {
    "pmbook-exe-tickets": () => import("./exe/my-tickets/page"),
    "pmbook-exe-value-streams": () => import("./exe/value-streams/page"),
    "pmbook-ops-contracts": () => import("./ops/contracts/page"),
    "pmbook-ops-insights": () => import("./ops/insights/page"),
    "pmbook-ops-people": () => import("./ops/people/page"),
    "pmbook-ops-performance": () => import("./ops/performance/page"),
    "pmbook-service-hub": () => import("./services/page"),
  };

  // Process menu items to create simple lookups
  function processMenuItems(items: any[]) {
    items.forEach((item) => {
      if (item.children) {
        processMenuItems(item.children);
      } else if (item.href && item.id) {
        const staticImport = staticImports[item.id];
        if (staticImport) {
          registeredApps[item.id] = staticImport;
        }
      }
    });
  }

  processMenuItems(menuConfig);
  return registeredApps;
}

export const registeredApps = generateRegisteredApps();
