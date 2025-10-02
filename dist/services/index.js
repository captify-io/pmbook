var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

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

// src/services/index.ts
var contracts = [];
var nextId = 1;
var PMBookService = class {
  async get(endpoint) {
    if (endpoint === "/captify-pmbook-Contract") {
      return contracts;
    }
    const contractId = this.extractIdFromEndpoint(endpoint);
    if (contractId) {
      const contract = contracts.find((c) => c.id === contractId);
      if (!contract) {
        throw new Error("Contract not found");
      }
      return contract;
    }
    throw new Error("Endpoint not found");
  }
  async post(endpoint, data) {
    if (endpoint === "/captify-pmbook-Contract") {
      const contract = __spreadProps(__spreadValues({}, data), {
        id: nextId.toString(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      nextId++;
      contracts.push(contract);
      return contract;
    }
    throw new Error("Endpoint not found");
  }
  async put(endpoint, data) {
    const contractId = this.extractIdFromEndpoint(endpoint);
    if (contractId) {
      const index = contracts.findIndex((c) => c.id === contractId);
      if (index === -1) {
        throw new Error("Contract not found");
      }
      contracts[index] = __spreadProps(__spreadValues(__spreadValues({}, contracts[index]), data), {
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      return contracts[index];
    }
    throw new Error("Endpoint not found");
  }
  async delete(endpoint) {
    const contractId = this.extractIdFromEndpoint(endpoint);
    if (contractId) {
      const index = contracts.findIndex((c) => c.id === contractId);
      if (index === -1) {
        throw new Error("Contract not found");
      }
      const deleted = contracts.splice(index, 1)[0];
      return deleted;
    }
    throw new Error("Endpoint not found");
  }
  extractIdFromEndpoint(endpoint) {
    const match = endpoint.match(/\/captify-pmbook-Contract\/(.+)$/);
    return match ? match[1] : null;
  }
};
var pmBookService = new PMBookService();
var services_default = pmBookService;
var services = {
  use(serviceName) {
    switch (serviceName) {
      case "contracts":
        return {
          execute: async (body, credentials, session) => {
            try {
              const { operation, endpoint, data } = body;
              switch (operation) {
                case "get":
                  const result = await pmBookService.get(endpoint);
                  return { success: true, data: result };
                case "post":
                  const created = await pmBookService.post(endpoint, data);
                  return { success: true, data: created };
                case "put":
                  const updated = await pmBookService.put(endpoint, data);
                  return { success: true, data: updated };
                case "delete":
                  const deleted = await pmBookService.delete(endpoint);
                  return { success: true, data: deleted };
                default:
                  return { success: false, error: `Unsupported operation: ${operation}` };
              }
            } catch (error) {
              return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error"
              };
            }
          }
        };
      default:
        return null;
    }
  }
};
export {
  config,
  services_default as default,
  services
};
