"use client";
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __glob = (map) => (path) => {
  var fn = map[path];
  if (fn) return fn();
  throw new Error("Module not found in bundle: " + path);
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app/pages/ops/people/page.tsx
var page_exports = {};
__export(page_exports, {
  CommandCenterPage: () => CommandCenterPage,
  default: () => page_default
});
import React, { useEffect, useState } from "react";
import { useCaptify } from "@captify-io/platform/hooks";
import { apiClient } from "@captify-io/platform/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Progress,
  Alert,
  AlertDescription,
  DynamicIcon
} from "@captify-io/platform/ui";
function CommandCenterPage() {
  const { session } = useCaptify();
  const [health, setHealth] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadDashboardData();
  }, []);
  const loadDashboardData = async () => {
    try {
      const hasAccess = session?.user?.groups?.includes("Operations");
      if (!hasAccess) {
        setLoading(false);
        return;
      }
      const [healthResponse, dashboardResponse, recsResponse] = await Promise.all([
        apiClient.run({
          service: "performance",
          operation: "getCompanyHealth"
        }),
        apiClient.run({
          service: "performance",
          operation: "getExecutiveDashboard"
        }),
        apiClient.run({
          service: "intelligence",
          operation: "getRecommendations",
          data: { role: "executive" }
        })
      ]);
      setHealth(healthResponse.data);
      setDashboard(dashboardResponse.data);
      setRecommendations(recsResponse.data || []);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center h-96" }, "Loading...");
  }
  if (!session?.user?.groups?.includes("Operations")) {
    return /* @__PURE__ */ React.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ React.createElement(Alert, null, /* @__PURE__ */ React.createElement(DynamicIcon, { name: "alert-circle", className: "h-4 w-4" }), /* @__PURE__ */ React.createElement(AlertDescription, null, "You need Operations role to view this page.")));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "container mx-auto p-6 space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold" }, "Command Center"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, "Strategic business intelligence")), /* @__PURE__ */ React.createElement(
    Badge,
    {
      variant: health?.trend === "improving" ? "default" : "destructive"
    },
    "Health Score: ",
    health?.score || 0,
    "/100"
  )), dashboard?.health?.alerts?.length > 0 && /* @__PURE__ */ React.createElement(Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(DynamicIcon, { name: "alert-circle", className: "h-4 w-4" }), /* @__PURE__ */ React.createElement(AlertDescription, null, dashboard.health.alerts[0].description)), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-sm font-medium" }, "Runway"), /* @__PURE__ */ React.createElement(DynamicIcon, { name: "clock", className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold" }, dashboard?.health?.runway?.toFixed(1) || 0, " months"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-muted-foreground" }, "Cash available"))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-sm font-medium" }, "Monthly Burn"), /* @__PURE__ */ React.createElement(DynamicIcon, { name: "dollar-sign", className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold" }, "$", (dashboard?.financial?.monthlyBurn / 1e3 || 0).toFixed(0), "k"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-xs" }, dashboard?.health?.trend === "improving" ? /* @__PURE__ */ React.createElement(DynamicIcon, { name: "trending-down", className: "h-3 w-3 text-green-500 mr-1" }) : /* @__PURE__ */ React.createElement(DynamicIcon, { name: "trending-up", className: "h-3 w-3 text-red-500 mr-1" }), /* @__PURE__ */ React.createElement("span", null, "vs last month")))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-sm font-medium" }, "Utilization"), /* @__PURE__ */ React.createElement(DynamicIcon, { name: "users", className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold" }, dashboard?.operations?.utilizationRate?.toFixed(0) || 0, "%"), /* @__PURE__ */ React.createElement(
    Progress,
    {
      value: dashboard?.operations?.utilizationRate || 0,
      className: "mt-2"
    }
  ))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-sm font-medium" }, "Profit Margin"), /* @__PURE__ */ React.createElement(DynamicIcon, { name: "target", className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold" }, dashboard?.health?.profitMargin?.toFixed(1) || 0, "%"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-muted-foreground" }, "Target: 15%")))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "Financial Forecast")), /* @__PURE__ */ React.createElement(CardContent, { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Best Case"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, "$", (dashboard?.forecast?.bestCase / 1e6 || 0).toFixed(1), "M")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Likely"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, "$", (dashboard?.forecast?.nextQuarter?.revenue / 1e6 || 0).toFixed(1), "M")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Worst Case"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, "$", (dashboard?.forecast?.worstCase / 1e6 || 0).toFixed(1), "M"))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "Operational Metrics")), /* @__PURE__ */ React.createElement(CardContent, { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Delivery Velocity"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, dashboard?.operations?.deliveryVelocity || 0, " pts/sprint")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Customer Satisfaction"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, dashboard?.operations?.customerSatisfaction?.toFixed(1) || 0, "/5")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "SLA Compliance"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, dashboard?.operations?.slaCompliance || 0, "%")))))), recommendations.length > 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(DynamicIcon, { name: "activity", className: "h-5 w-5" }), "AI Recommendations")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, recommendations.slice(0, 3).map((rec, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: "flex items-start gap-3 p-3 rounded-lg bg-muted/50"
    },
    /* @__PURE__ */ React.createElement(
      Badge,
      {
        variant: rec.priority === "high" ? "destructive" : "default"
      },
      rec.priority
    ),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-sm" }, rec.title), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, rec.action), rec.impact && /* @__PURE__ */ React.createElement("p", { className: "text-xs text-green-600 mt-1" }, "Impact: ", rec.impact))
  ))))));
}
var page_default;
var init_page = __esm({
  "src/app/pages/ops/people/page.tsx"() {
    "use client";
    page_default = CommandCenterPage;
  }
});

// src/config.ts
var config = {
  // App attributes
  slug: "pmbook",
  appName: "pmbook",
  version: "1.0.13",
  identityPoolId: typeof process !== "undefined" && process.env?.COGNITO_IDENTITY_POOL_ID || "",
  agentId: typeof process !== "undefined" && process.env?.BEDROCK_AGENT_ID || "",
  agentAliasId: typeof process !== "undefined" && process.env?.BEDROCK_AGENT_ALIAS_ID || "",
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

// src/app/pages/index.ts
function generateRegisteredApps() {
  const registeredApps2 = {};
  registeredApps2.home = () => Promise.resolve().then(() => (init_page(), page_exports)).then((m) => ({ default: m.CommandCenterPage }));
  function processMenuItems(items) {
    items.forEach((item) => {
      if (item.children) {
        processMenuItems(item.children);
      } else if (item.href && item.id) {
        const importPath = `.${item.href}/page`;
        registeredApps2[item.id] = () => import(importPath).then((m) => ({ default: m.default }));
      }
    });
  }
  processMenuItems(menu);
  return registeredApps2;
}
var registeredApps = generateRegisteredApps();

// import("./pages/**/*/page") in src/app/index.ts
var globImport_pages_page = __glob({});

// import("./pages/**/*/index") in src/app/index.ts
var globImport_pages_index = __glob({});

// src/app/index.ts
function generatePageRegistry() {
  const registry = {};
  registry.home = async () => {
    const module = await Promise.resolve().then(() => (init_page(), page_exports));
    return { default: module.CommandCenterPage };
  };
  registry.dashboard = async () => {
    const module = await Promise.resolve().then(() => (init_page(), page_exports));
    return { default: module.CommandCenterPage };
  };
  function processMenuItems(items, parentPath = "") {
    items.forEach((item) => {
      if (item.children) {
        processMenuItems(item.children, parentPath);
      } else if (item.href) {
        const importPath = item.href.replace(/^\//, "").replace(/\//g, "/");
        const cleanId = item.id.replace("pmbook-", "").replace(/-/g, "-");
        const hrefKey = item.href.slice(1).replace("/", "-");
        const dynamicImport = async () => {
          try {
            const module = await globImport_pages_page(`./pages/${importPath}/page`);
            return { default: module.default };
          } catch (error) {
            const module = await globImport_pages_index(`./pages/${importPath}/index`);
            return { default: module.default };
          }
        };
        registry[cleanId] = dynamicImport;
        registry[hrefKey] = dynamicImport;
        registry[item.id] = dynamicImport;
      }
    });
  }
  processMenuItems(menu);
  return registry;
}
var pageRegistry = generatePageRegistry();
var menuConfiguration = menu;
export {
  config,
  description,
  menuConfiguration,
  pageRegistry,
  registeredApps,
  slug
};
