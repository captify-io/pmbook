var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/index.ts
var services_exports = {};
__export(services_exports, {
  config: () => config
});
module.exports = __toCommonJS(services_exports);

// src/config.json
var config_default = [
  {
    id: "pmbook-ops",
    label: "Operations",
    icon: "layout-dashboard",
    order: 0,
    description: "Operations command center",
    group: "OpsManager",
    role: "Admin",
    children: [
      {
        id: "pmbook-ops-insights",
        label: "Insights",
        href: "/ops/insights",
        icon: "eye",
        description: "Operational insights and analytics"
      },
      {
        id: "pmbook-ops-contracts",
        label: "Contracts",
        href: "/ops/contracts",
        icon: "file-text",
        description: "Contract management and tracking"
      },
      {
        id: "pmbook-ops-people",
        label: "People",
        href: "/ops/people]",
        icon: "bar-chart",
        description: "Peole management"
      },
      {
        id: "pmbook-ops-performance",
        label: "Performance",
        href: "/ops/performance",
        icon: "bar-chart",
        description: "Performance metrics and KPIs"
      }
    ]
  },
  {
    id: "pmbook-execution",
    label: "Execution",
    icon: "briefcase",
    order: 2,
    description: "Functional area management",
    children: [
      {
        id: "pmbook-exe-tickets",
        label: "Value Streams",
        href: "/exe/value-streams",
        icon: "check-square",
        description: "Personal work queue and tickets"
      },
      {
        id: "pmbook-exe-tickets",
        label: "My Tickets",
        href: "/exe/my-tickets",
        icon: "check-square",
        description: "Personal work queue and tickets"
      },
      {
        id: "pmbook-service-hub",
        label: "Service Hub",
        href: "/exe/service-hub",
        icon: "users",
        description: "Service catalog and team management"
      }
    ]
  }
];

// src/services/config.ts
var config = {
  // App attributes
  appName: "pmbook",
  version: "1.0.5",
  identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID || "",
  agentId: process.env.BEDROCK_AGENT_ID || "",
  agentAliasId: process.env.BEDROCK_AGENT_ALIAS_ID || "",
  description: "Strategic alignment and business operations platform for government contracting",
  // Menu structure
  menu: config_default,
  // Additional platform configuration
  platform: {
    deployment: {
      dev: "localhost:3000",
      staging: "",
      production: ""
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config
});
//# sourceMappingURL=index.cjs.map