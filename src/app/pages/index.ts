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
  registeredApps.home = () => import("./ops/people/page").then(m => ({ default: m.CommandCenterPage }));
  
  // Process menu items to create simple lookups
  function processMenuItems(items: any[]) {
    items.forEach((item) => {
      if (item.children) {
        processMenuItems(item.children);
      } else if (item.href && item.id) {
        const importPath = `.${item.href}/page`;
        registeredApps[item.id] = () => import(importPath).then(m => ({ default: m.default }));
      }
    });
  }
  
  processMenuItems(menuConfig);
  return registeredApps;
}

export const registeredApps = generateRegisteredApps();
