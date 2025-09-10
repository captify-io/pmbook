"use client";

// Export only page components that are in the menu structure
// These match the config.json and app/index.ts pageRegistry

// Operations pages
export { IntelligencePage } from "./ops/insights/page";
export { default as ContractsPage } from "./ops/contracts/page";
export { CommandCenterPage } from "./ops/people/page";
export { PerformancePage } from "./ops/performance/page";

// Execution pages
export { default as ValueStreamsPage } from "./exe/value-streams/page";
export { default as MyTicketsPage } from "./exe/my-tickets/page";
export { ServicesHubPage } from "./services/ServicesHub";

// Legacy exports (to maintain compatibility)
export { WorkDashboardPage } from "./work/WorkDashboard";
