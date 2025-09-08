"use client";

/**
 * @captify/pmbook/app - App configuration and registry
 *
 * This module provides page registry configuration for dynamic loading.
 * Routes must match the menu.json structure for consistency.
 */

// Export page registry with dynamic imports matching menu.json
export const pageRegistry = {
  // Main dashboard/home (default landing)
  home: () => import("./pages/command-center/CommandCenter"),
  dashboard: () => import("./pages/command-center/CommandCenter"),

  // Command Center section (Operations only)
  "command-center": () => import("./pages/command-center/CommandCenter"),
  "command-center-insights": () =>
    import("./pages/command-center/CommandCenter"),
  "command-center-contracts": () => import("./pages/contracts/ContractsPage"),
  "command-center-performance": () =>
    import("./pages/performance/PerformancePage"),

  // Roadmaps section (Strategic alignment)
  roadmaps: () => import("./pages/roadmaps/RoadmapsPage"),

  // Work Streams section
  "work-streams": () => import("./pages/work/WorkDashboard"),
  "work-streams-my-tickets": () => import("./pages/work/WorkDashboard"),
  "work-streams-service-hub": () => import("./pages/services/ServicesHub"),
};

// Export component registry with only active components
export const componentRegistry = {
  CommandCenterPage: () => import("./pages/command-center/CommandCenter"),
  ContractsPage: () => import("./pages/contracts/ContractsPage"),
  PerformancePage: () => import("./pages/performance/PerformancePage"),
  RoadmapsPage: () => import("./pages/roadmaps/RoadmapsPage"),
  WorkDashboardPage: () => import("./pages/work/WorkDashboard"),
  ServicesHubPage: () => import("./pages/services/ServicesHub"),
};

// Export pages
export * from "./pages";

// Export client-safe types
export * from "../types";
