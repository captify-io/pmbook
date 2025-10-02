export const config = {
  // App attributes
  slug: "pmbook",
  appName: "pmbook",
  version: "1.0.35",
  identityPoolId:
    (typeof process !== "undefined" && process.env?.COGNITO_IDENTITY_POOL_ID) ||
    "",
  agentId:
    (typeof process !== "undefined" && process.env?.BEDROCK_AGENT_ID) || "",
  agentAliasId:
    (typeof process !== "undefined" && process.env?.BEDROCK_AGENT_ALIAS_ID) ||
    "",
  description:
    "Strategic alignment and business operations platform for government contracting",

  // App-level permissions
  requiredGroups: ["captify-operations"],

  // Menu structure - funding-focused workflow
  menu: [
    {
      id: "work",
      label: "Work",
      icon: "briefcase",
      order: 1,
      description: "Service delivery and task management",
      children: [
        {
          id: "work-overview",
          label: "Overview",
          href: "/work",
          icon: "layout-dashboard",
          order: 1,
          description: "Work overview and management",
        },
        {
          id: "work-services",
          label: "Services",
          href: "/services",
          icon: "package",
          order: 2,
          description: "Service catalog and offerings",
        },
      ],
    },
    {
      id: "execution",
      label: "Execution",
      icon: "zap",
      order: 2,
      description: "Team execution and delivery",
      children: [
        {
          id: "exe-tickets",
          label: "My Tickets",
          href: "/exe/my-tickets",
          icon: "ticket",
          order: 1,
          description: "Personal ticket queue",
        },
        {
          id: "exe-streams",
          label: "Value Streams",
          href: "/exe/value-streams",
          icon: "git-branch",
          order: 2,
          description: "Value stream management",
        },
      ],
    },
    {
      id: "operations",
      label: "Operations",
      icon: "settings",
      order: 3,
      description: "Operational management and oversight",
      children: [
        {
          id: "ops-contracts",
          label: "Contracts",
          href: "/ops/contracts",
          icon: "file-text",
          order: 1,
          description: "Contract management",
        },
        {
          id: "ops-people",
          label: "People",
          href: "/ops/people",
          icon: "users",
          order: 2,
          description: "Team allocation and rates",
        },
        {
          id: "ops-performance",
          label: "Performance",
          href: "/ops/performance",
          icon: "trending-up",
          order: 3,
          description: "Team metrics and utilization",
        },
        {
          id: "ops-insights",
          label: "Insights",
          href: "/ops/insights",
          icon: "bar-chart",
          order: 4,
          description: "Analytics and insights",
        },
      ],
    },
    {
      id: "strategic",
      label: "Strategic",
      icon: "target",
      order: 4,
      description: "Strategic planning and roadmaps",
      children: [
        {
          id: "strategic-overview",
          label: "Overview",
          href: "/strategic",
          icon: "compass",
          order: 1,
          description: "Strategic overview and planning",
        },
      ],
    },
  ],

  // Functional areas / teams
  functionalAreas: [
    { id: "dataops", name: "DataOps", description: "Data engineering and analytics" },
    { id: "devops", name: "DevOps", description: "CI/CD, infrastructure automation" },
    { id: "platform", name: "Platform", description: "Core platform services and APIs" },
    { id: "cloudops", name: "CloudOps", description: "Cloud infrastructure and operations" },
    { id: "security", name: "Security", description: "Security and compliance" },
  ],

  // CLIN types supported
  clinTypes: [
    { value: "FFP", label: "Firm Fixed Price" },
    { value: "T&M", label: "Time & Materials" },
    { value: "CPFF", label: "Cost Plus Fixed Fee" },
    { value: "CPIF", label: "Cost Plus Incentive Fee" },
    { value: "FPIF", label: "Fixed Price Incentive Fee" },
  ],

  // Outcome success criteria
  outcomeMetrics: {
    primary: "delivered", // Must be delivered
    secondary: ["on-time", "on-budget", "quality"], // Bonus if achieved
  },

  // Additional platform configuration
  platform: {
    deployment: {
      dev: "localhost:3000",
      staging: "",
      production: "",
    },
  },

};

export const {
  slug,
  description,
  menu,
  appName,
  version,
  identityPoolId,
  agentId,
  agentAliasId,
  platform,
  requiredGroups,
} = config;
export default config;
