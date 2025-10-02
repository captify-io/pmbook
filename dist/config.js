// src/config.ts
var _a, _b, _c;
var config = {
  // App attributes
  slug: "pmbook",
  appName: "pmbook",
  version: "1.0.13",
  identityPoolId: typeof process !== "undefined" && ((_a = process.env) == null ? void 0 : _a.COGNITO_IDENTITY_POOL_ID) || "",
  agentId: typeof process !== "undefined" && ((_b = process.env) == null ? void 0 : _b.BEDROCK_AGENT_ID) || "",
  agentAliasId: typeof process !== "undefined" && ((_c = process.env) == null ? void 0 : _c.BEDROCK_AGENT_ALIAS_ID) || "",
  description: "Strategic alignment and business operations platform for government contracting",
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
          href: "/",
          icon: "check",
          order: 1,
          description: "Personal work queue and assignments"
        },
        {
          id: "work-tickets",
          label: "Team Tickets",
          href: "/work/tickets",
          icon: "ticket",
          order: 2,
          description: "Cross-stream collaboration requests"
        },
        {
          id: "work-requests",
          label: "Service Requests",
          href: "/work/requests",
          icon: "help-circle",
          order: 3,
          description: "New service requests from catalog"
        }
      ]
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
          href: "/ops/contracts",
          icon: "check-circle",
          order: 1,
          description: "Current contracts and funding pools"
        },
        {
          id: "contracts-opportunities",
          label: "Opportunities",
          href: "/contracts/opportunities",
          icon: "target",
          order: 2,
          description: "New business and proposals"
        },
        {
          id: "contracts-budget",
          label: "Pools",
          href: "/contracts/pools",
          icon: "pie-chart",
          order: 3,
          description: "Operations, materials, and profit allocation"
        },
        {
          id: "contracts-burn",
          label: "Burn",
          href: "/contracts/burn",
          icon: "pie-chart",
          order: 4,
          description: "Operations, materials, and profit allocation",
          requiredGroups: ["captify-admin"]
        },
        {
          id: "people-team",
          label: "People",
          href: "/ops/people",
          icon: "user",
          order: 5,
          description: "Team allocation and rates",
          requiredGroups: ["captify-admin"]
        }
      ]
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
          order: 1,
          description: "DevOps, DataOps, Operations teams"
        },
        {
          id: "streams-catalog",
          label: "Service Catalog",
          href: "/streams/catalog",
          icon: "book-open",
          order: 2,
          description: "Services offered by each stream"
        },
        {
          id: "people-performance",
          label: "Performance",
          href: "/ops/performance",
          icon: "trending-up",
          order: 3,
          description: "Team metrics and utilization",
          requiredGroups: ["captify-admin"]
        }
      ]
    }
  ],
  // Additional platform configuration
  platform: {
    deployment: {
      dev: "localhost:3000",
      staging: "",
      production: ""
    }
  }
};
var {
  slug,
  description,
  menu,
  appName,
  version,
  identityPoolId,
  agentId,
  agentAliasId,
  platform,
  requiredGroups
} = config;
var config_default = config;
export {
  agentAliasId,
  agentId,
  appName,
  config,
  config_default as default,
  description,
  identityPoolId,
  menu,
  platform,
  requiredGroups,
  slug,
  version
};
