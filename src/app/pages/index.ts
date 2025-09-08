"use client";

// Export only page components that are in the menu structure
// These match the menu.json and app/index.ts pageRegistry
export { CommandCenterPage } from "./command-center/CommandCenter";
export { ContractsPage } from "./contracts/ContractsPage";
export { PerformancePage } from "./performance/PerformancePage";
export { RoadmapsPage } from "./roadmaps/RoadmapsPage";
export { WorkDashboardPage } from "./work/WorkDashboard";
export { ServicesHubPage } from "./services/ServicesHub";

// Pages not currently in menu but kept for future use:
// - StrategicPage (replaced by RoadmapsPage)
// - IntelligencePage (may be integrated later)