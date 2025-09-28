export const config = {
  // App attributes
  slug: "pmbook",
  appName: "pmbook",
  version: "1.0.13",
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
          id: "work-tasks",
          label: "My Tasks",
          href: "/work/tasks",
          icon: "check",
          description: "Personal work queue and assignments",
        },
        {
          id: "work-tickets",
          label: "Team Tickets",
          href: "/work/tickets",
          icon: "ticket",
          description: "Cross-stream collaboration requests",
        },
        {
          id: "work-requests",
          label: "Service Requests",
          href: "/work/requests",
          icon: "help-circle",
          description: "New service requests from catalog",
        },
      ],
    },
    {
      id: "contracts",
      label: "Operations",
      icon: "file-text",
      order: 3,
      description: "Funding sources and contract management",
      children: [
        {
          id: "contracts-active",
          label: "Contracts",
          href: "/contracts/active",
          icon: "check-circle",
          description: "Current contracts and funding pools",
        },
        {
          id: "contracts-opportunities",
          label: "Opportunities",
          href: "/contracts/opportunities",
          icon: "target",
          description: "New business and proposals",
        },
        {
          id: "contracts-budget",
          label: "Pools",
          href: "/contracts/pools",
          icon: "pie-chart",
          description: "Operations, materials, and profit allocation",
        },
        {
          id: "contracts-burn",
          label: "Burn",
          href: "/contracts/burn",
          icon: "pie-chart",
          description: "Operations, materials, and profit allocation",
          requiredGroups: ["captify-admin"],
        },
        {
          id: "people-team",
          label: "People",
          href: "/people/team",
          icon: "user",
          description: "Team allocation and rates",
          requiredGroups: ["captify-admin"],
        },
      ],
    },
    {
      id: "streams",
      label: "Work Streams",
      icon: "git-branch",
      order: 4,
      description: "Functional teams and funding allocation",
      children: [
        {
          id: "streams-overview",
          label: "Functional Areas",
          href: "/streams/area",
          icon: "globe",
          description: "DevOps, DataOps, Operations teams",
        },
        {
          id: "streams-catalog",
          label: "Service Catalog",
          href: "/streams/catalog",
          icon: "book-open",
          description: "Services offered by each stream",
        },
        {
          id: "people-performance",
          label: "Performance",
          href: "/people/performance",
          icon: "trending-up",
          description: "Team metrics and utilization",
          requiredGroups: ["captify-admin"],
        },
      ],
    },
  ],

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
