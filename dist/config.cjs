"use strict";
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

// src/config.ts
var config_exports = {};
__export(config_exports, {
  agentAliasId: () => agentAliasId,
  agentId: () => agentId,
  appName: () => appName,
  config: () => config,
  default: () => config_default,
  description: () => description,
  identityPoolId: () => identityPoolId,
  menu: () => menu,
  platform: () => platform,
  slug: () => slug,
  version: () => version
});
module.exports = __toCommonJS(config_exports);
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
  // Menu structure
  menu: [
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
          href: "/ops/people",
          icon: "bar-chart",
          description: "People management"
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
          id: "pmbook-exe-value-streams",
          label: "Value Streams",
          href: "/exe/value-streams",
          icon: "check-square",
          description: "Value stream management"
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
  platform
} = config;
var config_default = config;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  agentAliasId,
  agentId,
  appName,
  config,
  description,
  identityPoolId,
  menu,
  platform,
  slug,
  version
});
