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
  
  // Static import mapping to avoid critical dependency warnings
  const staticImports: Record<string, () => Promise<{ default: any }>> = {
    'exe-my-tickets': () => import('./exe/my-tickets/page').then(m => ({ default: m.default })),
    'exe-value-streams': () => import('./exe/value-streams/page').then(m => ({ default: m.default })),
    'ops-contracts': () => import('./ops/contracts/page').then(m => ({ default: m.default })),
    'ops-insights': () => import('./ops/insights/page').then(m => ({ default: m.default })),
    'ops-people': () => import('./ops/people/page').then(m => ({ default: m.default })),
    'ops-performance': () => import('./ops/performance/page').then(m => ({ default: m.default })),
    'services': () => import('./services/page').then(m => ({ default: m.default })),
    'strategic': () => import('./strategic/page').then(m => ({ default: m.default })),
    'work': () => import('./work/page').then(m => ({ default: m.default })),
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
