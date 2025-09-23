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
  registeredApps.home = () => import("./work/tasks");

  // Static import mapping to avoid critical dependency warnings
  const staticImports: Record<string, () => Promise<{ default: any }>> = {
    "work-tasks": () => import("./work/tasks"),
    "work-tickets": () => import("./work/tickets"),
    "work-requests": () => import("./work/requests"),
    "contracts-active": () => import("./contracts/active"),
    "contracts-opportunities": () => import("./contracts/opportunities"),
    "contracts-budget": () => import("./contracts/pools"),
    "contracts-burn": () => import("./contracts/burn"),
    "people-team": () => import("./people/team"),
    "streams-overview": () => import("./streams/area"),
    "streams-catalog": () => import("./streams/catalog"),
    "people-performance": () => import("./people/performance"),
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
