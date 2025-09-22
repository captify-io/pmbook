var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
  default: () => page_default
});
import React, { useEffect, useState } from "react";
import { useCaptify } from "@captify-io/platform/hooks";
import { apiClient } from "@captify-io/platform/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Progress,
  Alert,
  AlertDescription
} from "@captify-io/platform/components/ui";
import { DynamicIcon } from "@captify-io/platform/components/ui";
function CommandCenterPage() {
  var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
  const { session } = useCaptify();
  const [health, setHealth] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadDashboardData();
  }, []);
  const loadDashboardData = async () => {
    var _a3, _b3;
    try {
      const hasAccess = (_b3 = (_a3 = session == null ? void 0 : session.user) == null ? void 0 : _a3.groups) == null ? void 0 : _b3.includes("Operations");
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
  if (!((_b2 = (_a2 = session == null ? void 0 : session.user) == null ? void 0 : _a2.groups) == null ? void 0 : _b2.includes("Operations"))) {
    return /* @__PURE__ */ React.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ React.createElement(Alert, null, /* @__PURE__ */ React.createElement(DynamicIcon, { name: "alert-circle", className: "h-4 w-4" }), /* @__PURE__ */ React.createElement(AlertDescription, null, "You need Operations role to view this page.")));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "container mx-auto p-6 space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold" }, "Command Center"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, "Strategic business intelligence")), /* @__PURE__ */ React.createElement(
    Badge,
    {
      variant: (health == null ? void 0 : health.trend) === "improving" ? "default" : "destructive"
    },
    "Health Score: ",
    (health == null ? void 0 : health.score) || 0,
    "/100"
  )), ((_d = (_c2 = dashboard == null ? void 0 : dashboard.health) == null ? void 0 : _c2.alerts) == null ? void 0 : _d.length) > 0 && /* @__PURE__ */ React.createElement(Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(DynamicIcon, { name: "alert-circle", className: "h-4 w-4" }), /* @__PURE__ */ React.createElement(AlertDescription, null, dashboard.health.alerts[0].description)), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-sm font-medium" }, "Runway"), /* @__PURE__ */ React.createElement(
    DynamicIcon,
    {
      name: "clock",
      className: "h-4 w-4 text-muted-foreground"
    }
  )), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold" }, ((_f = (_e = dashboard == null ? void 0 : dashboard.health) == null ? void 0 : _e.runway) == null ? void 0 : _f.toFixed(1)) || 0, " months"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-muted-foreground" }, "Cash available"))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-sm font-medium" }, "Monthly Burn"), /* @__PURE__ */ React.createElement(
    DynamicIcon,
    {
      name: "dollar-sign",
      className: "h-4 w-4 text-muted-foreground"
    }
  )), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold" }, "$", (((_g = dashboard == null ? void 0 : dashboard.financial) == null ? void 0 : _g.monthlyBurn) / 1e3 || 0).toFixed(0), "k"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-xs" }, ((_h = dashboard == null ? void 0 : dashboard.health) == null ? void 0 : _h.trend) === "improving" ? /* @__PURE__ */ React.createElement(
    DynamicIcon,
    {
      name: "trending-down",
      className: "h-3 w-3 text-green-500 mr-1"
    }
  ) : /* @__PURE__ */ React.createElement(
    DynamicIcon,
    {
      name: "trending-up",
      className: "h-3 w-3 text-red-500 mr-1"
    }
  ), /* @__PURE__ */ React.createElement("span", null, "vs last month")))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-sm font-medium" }, "Utilization"), /* @__PURE__ */ React.createElement(
    DynamicIcon,
    {
      name: "users",
      className: "h-4 w-4 text-muted-foreground"
    }
  )), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold" }, ((_j = (_i = dashboard == null ? void 0 : dashboard.operations) == null ? void 0 : _i.utilizationRate) == null ? void 0 : _j.toFixed(0)) || 0, "%"), /* @__PURE__ */ React.createElement(
    Progress,
    {
      value: ((_k = dashboard == null ? void 0 : dashboard.operations) == null ? void 0 : _k.utilizationRate) || 0,
      className: "mt-2"
    }
  ))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-sm font-medium" }, "Profit Margin"), /* @__PURE__ */ React.createElement(
    DynamicIcon,
    {
      name: "target",
      className: "h-4 w-4 text-muted-foreground"
    }
  )), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold" }, ((_m = (_l = dashboard == null ? void 0 : dashboard.health) == null ? void 0 : _l.profitMargin) == null ? void 0 : _m.toFixed(1)) || 0, "%"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-muted-foreground" }, "Target: 15%")))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "Financial Forecast")), /* @__PURE__ */ React.createElement(CardContent, { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Best Case"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, "$", (((_n = dashboard == null ? void 0 : dashboard.forecast) == null ? void 0 : _n.bestCase) / 1e6 || 0).toFixed(1), "M")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Likely"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, "$", (((_p = (_o = dashboard == null ? void 0 : dashboard.forecast) == null ? void 0 : _o.nextQuarter) == null ? void 0 : _p.revenue) / 1e6 || 0).toFixed(1), "M")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Worst Case"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, "$", (((_q = dashboard == null ? void 0 : dashboard.forecast) == null ? void 0 : _q.worstCase) / 1e6 || 0).toFixed(1), "M"))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "Operational Metrics")), /* @__PURE__ */ React.createElement(CardContent, { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Delivery Velocity"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, ((_r = dashboard == null ? void 0 : dashboard.operations) == null ? void 0 : _r.deliveryVelocity) || 0, " pts/sprint")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Customer Satisfaction"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, ((_t = (_s = dashboard == null ? void 0 : dashboard.operations) == null ? void 0 : _s.customerSatisfaction) == null ? void 0 : _t.toFixed(1)) || 0, "/5")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "SLA Compliance"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, ((_u = dashboard == null ? void 0 : dashboard.operations) == null ? void 0 : _u.slaCompliance) || 0, "%")))))), recommendations.length > 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(DynamicIcon, { name: "activity", className: "h-5 w-5" }), "AI Recommendations")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, recommendations.slice(0, 3).map((rec, idx) => /* @__PURE__ */ React.createElement(
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
    "use strict";
    "use client";
    page_default = CommandCenterPage;
  }
});

// src/app/pages/exe/my-tickets/page.tsx
var page_exports2 = {};
__export(page_exports2, {
  default: () => page_default2
});
import React2, { useEffect as useEffect2, useState as useState2 } from "react";
import { useCaptify as useCaptify2 } from "@captify-io/platform/hooks";
import { apiClient as apiClient2 } from "@captify-io/platform/lib/api";
import {
  Card as Card2,
  CardContent as CardContent2
} from "@captify-io/platform/components/ui";
function MyTicketsPage() {
  const { session } = useCaptify2();
  const [tickets, setTickets] = useState2([]);
  const [loading, setLoading] = useState2(true);
  const [filter, setFilter] = useState2("all");
  useEffect2(() => {
    loadMyTickets();
  }, [filter]);
  const loadMyTickets = async () => {
    try {
      const response = await apiClient2.run({
        service: "execution",
        operation: "getMyTickets",
        data: { filter }
      });
      setTickets(response.data || []);
    } catch (error) {
      console.error("Failed to load tickets:", error);
    } finally {
      setLoading(false);
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "text-gray-600 bg-gray-50 border-gray-200";
      case "in-progress":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "review":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "done":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };
  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });
  return /* @__PURE__ */ React2.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ React2.createElement("div", { className: "flex justify-between items-center mb-6" }, /* @__PURE__ */ React2.createElement("h1", { className: "text-3xl font-bold" }, "My Tickets"), /* @__PURE__ */ React2.createElement("div", { className: "flex gap-2" }, ["all", "todo", "in-progress", "review", "done"].map((status) => /* @__PURE__ */ React2.createElement(
    "button",
    {
      key: status,
      onClick: () => setFilter(status),
      className: `px-3 py-1 text-sm rounded-md border transition-colors ${filter === status ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`
    },
    status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
  )))), loading ? /* @__PURE__ */ React2.createElement("p", null, "Loading tickets...") : /* @__PURE__ */ React2.createElement("div", { className: "space-y-4" }, filteredTickets.length > 0 ? filteredTickets.map((ticket) => /* @__PURE__ */ React2.createElement(Card2, { key: ticket.id, className: "hover:shadow-md transition-shadow" }, /* @__PURE__ */ React2.createElement(CardContent2, { className: "pt-6" }, /* @__PURE__ */ React2.createElement("div", { className: "flex justify-between items-start mb-4" }, /* @__PURE__ */ React2.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React2.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React2.createElement("h3", { className: "font-semibold text-lg" }, ticket.title), /* @__PURE__ */ React2.createElement(
    "span",
    {
      className: `px-2 py-1 text-xs rounded-full border ${getStatusColor(
        ticket.status
      )}`
    },
    ticket.status.replace("-", " ")
  )), /* @__PURE__ */ React2.createElement("p", { className: "text-sm text-muted-foreground mb-2" }, ticket.description)), /* @__PURE__ */ React2.createElement("div", { className: "flex items-center gap-4 ml-4" }, /* @__PURE__ */ React2.createElement("div", { className: "text-right" }, /* @__PURE__ */ React2.createElement("p", { className: `text-sm font-medium ${getPriorityColor(ticket.priority)}` }, ticket.priority, " priority"), /* @__PURE__ */ React2.createElement("p", { className: "text-xs text-muted-foreground" }, "Due: ", new Date(ticket.dueDate).toLocaleDateString())))), /* @__PURE__ */ React2.createElement("div", { className: "flex justify-between items-center pt-4 border-t" }, /* @__PURE__ */ React2.createElement("div", { className: "flex gap-4 text-xs text-muted-foreground" }, /* @__PURE__ */ React2.createElement("span", null, "ID: ", ticket.id), /* @__PURE__ */ React2.createElement("span", null, "Project: ", ticket.project), /* @__PURE__ */ React2.createElement("span", null, "Assignee: ", ticket.assignee)), /* @__PURE__ */ React2.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React2.createElement("button", { className: "px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700" }, "View"), ticket.status !== "done" && /* @__PURE__ */ React2.createElement("button", { className: "px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50" }, "Update")))))) : /* @__PURE__ */ React2.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React2.createElement("p", { className: "text-muted-foreground" }, filter === "all" ? "No tickets assigned to you" : `No ${filter.replace("-", " ")} tickets`))));
}
var page_default2;
var init_page2 = __esm({
  "src/app/pages/exe/my-tickets/page.tsx"() {
    "use strict";
    "use client";
    page_default2 = MyTicketsPage;
  }
});

// src/app/pages/exe/value-streams/page.tsx
var page_exports3 = {};
__export(page_exports3, {
  default: () => page_default3
});
import React3, { useEffect as useEffect3, useState as useState3 } from "react";
import { useCaptify as useCaptify3 } from "@captify-io/platform/hooks";
import { apiClient as apiClient3 } from "@captify-io/platform/lib/api";
import {
  Card as Card3,
  CardContent as CardContent3,
  CardHeader as CardHeader3,
  CardTitle as CardTitle3
} from "@captify-io/platform/components/ui";
function ValueStreamsPage() {
  const { session } = useCaptify3();
  const [valueStreams, setValueStreams] = useState3([]);
  const [loading, setLoading] = useState3(true);
  useEffect3(() => {
    loadValueStreams();
  }, []);
  const loadValueStreams = async () => {
    try {
      const response = await apiClient3.run({
        service: "execution",
        operation: "getValueStreams",
        data: {}
      });
      setValueStreams(response.data || []);
    } catch (error) {
      console.error("Failed to load value streams:", error);
    } finally {
      setLoading(false);
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50 border-green-200";
      case "planning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "blocked":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };
  return /* @__PURE__ */ React3.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ React3.createElement("h1", { className: "text-3xl font-bold mb-6" }, "Value Streams"), loading ? /* @__PURE__ */ React3.createElement("p", null, "Loading value streams...") : /* @__PURE__ */ React3.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, valueStreams.length > 0 ? valueStreams.map((stream) => /* @__PURE__ */ React3.createElement(Card3, { key: stream.id, className: "hover:shadow-md transition-shadow" }, /* @__PURE__ */ React3.createElement(CardHeader3, null, /* @__PURE__ */ React3.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ React3.createElement(CardTitle3, { className: "text-lg" }, stream.name), /* @__PURE__ */ React3.createElement(
    "span",
    {
      className: `px-2 py-1 text-xs rounded-full border ${getStatusColor(
        stream.status
      )}`
    },
    stream.status
  ))), /* @__PURE__ */ React3.createElement(CardContent3, null, /* @__PURE__ */ React3.createElement("p", { className: "text-sm text-muted-foreground mb-4" }, stream.description), /* @__PURE__ */ React3.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React3.createElement("div", { className: "flex justify-between text-sm" }, /* @__PURE__ */ React3.createElement("span", null, "Lead Time:"), /* @__PURE__ */ React3.createElement("span", { className: "font-medium" }, stream.leadTime, "d")), /* @__PURE__ */ React3.createElement("div", { className: "flex justify-between text-sm" }, /* @__PURE__ */ React3.createElement("span", null, "Throughput:"), /* @__PURE__ */ React3.createElement("span", { className: "font-medium" }, stream.throughput, "/week")), /* @__PURE__ */ React3.createElement("div", { className: "flex justify-between text-sm" }, /* @__PURE__ */ React3.createElement("span", null, "Efficiency:"), /* @__PURE__ */ React3.createElement("span", { className: "font-medium" }, stream.efficiency, "%"))), /* @__PURE__ */ React3.createElement("div", { className: "mt-4 pt-4 border-t" }, /* @__PURE__ */ React3.createElement("p", { className: "text-xs text-muted-foreground" }, "Owner: ", stream.owner, " \u2022 Last updated: ", new Date(stream.lastUpdated).toLocaleDateString()))))) : /* @__PURE__ */ React3.createElement("div", { className: "col-span-full text-center py-12" }, /* @__PURE__ */ React3.createElement("p", { className: "text-muted-foreground" }, "No value streams configured"))));
}
var page_default3;
var init_page3 = __esm({
  "src/app/pages/exe/value-streams/page.tsx"() {
    "use strict";
    "use client";
    page_default3 = ValueStreamsPage;
  }
});

// node_modules/uuid/dist/esm/stringify.js
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
var byteToHex;
var init_stringify = __esm({
  "node_modules/uuid/dist/esm/stringify.js"() {
    "use strict";
    byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).slice(1));
    }
  }
});

// node_modules/uuid/dist/esm/rng.js
import { randomFillSync } from "crypto";
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
var rnds8Pool, poolPtr;
var init_rng = __esm({
  "node_modules/uuid/dist/esm/rng.js"() {
    "use strict";
    rnds8Pool = new Uint8Array(256);
    poolPtr = rnds8Pool.length;
  }
});

// node_modules/uuid/dist/esm/native.js
import { randomUUID } from "crypto";
var native_default;
var init_native = __esm({
  "node_modules/uuid/dist/esm/native.js"() {
    "use strict";
    native_default = { randomUUID };
  }
});

// node_modules/uuid/dist/esm/v4.js
function v4(options, buf, offset) {
  var _a2, _b2, _c2;
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = (_c2 = (_b2 = options.random) != null ? _b2 : (_a2 = options.rng) == null ? void 0 : _a2.call(options)) != null ? _c2 : rng();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default;
var init_v4 = __esm({
  "node_modules/uuid/dist/esm/v4.js"() {
    "use strict";
    init_native();
    init_rng();
    init_stringify();
    v4_default = v4;
  }
});

// node_modules/uuid/dist/esm/index.js
var init_esm = __esm({
  "node_modules/uuid/dist/esm/index.js"() {
    "use strict";
    init_v4();
  }
});

// src/app/pages/ops/contracts/form.tsx
import React4, { useState as useState4, useEffect as useEffect4 } from "react";
import { apiClient as apiClient4 } from "@captify-io/platform/lib/api";
import { cn } from "@captify-io/platform/lib/utils";
import { DynamicIcon as DynamicIcon2 } from "@captify-io/platform/components/ui";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Label,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button as Button2,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Card as Card4,
  CardHeader as CardHeader4,
  CardTitle as CardTitle4,
  CardContent as CardContent4
} from "@captify-io/platform/components/ui";
function ContractForm({
  contract,
  isOpen,
  onClose,
  onSave
}) {
  var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const getInitialFormData = () => {
    if (contract) return __spreadValues({}, contract);
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const oneYearFromNow = new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0];
    return {
      type: "FFP",
      status: "pre-award",
      contractNumber: "",
      name: "",
      customer: "",
      agency: "",
      // Financial defaults
      awardAmount: 0,
      awardDate: today,
      totalValue: 0,
      fundedValue: 0,
      burnedValue: 0,
      remainingValue: 0,
      monthlyBurnRate: 0,
      avgMonthlyBurn: 0,
      // Schedule defaults
      startDate: today,
      endDate: oneYearFromNow,
      popStart: today,
      popEnd: oneYearFromNow,
      popMonths: 12,
      // Cost breakdown defaults
      budgetedCosts: {
        direct: 0,
        indirect: 0,
        materials: 0,
        subcontracts: 0,
        profit: 0,
        total: 0
      },
      expendedCosts: {
        direct: 0,
        indirect: 0,
        materials: 0,
        subcontracts: 0,
        profit: 0,
        total: 0
      },
      // Team defaults
      programManager: "",
      technicalLead: "",
      contractingOfficer: "",
      contractingOfficerRep: "",
      teams: [],
      // Other defaults
      healthScore: 100,
      risks: [],
      cdrls: [],
      milestones: [],
      laborCategories: [],
      indirectRate: 0,
      proposalSubmitted: false
    };
  };
  const [formData, setFormData] = useState4(
    getInitialFormData()
  );
  const [loading, setLoading] = useState4(false);
  const [activeTab, setActiveTab] = useState4("info");
  const [customers, setCustomers] = useState4([
    "Department of Defense",
    "Department of State",
    "DHS",
    "NASA",
    "EPA"
  ]);
  const [agencies, setAgencies] = useState4([
    "DISA",
    "USCIS",
    "CBP",
    "CISA",
    "SPAWAR"
  ]);
  const [users, setUsers] = useState4([]);
  const [customerOpen, setCustomerOpen] = useState4(false);
  const [agencyOpen, setAgencyOpen] = useState4(false);
  const [newCustomer, setNewCustomer] = useState4("");
  const [newAgency, setNewAgency] = useState4("");
  useEffect4(() => {
    loadDropdownData();
  }, []);
  const loadDropdownData = async () => {
    try {
      const usersRes = await apiClient4.run({
        service: "user",
        operation: "listUsers"
      });
      setUsers((usersRes == null ? void 0 : usersRes.data) || []);
    } catch (error) {
      console.log("Error loading dropdown data:", error);
    }
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => __spreadProps(__spreadValues({}, prev), {
      [field]: value
    }));
  };
  const handleCostChange = (costType, field, value) => {
    setFormData((prev) => {
      const costs = __spreadValues({}, prev[costType]);
      costs[field] = value;
      costs.total = (costs.direct || 0) + (costs.indirect || 0) + (costs.materials || 0) + (costs.subcontracts || 0) + (costs.profit || 0);
      return __spreadProps(__spreadValues({}, prev), {
        [costType]: costs
      });
    });
  };
  const handleSubmit = async () => {
    var _a3, _b3;
    setLoading(true);
    try {
      const submitData = __spreadValues({}, formData);
      if (submitData.startDate && ((_a3 = submitData.expendedCosts) == null ? void 0 : _a3.total)) {
        const start = new Date(submitData.startDate);
        const now = /* @__PURE__ */ new Date();
        const monthsElapsed = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1;
        submitData.avgMonthlyBurn = submitData.expendedCosts.total / monthsElapsed;
      }
      if (submitData.totalValue && submitData.burnedValue !== void 0) {
        submitData.remainingValue = submitData.totalValue - (submitData.burnedValue || 0);
      }
      if (((_b3 = submitData.expendedCosts) == null ? void 0 : _b3.total) && !submitData.burnedValue) {
        submitData.burnedValue = submitData.expendedCosts.total;
      }
      await onSave(submitData);
      onClose();
    } catch (error) {
      console.error("Failed to save contract:", error);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ React4.createElement("div", { className: "max-w-6xl" }, /* @__PURE__ */ React4.createElement("div", { className: "flex justify-between items-center mb-6" }, /* @__PURE__ */ React4.createElement("h2", { className: "text-2xl font-bold" }, (contract == null ? void 0 : contract.id) && (contract == null ? void 0 : contract.name) ? "Edit Contract" : "New Contract")), /* @__PURE__ */ React4.createElement(Tabs, { value: activeTab, onValueChange: setActiveTab }, /* @__PURE__ */ React4.createElement(TabsList, { className: "grid w-full grid-cols-5" }, /* @__PURE__ */ React4.createElement(TabsTrigger, { value: "info" }, "Info"), /* @__PURE__ */ React4.createElement(TabsTrigger, { value: "financial" }, "Financial"), /* @__PURE__ */ React4.createElement(TabsTrigger, { value: "costs" }, "Cost Breakdown"), /* @__PURE__ */ React4.createElement(TabsTrigger, { value: "team" }, "Team"), /* @__PURE__ */ React4.createElement(TabsTrigger, { value: "documents" }, "Documents")), /* @__PURE__ */ React4.createElement(TabsContent, { value: "info", className: "space-y-4" }, /* @__PURE__ */ React4.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "contractNumber" }, "Contract Number*"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      id: "contractNumber",
      value: formData.contractNumber || "",
      onChange: (e) => handleInputChange("contractNumber", e.target.value),
      placeholder: "e.g., W15P7T-20-C-0001",
      required: true
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "name" }, "Contract Name*"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      id: "name",
      value: formData.name || "",
      onChange: (e) => handleInputChange("name", e.target.value),
      placeholder: "e.g., IT Support Services",
      required: true
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "type" }, "Contract Type*"), /* @__PURE__ */ React4.createElement(
    Select,
    {
      value: formData.type || "FFP",
      onValueChange: (value) => handleInputChange("type", value)
    },
    /* @__PURE__ */ React4.createElement(SelectTrigger, null, /* @__PURE__ */ React4.createElement(SelectValue, { placeholder: "Select type" })),
    /* @__PURE__ */ React4.createElement(SelectContent, null, /* @__PURE__ */ React4.createElement(SelectItem, { value: "FFP" }, "FFP - Firm Fixed Price"), /* @__PURE__ */ React4.createElement(SelectItem, { value: "CPFF" }, "CPFF - Cost Plus Fixed Fee"), /* @__PURE__ */ React4.createElement(SelectItem, { value: "CPIF" }, "CPIF - Cost Plus Incentive Fee"), /* @__PURE__ */ React4.createElement(SelectItem, { value: "T&M" }, "T&M - Time & Materials"), /* @__PURE__ */ React4.createElement(SelectItem, { value: "IDIQ" }, "IDIQ - Indefinite Delivery/Quantity"))
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "status" }, "Status*"), /* @__PURE__ */ React4.createElement(
    Select,
    {
      value: formData.status || "pre-award",
      onValueChange: (value) => handleInputChange("status", value)
    },
    /* @__PURE__ */ React4.createElement(SelectTrigger, null, /* @__PURE__ */ React4.createElement(SelectValue, { placeholder: "Select status" })),
    /* @__PURE__ */ React4.createElement(SelectContent, null, /* @__PURE__ */ React4.createElement(SelectItem, { value: "pre-award" }, "Pre-Award"), /* @__PURE__ */ React4.createElement(SelectItem, { value: "active" }, "Active"), /* @__PURE__ */ React4.createElement(SelectItem, { value: "option-pending" }, "Option Pending"), /* @__PURE__ */ React4.createElement(SelectItem, { value: "closing" }, "Closing"), /* @__PURE__ */ React4.createElement(SelectItem, { value: "closed" }, "Closed"))
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "customer" }, "Customer*"), /* @__PURE__ */ React4.createElement(Popover, { open: customerOpen, onOpenChange: setCustomerOpen }, /* @__PURE__ */ React4.createElement(PopoverTrigger, { asChild: true }, /* @__PURE__ */ React4.createElement(
    Button2,
    {
      variant: "outline",
      role: "combobox",
      "aria-expanded": customerOpen,
      className: "w-full justify-between"
    },
    formData.customer || "Select customer...",
    /* @__PURE__ */ React4.createElement(
      DynamicIcon2,
      {
        name: "chevrons-up-down",
        className: "ml-2 h-4 w-4 shrink-0 opacity-50"
      }
    )
  )), /* @__PURE__ */ React4.createElement(PopoverContent, { className: "w-full p-0" }, /* @__PURE__ */ React4.createElement(Command, null, /* @__PURE__ */ React4.createElement(
    CommandInput,
    {
      placeholder: "Search or add customer...",
      value: newCustomer,
      onValueChange: setNewCustomer
    }
  ), /* @__PURE__ */ React4.createElement(CommandList, null, /* @__PURE__ */ React4.createElement(CommandEmpty, null, /* @__PURE__ */ React4.createElement(
    Button2,
    {
      variant: "ghost",
      className: "w-full justify-start",
      onClick: () => {
        if (newCustomer) {
          setCustomers([...customers, newCustomer]);
          handleInputChange("customer", newCustomer);
          setCustomerOpen(false);
          setNewCustomer("");
        }
      }
    },
    /* @__PURE__ */ React4.createElement(DynamicIcon2, { name: "plus", className: "mr-2 h-4 w-4" }),
    'Add "',
    newCustomer,
    '"'
  )), /* @__PURE__ */ React4.createElement(CommandGroup, null, customers.map((customer) => /* @__PURE__ */ React4.createElement(
    CommandItem,
    {
      key: customer,
      onSelect: () => {
        handleInputChange("customer", customer);
        setCustomerOpen(false);
      }
    },
    /* @__PURE__ */ React4.createElement(
      DynamicIcon2,
      {
        name: "check",
        className: cn(
          "mr-2 h-4 w-4",
          formData.customer === customer ? "opacity-100" : "opacity-0"
        )
      }
    ),
    customer
  )))))))), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "agency" }, "Agency"), /* @__PURE__ */ React4.createElement(Popover, { open: agencyOpen, onOpenChange: setAgencyOpen }, /* @__PURE__ */ React4.createElement(PopoverTrigger, { asChild: true }, /* @__PURE__ */ React4.createElement(
    Button2,
    {
      variant: "outline",
      role: "combobox",
      "aria-expanded": agencyOpen,
      className: "w-full justify-between"
    },
    formData.agency || "Select agency...",
    /* @__PURE__ */ React4.createElement(
      DynamicIcon2,
      {
        name: "chevrons-up-down",
        className: "ml-2 h-4 w-4 shrink-0 opacity-50"
      }
    )
  )), /* @__PURE__ */ React4.createElement(PopoverContent, { className: "w-full p-0" }, /* @__PURE__ */ React4.createElement(Command, null, /* @__PURE__ */ React4.createElement(
    CommandInput,
    {
      placeholder: "Search or add agency...",
      value: newAgency,
      onValueChange: setNewAgency
    }
  ), /* @__PURE__ */ React4.createElement(CommandList, null, /* @__PURE__ */ React4.createElement(CommandEmpty, null, /* @__PURE__ */ React4.createElement(
    Button2,
    {
      variant: "ghost",
      className: "w-full justify-start",
      onClick: () => {
        if (newAgency) {
          setAgencies([...agencies, newAgency]);
          handleInputChange("agency", newAgency);
          setAgencyOpen(false);
          setNewAgency("");
        }
      }
    },
    /* @__PURE__ */ React4.createElement(DynamicIcon2, { name: "plus", className: "mr-2 h-4 w-4" }),
    'Add "',
    newAgency,
    '"'
  )), /* @__PURE__ */ React4.createElement(CommandGroup, null, agencies.map((agency) => /* @__PURE__ */ React4.createElement(
    CommandItem,
    {
      key: agency,
      onSelect: () => {
        handleInputChange("agency", agency);
        setAgencyOpen(false);
      }
    },
    /* @__PURE__ */ React4.createElement(
      DynamicIcon2,
      {
        name: "check",
        className: cn(
          "mr-2 h-4 w-4",
          formData.agency === agency ? "opacity-100" : "opacity-0"
        )
      }
    ),
    agency
  )))))))), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "startDate" }, "Start Date*"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      id: "startDate",
      type: "date",
      value: formData.startDate || "",
      onChange: (e) => {
        handleInputChange("startDate", e.target.value);
        handleInputChange("popStart", e.target.value);
        const popMonths = formData.popMonths || 12;
        const startDate = new Date(e.target.value);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + Number(popMonths));
        handleInputChange(
          "endDate",
          endDate.toISOString().split("T")[0]
        );
        handleInputChange(
          "popEnd",
          endDate.toISOString().split("T")[0]
        );
      },
      required: true
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "popMonths" }, "POP (months)*"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      id: "popMonths",
      type: "number",
      value: formData.popMonths || 12,
      onChange: (e) => {
        const months = parseInt(e.target.value) || 12;
        handleInputChange("popMonths", months);
        if (formData.startDate) {
          const startDate = new Date(formData.startDate);
          const endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + months);
          handleInputChange(
            "endDate",
            endDate.toISOString().split("T")[0]
          );
          handleInputChange(
            "popEnd",
            endDate.toISOString().split("T")[0]
          );
        }
      },
      placeholder: "12",
      required: true
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "awardAmount" }, "Award Amount*"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      id: "awardAmount",
      type: "number",
      value: formData.awardAmount || "",
      onChange: (e) => {
        const amount = parseFloat(e.target.value) || 0;
        handleInputChange("awardAmount", amount);
        if (!formData.totalValue || formData.totalValue === 0) {
          handleInputChange("totalValue", amount);
        }
        if (!formData.fundedValue || formData.fundedValue === 0) {
          handleInputChange("fundedValue", amount);
        }
      },
      placeholder: "0.00",
      required: true
    }
  )))), /* @__PURE__ */ React4.createElement(TabsContent, { value: "financial", className: "space-y-4" }, /* @__PURE__ */ React4.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "totalValue" }, "Total Contract Value"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      id: "totalValue",
      type: "number",
      value: formData.totalValue || "",
      onChange: (e) => handleInputChange("totalValue", parseFloat(e.target.value)),
      placeholder: "0.00"
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "fundedValue" }, "Funded Value"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      id: "fundedValue",
      type: "number",
      value: formData.fundedValue || "",
      onChange: (e) => handleInputChange("fundedValue", parseFloat(e.target.value)),
      placeholder: "0.00"
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "avgMonthlyBurn" }, "Average Monthly Burn"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      id: "avgMonthlyBurn",
      type: "number",
      value: formData.avgMonthlyBurn || "",
      onChange: (e) => handleInputChange(
        "avgMonthlyBurn",
        parseFloat(e.target.value)
      ),
      placeholder: "0.00"
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "indirectRate" }, "Indirect Rate (%)"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      id: "indirectRate",
      type: "number",
      value: formData.indirectRate || "",
      onChange: (e) => handleInputChange("indirectRate", parseFloat(e.target.value)),
      placeholder: "0"
    }
  )))), /* @__PURE__ */ React4.createElement(TabsContent, { value: "costs", className: "space-y-6" }, /* @__PURE__ */ React4.createElement(Card4, null, /* @__PURE__ */ React4.createElement(CardHeader4, null, /* @__PURE__ */ React4.createElement(CardTitle4, null, "Budgeted Costs")), /* @__PURE__ */ React4.createElement(CardContent4, null, /* @__PURE__ */ React4.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, null, "Direct Costs"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      type: "number",
      value: ((_a2 = formData.budgetedCosts) == null ? void 0 : _a2.direct) || 0,
      onChange: (e) => handleCostChange(
        "budgetedCosts",
        "direct",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, null, "Indirect Costs"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      type: "number",
      value: ((_b2 = formData.budgetedCosts) == null ? void 0 : _b2.indirect) || 0,
      onChange: (e) => handleCostChange(
        "budgetedCosts",
        "indirect",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, null, "Materials"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      type: "number",
      value: ((_c2 = formData.budgetedCosts) == null ? void 0 : _c2.materials) || 0,
      onChange: (e) => handleCostChange(
        "budgetedCosts",
        "materials",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, null, "Subcontracts"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      type: "number",
      value: ((_d = formData.budgetedCosts) == null ? void 0 : _d.subcontracts) || 0,
      onChange: (e) => handleCostChange(
        "budgetedCosts",
        "subcontracts",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, null, "Profit/Fee"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      type: "number",
      value: ((_e = formData.budgetedCosts) == null ? void 0 : _e.profit) || 0,
      onChange: (e) => handleCostChange(
        "budgetedCosts",
        "profit",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, null, "Total Budgeted"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      type: "number",
      value: ((_f = formData.budgetedCosts) == null ? void 0 : _f.total) || 0,
      disabled: true,
      className: "font-bold"
    }
  ))))), /* @__PURE__ */ React4.createElement(Card4, null, /* @__PURE__ */ React4.createElement(CardHeader4, null, /* @__PURE__ */ React4.createElement(CardTitle4, null, "Expended Costs")), /* @__PURE__ */ React4.createElement(CardContent4, null, /* @__PURE__ */ React4.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, null, "Direct Costs"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      type: "number",
      value: ((_g = formData.expendedCosts) == null ? void 0 : _g.direct) || 0,
      onChange: (e) => handleCostChange(
        "expendedCosts",
        "direct",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, null, "Indirect Costs"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      type: "number",
      value: ((_h = formData.expendedCosts) == null ? void 0 : _h.indirect) || 0,
      onChange: (e) => handleCostChange(
        "expendedCosts",
        "indirect",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, null, "Materials"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      type: "number",
      value: ((_i = formData.expendedCosts) == null ? void 0 : _i.materials) || 0,
      onChange: (e) => handleCostChange(
        "expendedCosts",
        "materials",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, null, "Subcontracts"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      type: "number",
      value: ((_j = formData.expendedCosts) == null ? void 0 : _j.subcontracts) || 0,
      onChange: (e) => handleCostChange(
        "expendedCosts",
        "subcontracts",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, null, "Profit/Fee"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      type: "number",
      value: ((_k = formData.expendedCosts) == null ? void 0 : _k.profit) || 0,
      onChange: (e) => handleCostChange(
        "expendedCosts",
        "profit",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, null, "Total Expended"), /* @__PURE__ */ React4.createElement(
    Input,
    {
      type: "number",
      value: ((_l = formData.expendedCosts) == null ? void 0 : _l.total) || 0,
      disabled: true,
      className: "font-bold"
    }
  )))))), /* @__PURE__ */ React4.createElement(TabsContent, { value: "team", className: "space-y-4" }, /* @__PURE__ */ React4.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "programManager" }, "Program Manager*"), /* @__PURE__ */ React4.createElement(
    Select,
    {
      value: formData.programManager || "",
      onValueChange: (value) => handleInputChange("programManager", value)
    },
    /* @__PURE__ */ React4.createElement(SelectTrigger, null, /* @__PURE__ */ React4.createElement(SelectValue, { placeholder: "Select Program Manager" })),
    /* @__PURE__ */ React4.createElement(SelectContent, null, users.length > 0 ? users.map((user) => /* @__PURE__ */ React4.createElement(
      SelectItem,
      {
        key: user.id || user.email,
        value: user.email
      },
      user.name || user.email
    )) : /* @__PURE__ */ React4.createElement(SelectItem, { value: "john.doe@example.com" }, "John Doe"))
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "technicalLead" }, "Technical Lead"), /* @__PURE__ */ React4.createElement(
    Select,
    {
      value: formData.technicalLead || "",
      onValueChange: (value) => handleInputChange("technicalLead", value)
    },
    /* @__PURE__ */ React4.createElement(SelectTrigger, null, /* @__PURE__ */ React4.createElement(SelectValue, { placeholder: "Select Technical Lead" })),
    /* @__PURE__ */ React4.createElement(SelectContent, null, users.length > 0 ? users.map((user) => /* @__PURE__ */ React4.createElement(
      SelectItem,
      {
        key: user.id || user.email,
        value: user.email
      },
      user.name || user.email
    )) : /* @__PURE__ */ React4.createElement(SelectItem, { value: "jane.smith@example.com" }, "Jane Smith"))
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "contractingOfficer" }, "Contracting Officer"), /* @__PURE__ */ React4.createElement(
    Select,
    {
      value: formData.contractingOfficer || "",
      onValueChange: (value) => handleInputChange("contractingOfficer", value)
    },
    /* @__PURE__ */ React4.createElement(SelectTrigger, null, /* @__PURE__ */ React4.createElement(SelectValue, { placeholder: "Select Contracting Officer" })),
    /* @__PURE__ */ React4.createElement(SelectContent, null, users.length > 0 ? users.map((user) => /* @__PURE__ */ React4.createElement(
      SelectItem,
      {
        key: user.id || user.email,
        value: user.email
      },
      user.name || user.email
    )) : /* @__PURE__ */ React4.createElement(SelectItem, { value: "co@agency.gov" }, "CO Name"))
  )), /* @__PURE__ */ React4.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React4.createElement(Label, { htmlFor: "contractingOfficerRep" }, "Contracting Officer Representative (COR)"), /* @__PURE__ */ React4.createElement(
    Select,
    {
      value: formData.contractingOfficerRep || "",
      onValueChange: (value) => handleInputChange("contractingOfficerRep", value)
    },
    /* @__PURE__ */ React4.createElement(SelectTrigger, null, /* @__PURE__ */ React4.createElement(SelectValue, { placeholder: "Select COR" })),
    /* @__PURE__ */ React4.createElement(SelectContent, null, users.length > 0 ? users.map((user) => /* @__PURE__ */ React4.createElement(
      SelectItem,
      {
        key: user.id || user.email,
        value: user.email
      },
      user.name || user.email
    )) : /* @__PURE__ */ React4.createElement(SelectItem, { value: "cor@agency.gov" }, "COR Name"))
  )))), /* @__PURE__ */ React4.createElement(TabsContent, { value: "documents", className: "space-y-4" }, /* @__PURE__ */ React4.createElement(Card4, null, /* @__PURE__ */ React4.createElement(CardHeader4, null, /* @__PURE__ */ React4.createElement(CardTitle4, null, "Contract Documents")), /* @__PURE__ */ React4.createElement(CardContent4, { className: "space-y-4" }, /* @__PURE__ */ React4.createElement("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center" }, /* @__PURE__ */ React4.createElement(
    DynamicIcon2,
    {
      name: "upload",
      className: "mx-auto h-12 w-12 text-gray-400"
    }
  ), /* @__PURE__ */ React4.createElement("p", { className: "mt-2 text-sm text-gray-600 font-semibold" }, "Document Upload Coming Soon"), /* @__PURE__ */ React4.createElement("p", { className: "mt-1 text-xs text-gray-500" }, "Documents will be stored in S3 and accessible to the AI agent"), /* @__PURE__ */ React4.createElement("p", { className: "mt-3 text-xs text-gray-400" }, "Supported formats: PDF, Word, Excel, PowerPoint")))))), /* @__PURE__ */ React4.createElement("div", { className: "flex justify-end gap-2 mt-6" }, /* @__PURE__ */ React4.createElement(Button2, { variant: "outline", onClick: onClose, disabled: loading }, "Cancel"), /* @__PURE__ */ React4.createElement(Button2, { onClick: handleSubmit, disabled: loading }, loading ? "Saving..." : "Save Contract")));
}
var init_form = __esm({
  "src/app/pages/ops/contracts/form.tsx"() {
    "use strict";
    "use client";
  }
});

// src/app/pages/ops/contracts/page.tsx
var page_exports4 = {};
__export(page_exports4, {
  default: () => page_default4
});
import React5, { useEffect as useEffect5, useState as useState5 } from "react";
import { apiClient as apiClient5 } from "@captify-io/platform/lib/api";
import { useCaptify as useCaptify4 } from "@captify-io/platform/hooks";
import {
  Card as Card5,
  CardContent as CardContent5,
  CardHeader as CardHeader5,
  CardTitle as CardTitle5,
  Badge as Badge2,
  Button as Button3,
  Progress as Progress2,
  Alert as Alert2,
  AlertDescription as AlertDescription2,
  Tabs as Tabs2,
  TabsContent as TabsContent2,
  TabsList as TabsList2,
  TabsTrigger as TabsTrigger2,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@captify-io/platform/components/ui";
import { DynamicIcon as DynamicIcon3 } from "@captify-io/platform/components/ui";
function ContractsPage() {
  var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
  const { session } = useCaptify4();
  const [contracts, setContracts] = useState5([]);
  const [selectedContract, setSelectedContract] = useState5(null);
  const [contractDetails, setContractDetails] = useState5(null);
  const [loading, setLoading] = useState5(true);
  const [isFormOpen, setIsFormOpen] = useState5(false);
  const [editingContract, setEditingContract] = useState5(null);
  const [filter, setFilter] = useState5("active");
  const [viewMode, setViewMode] = useState5("list");
  useEffect5(() => {
    loadContracts();
  }, []);
  useEffect5(() => {
    if (selectedContract) {
      loadContractDetails(selectedContract.id);
    }
  }, [selectedContract]);
  const loadContracts = async () => {
    try {
      const response = await apiClient5.run({
        service: "contract",
        operation: "getActiveContracts",
        app: "pmbook"
      });
      const data = (response == null ? void 0 : response.data) || [];
      setContracts(data);
      if (data.length > 0) {
        setSelectedContract(data[0]);
      }
    } catch (error) {
      console.error("Failed to load contracts:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadContractDetails = async (contractId) => {
    try {
      const [burn, cdrls, milestones, profitability] = await Promise.all([
        apiClient5.run({
          service: "contract",
          operation: "getContractBurn",
          data: { contractId },
          app: "pmbook"
        }),
        apiClient5.run({
          service: "contract",
          operation: "getCDRLStatus",
          data: { contractId },
          app: "pmbook"
        }),
        apiClient5.run({
          service: "contract",
          operation: "getMilestoneProgress",
          data: { contractId },
          app: "pmbook"
        }),
        apiClient5.run({
          service: "contract",
          operation: "calculateProfitability",
          data: { contractId },
          app: "pmbook"
        })
      ]);
      setContractDetails({ burn, cdrls, milestones, profitability });
    } catch (error) {
      console.error("Failed to load contract details:", error);
    }
  };
  const handleAddContract = () => {
    const newContract = {
      id: v4_default(),
      type: "FFP",
      status: "pre-award",
      contractNumber: "",
      name: "",
      customer: "",
      agency: "",
      awardAmount: 0,
      awardDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      totalValue: 0,
      fundedValue: 0,
      burnedValue: 0,
      remainingValue: 0,
      monthlyBurnRate: 0,
      avgMonthlyBurn: 0,
      startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0],
      popStart: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      popEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0],
      budgetedCosts: {
        direct: 0,
        indirect: 0,
        materials: 0,
        subcontracts: 0,
        profit: 0,
        total: 0
      },
      expendedCosts: {
        direct: 0,
        indirect: 0,
        materials: 0,
        subcontracts: 0,
        profit: 0,
        total: 0
      },
      programManager: "",
      technicalLead: "",
      contractingOfficer: "",
      contractingOfficerRep: "",
      teams: [],
      healthScore: 100,
      risks: [],
      cdrls: [],
      milestones: [],
      laborCategories: [],
      indirectRate: 0,
      proposalSubmitted: false
    };
    setEditingContract(newContract);
    setSelectedContract(null);
    setViewMode("form");
  };
  const handleEditContract = (contract) => {
    setEditingContract(contract);
    setSelectedContract(null);
    setViewMode("form");
  };
  const handleArchiveContract = async (contractId) => {
    try {
      await apiClient5.run({
        service: "contract",
        operation: "updateContract",
        data: {
          contractId,
          status: "closed",
          archivedAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        app: "pmbook"
      });
      await loadContracts();
    } catch (error) {
      console.error("Failed to archive contract:", error);
    }
  };
  const handleSaveContract = async (contractData) => {
    try {
      if (editingContract) {
        await apiClient5.run({
          service: "contract",
          operation: "updateContract",
          data: __spreadProps(__spreadValues({}, contractData), {
            contractId: editingContract.id
          }),
          app: "pmbook"
        });
      } else {
        await apiClient5.run({
          service: "contract",
          operation: "createContract",
          data: contractData,
          app: "pmbook"
        });
      }
      await loadContracts();
      setViewMode("list");
      setEditingContract(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to save contract:", error);
    }
  };
  const filteredContracts = (contracts || []).filter((contract) => {
    if (filter === "all") return true;
    if (filter === "active") return contract.status !== "closed";
    if (filter === "archived") return contract.status === "closed";
    return true;
  });
  const handleCancelEdit = () => {
    setViewMode("list");
    setEditingContract(null);
    setIsFormOpen(false);
    if (contracts.length > 0) {
      setSelectedContract(contracts[0]);
    }
  };
  const Breadcrumbs = () => /* @__PURE__ */ React5.createElement("div", { className: "flex items-center space-x-2 text-sm text-muted-foreground mb-4" }, /* @__PURE__ */ React5.createElement(
    "button",
    {
      onClick: () => {
        setViewMode("list");
        setEditingContract(null);
      },
      className: "hover:text-foreground transition-colors"
    },
    "Contracts"
  ), /* @__PURE__ */ React5.createElement("span", null, "/"), /* @__PURE__ */ React5.createElement("span", { className: "text-foreground" }, editingContract && contracts.some((c) => c.id === editingContract.id) ? editingContract.name || editingContract.contractNumber || "Edit Contract" : "New Contract"));
  if (loading) {
    return /* @__PURE__ */ React5.createElement("div", { className: "flex items-center justify-center h-96" }, "Loading...");
  }
  if (viewMode === "form" && editingContract) {
    return /* @__PURE__ */ React5.createElement("div", { className: "container mx-auto p-6 space-y-6" }, /* @__PURE__ */ React5.createElement(Breadcrumbs, null), /* @__PURE__ */ React5.createElement(
      ContractForm,
      {
        contract: editingContract,
        isOpen: true,
        onClose: handleCancelEdit,
        onSave: handleSaveContract
      }
    ));
  }
  return /* @__PURE__ */ React5.createElement("div", { className: "container mx-auto p-6 space-y-6" }, /* @__PURE__ */ React5.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("h1", { className: "text-3xl font-bold" }, "Contract Management"), /* @__PURE__ */ React5.createElement("p", { className: "text-muted-foreground" }, "Monitor contracts, deliverables, and financial performance")), /* @__PURE__ */ React5.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React5.createElement(Button3, { onClick: handleAddContract }, /* @__PURE__ */ React5.createElement(DynamicIcon3, { name: "plus", className: "mr-2 h-4 w-4" }), "Add Contract"))), /* @__PURE__ */ React5.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React5.createElement(
    Button3,
    {
      variant: filter === "active" ? "default" : "outline",
      size: "sm",
      onClick: () => setFilter("active")
    },
    "Active (",
    (contracts || []).filter((c) => c.status !== "closed").length,
    ")"
  ), /* @__PURE__ */ React5.createElement(
    Button3,
    {
      variant: filter === "all" ? "default" : "outline",
      size: "sm",
      onClick: () => setFilter("all")
    },
    "All (",
    (contracts || []).length,
    ")"
  ), /* @__PURE__ */ React5.createElement(
    Button3,
    {
      variant: filter === "archived" ? "default" : "outline",
      size: "sm",
      onClick: () => setFilter("archived")
    },
    "Archived (",
    (contracts || []).filter((c) => c.status === "closed").length,
    ")"
  )), /* @__PURE__ */ React5.createElement("div", { className: "flex gap-2 overflow-x-auto pb-2" }, filteredContracts.map((contract) => /* @__PURE__ */ React5.createElement(
    Button3,
    {
      key: contract.id,
      variant: (selectedContract == null ? void 0 : selectedContract.id) === contract.id ? "default" : "outline",
      onClick: () => setSelectedContract(contract),
      className: "flex-shrink-0"
    },
    /* @__PURE__ */ React5.createElement("div", { className: "text-left" }, /* @__PURE__ */ React5.createElement("div", { className: "font-medium" }, contract.contractNumber), /* @__PURE__ */ React5.createElement("div", { className: "text-xs text-muted-foreground" }, "$", (contract.totalValue / 1e6).toFixed(1), "M"))
  ))), selectedContract && /* @__PURE__ */ React5.createElement(React5.Fragment, null, /* @__PURE__ */ React5.createElement("div", { className: "flex justify-between items-center mb-4" }, /* @__PURE__ */ React5.createElement("h2", { className: "text-2xl font-semibold" }, selectedContract.name || selectedContract.contractNumber), /* @__PURE__ */ React5.createElement(DropdownMenu, null, /* @__PURE__ */ React5.createElement(DropdownMenuTrigger, { asChild: true }, /* @__PURE__ */ React5.createElement(Button3, { variant: "outline", size: "sm" }, /* @__PURE__ */ React5.createElement(DynamicIcon3, { name: "more-vertical", className: "h-4 w-4" }))), /* @__PURE__ */ React5.createElement(DropdownMenuContent, { align: "end" }, /* @__PURE__ */ React5.createElement(
    DropdownMenuItem,
    {
      onClick: () => handleEditContract(selectedContract)
    },
    /* @__PURE__ */ React5.createElement(DynamicIcon3, { name: "edit", className: "mr-2 h-4 w-4" }),
    "Edit Contract"
  ), /* @__PURE__ */ React5.createElement(
    DropdownMenuItem,
    {
      onClick: () => handleArchiveContract(selectedContract.id)
    },
    /* @__PURE__ */ React5.createElement(DynamicIcon3, { name: "archive", className: "mr-2 h-4 w-4" }),
    "Archive Contract"
  ), /* @__PURE__ */ React5.createElement(DropdownMenuItem, null, /* @__PURE__ */ React5.createElement(DynamicIcon3, { name: "download", className: "mr-2 h-4 w-4" }), "Export Data")))), /* @__PURE__ */ React5.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4" }, /* @__PURE__ */ React5.createElement(Card5, null, /* @__PURE__ */ React5.createElement(CardHeader5, { className: "pb-2" }, /* @__PURE__ */ React5.createElement(CardTitle5, { className: "text-sm" }, "Total Value")), /* @__PURE__ */ React5.createElement(CardContent5, null, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl font-bold" }, "$", (selectedContract.totalValue / 1e6).toFixed(1), "M"), /* @__PURE__ */ React5.createElement(
    Progress2,
    {
      value: selectedContract.burnedValue / selectedContract.totalValue * 100,
      className: "mt-2"
    }
  ), /* @__PURE__ */ React5.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, (selectedContract.burnedValue / selectedContract.totalValue * 100).toFixed(0), "% burned"))), /* @__PURE__ */ React5.createElement(Card5, null, /* @__PURE__ */ React5.createElement(CardHeader5, { className: "pb-2" }, /* @__PURE__ */ React5.createElement(CardTitle5, { className: "text-sm" }, "Monthly Burn")), /* @__PURE__ */ React5.createElement(CardContent5, null, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl font-bold" }, "$", (((_a2 = contractDetails == null ? void 0 : contractDetails.burn) == null ? void 0 : _a2.currentMonthBurn) / 1e3 || 0).toFixed(0), "k"), /* @__PURE__ */ React5.createElement("div", { className: "flex items-center text-xs text-muted-foreground mt-1" }, /* @__PURE__ */ React5.createElement(DynamicIcon3, { name: "trending-up", className: "h-3 w-3 mr-1" }), ((_b2 = contractDetails == null ? void 0 : contractDetails.burn) == null ? void 0 : _b2.trend) || "stable"))), /* @__PURE__ */ React5.createElement(Card5, null, /* @__PURE__ */ React5.createElement(CardHeader5, { className: "pb-2" }, /* @__PURE__ */ React5.createElement(CardTitle5, { className: "text-sm" }, "Health Score")), /* @__PURE__ */ React5.createElement(CardContent5, null, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl font-bold" }, selectedContract.healthScore, "%"), /* @__PURE__ */ React5.createElement(
    Badge2,
    {
      variant: selectedContract.healthScore > 80 ? "default" : "destructive",
      className: "mt-2"
    },
    selectedContract.healthScore > 80 ? "Healthy" : "At Risk"
  ))), /* @__PURE__ */ React5.createElement(Card5, null, /* @__PURE__ */ React5.createElement(CardHeader5, { className: "pb-2" }, /* @__PURE__ */ React5.createElement(CardTitle5, { className: "text-sm" }, "Time Remaining")), /* @__PURE__ */ React5.createElement(CardContent5, null, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl font-bold" }, Math.floor(
    (new Date(selectedContract.endDate).getTime() - Date.now()) / (1e3 * 60 * 60 * 24)
  ), " ", "days"), /* @__PURE__ */ React5.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, "Ends ", new Date(selectedContract.endDate).toLocaleDateString())))), /* @__PURE__ */ React5.createElement(Card5, null, /* @__PURE__ */ React5.createElement(CardContent5, { className: "p-0" }, /* @__PURE__ */ React5.createElement(Tabs2, { defaultValue: "cdrls" }, /* @__PURE__ */ React5.createElement(TabsList2, { className: "w-full justify-start rounded-none border-b" }, /* @__PURE__ */ React5.createElement(TabsTrigger2, { value: "cdrls" }, "CDRLs"), /* @__PURE__ */ React5.createElement(TabsTrigger2, { value: "milestones" }, "Milestones"), /* @__PURE__ */ React5.createElement(TabsTrigger2, { value: "financial" }, "Financial"), /* @__PURE__ */ React5.createElement(TabsTrigger2, { value: "team" }, "Team"), /* @__PURE__ */ React5.createElement(TabsTrigger2, { value: "strategic" }, "Strategic Goals"), /* @__PURE__ */ React5.createElement(TabsTrigger2, { value: "workstreams" }, "Work Streams")), /* @__PURE__ */ React5.createElement("div", { className: "p-6" }, /* @__PURE__ */ React5.createElement(TabsContent2, { value: "cdrls", className: "space-y-4" }, /* @__PURE__ */ React5.createElement("div", { className: "grid grid-cols-4 gap-4" }, /* @__PURE__ */ React5.createElement("div", { className: "text-center" }, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl font-bold" }, ((_d = (_c2 = contractDetails == null ? void 0 : contractDetails.cdrls) == null ? void 0 : _c2.summary) == null ? void 0 : _d.total) || 0), /* @__PURE__ */ React5.createElement("p", { className: "text-xs text-muted-foreground" }, "Total CDRLs")), /* @__PURE__ */ React5.createElement("div", { className: "text-center" }, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl font-bold text-green-600" }, ((_f = (_e = contractDetails == null ? void 0 : contractDetails.cdrls) == null ? void 0 : _e.summary) == null ? void 0 : _f.completed) || 0), /* @__PURE__ */ React5.createElement("p", { className: "text-xs text-muted-foreground" }, "Completed")), /* @__PURE__ */ React5.createElement("div", { className: "text-center" }, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl font-bold text-yellow-600" }, ((_h = (_g = contractDetails == null ? void 0 : contractDetails.cdrls) == null ? void 0 : _g.summary) == null ? void 0 : _h.pending) || 0), /* @__PURE__ */ React5.createElement("p", { className: "text-xs text-muted-foreground" }, "Pending")), /* @__PURE__ */ React5.createElement("div", { className: "text-center" }, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl font-bold text-red-600" }, ((_j = (_i = contractDetails == null ? void 0 : contractDetails.cdrls) == null ? void 0 : _i.summary) == null ? void 0 : _j.overdue) || 0), /* @__PURE__ */ React5.createElement("p", { className: "text-xs text-muted-foreground" }, "Overdue"))), /* @__PURE__ */ React5.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React5.createElement("h4", { className: "font-medium" }, "Upcoming Deadlines"), (_l = (_k = contractDetails == null ? void 0 : contractDetails.cdrls) == null ? void 0 : _k.upcoming) == null ? void 0 : _l.map((cdrl) => /* @__PURE__ */ React5.createElement(
    "div",
    {
      key: cdrl.id,
      className: "flex items-center justify-between p-3 rounded-lg border"
    },
    /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("p", { className: "font-medium" }, cdrl.number, ": ", cdrl.title), /* @__PURE__ */ React5.createElement("p", { className: "text-sm text-muted-foreground" }, cdrl.type)),
    /* @__PURE__ */ React5.createElement("div", { className: "text-right" }, /* @__PURE__ */ React5.createElement(
      Badge2,
      {
        variant: cdrl.status === "overdue" ? "destructive" : "default"
      },
      cdrl.status
    ), /* @__PURE__ */ React5.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, "Due: ", new Date(cdrl.dueDate).toLocaleDateString()))
  )))), /* @__PURE__ */ React5.createElement(TabsContent2, { value: "milestones", className: "space-y-4" }, /* @__PURE__ */ React5.createElement("div", { className: "space-y-3" }, (_n = (_m = contractDetails == null ? void 0 : contractDetails.milestones) == null ? void 0 : _m.milestones) == null ? void 0 : _n.map(
    (milestone) => /* @__PURE__ */ React5.createElement(
      "div",
      {
        key: milestone.id,
        className: "p-4 rounded-lg border"
      },
      /* @__PURE__ */ React5.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("p", { className: "font-medium" }, milestone.title), /* @__PURE__ */ React5.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, "$", (milestone.value / 1e3).toFixed(0), "k value")), /* @__PURE__ */ React5.createElement(
        Badge2,
        {
          variant: milestone.status === "complete" ? "default" : "secondary"
        },
        milestone.status
      )),
      /* @__PURE__ */ React5.createElement(
        Progress2,
        {
          value: milestone.progress || 0,
          className: "mt-3"
        }
      ),
      /* @__PURE__ */ React5.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, milestone.progress || 0, "% complete - Due", " ", new Date(milestone.dueDate).toLocaleDateString())
    )
  ))), /* @__PURE__ */ React5.createElement(TabsContent2, { value: "financial", className: "space-y-4" }, /* @__PURE__ */ React5.createElement("div", { className: "grid grid-cols-3 gap-4" }, /* @__PURE__ */ React5.createElement(Card5, null, /* @__PURE__ */ React5.createElement(CardHeader5, { className: "pb-2" }, /* @__PURE__ */ React5.createElement(CardTitle5, { className: "text-sm" }, "Profit Margin")), /* @__PURE__ */ React5.createElement(CardContent5, null, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl font-bold" }, ((_p = (_o = contractDetails == null ? void 0 : contractDetails.profitability) == null ? void 0 : _o.margin) == null ? void 0 : _p.toFixed(
    1
  )) || 0, "%"), /* @__PURE__ */ React5.createElement("p", { className: "text-xs text-muted-foreground" }, "Target: 15%"))), /* @__PURE__ */ React5.createElement(Card5, null, /* @__PURE__ */ React5.createElement(CardHeader5, { className: "pb-2" }, /* @__PURE__ */ React5.createElement(CardTitle5, { className: "text-sm" }, "Revenue")), /* @__PURE__ */ React5.createElement(CardContent5, null, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl font-bold" }, "$", (((_q = contractDetails == null ? void 0 : contractDetails.profitability) == null ? void 0 : _q.revenue) / 1e6 || 0).toFixed(1), "M"))), /* @__PURE__ */ React5.createElement(Card5, null, /* @__PURE__ */ React5.createElement(CardHeader5, { className: "pb-2" }, /* @__PURE__ */ React5.createElement(CardTitle5, { className: "text-sm" }, "Profit")), /* @__PURE__ */ React5.createElement(CardContent5, null, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl font-bold" }, "$", (((_r = contractDetails == null ? void 0 : contractDetails.profitability) == null ? void 0 : _r.profit) / 1e3 || 0).toFixed(0), "k")))), (_t = (_s = contractDetails == null ? void 0 : contractDetails.burn) == null ? void 0 : _s.recommendations) == null ? void 0 : _t.map(
    (rec, idx) => /* @__PURE__ */ React5.createElement(Alert2, { key: idx }, /* @__PURE__ */ React5.createElement(
      DynamicIcon3,
      {
        name: "alert-circle",
        className: "h-4 w-4"
      }
    ), /* @__PURE__ */ React5.createElement(AlertDescription2, null, /* @__PURE__ */ React5.createElement("strong", null, rec.message), /* @__PURE__ */ React5.createElement("br", null), rec.action))
  )), /* @__PURE__ */ React5.createElement(TabsContent2, { value: "team" }, /* @__PURE__ */ React5.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("p", { className: "text-sm font-medium" }, "Program Manager"), /* @__PURE__ */ React5.createElement("p", { className: "text-muted-foreground" }, selectedContract.programManager)), /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("p", { className: "text-sm font-medium" }, "Technical Lead"), /* @__PURE__ */ React5.createElement("p", { className: "text-muted-foreground" }, selectedContract.technicalLead || "Not assigned")), /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("p", { className: "text-sm font-medium" }, "Teams"), /* @__PURE__ */ React5.createElement("div", { className: "flex gap-2 mt-1" }, (_u = selectedContract.teams) == null ? void 0 : _u.map((team) => /* @__PURE__ */ React5.createElement(Badge2, { key: team, variant: "outline" }, team)))))), /* @__PURE__ */ React5.createElement(TabsContent2, { value: "strategic", className: "space-y-4" }, /* @__PURE__ */ React5.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React5.createElement("h4", { className: "font-medium" }, "Strategic Goals"), ((_v = selectedContract.strategicGoals) == null ? void 0 : _v.length) > 0 ? selectedContract.strategicGoals.map((goal) => /* @__PURE__ */ React5.createElement(
    "div",
    {
      key: goal.id,
      className: "p-4 rounded-lg border space-y-2"
    },
    /* @__PURE__ */ React5.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("p", { className: "font-medium" }, goal.title), /* @__PURE__ */ React5.createElement("p", { className: "text-sm text-muted-foreground" }, goal.description)), /* @__PURE__ */ React5.createElement(
      Badge2,
      {
        variant: goal.priority === "critical" ? "destructive" : goal.priority === "high" ? "default" : "secondary"
      },
      goal.priority
    )),
    /* @__PURE__ */ React5.createElement(
      Progress2,
      {
        value: goal.progress || 0,
        className: "mt-2"
      }
    ),
    /* @__PURE__ */ React5.createElement("div", { className: "flex justify-between text-xs text-muted-foreground" }, /* @__PURE__ */ React5.createElement("span", null, goal.status), /* @__PURE__ */ React5.createElement("span", null, "Target:", " ", new Date(goal.targetDate).toLocaleDateString()))
  )) : /* @__PURE__ */ React5.createElement("p", { className: "text-muted-foreground" }, "No strategic goals defined"))), /* @__PURE__ */ React5.createElement(TabsContent2, { value: "workstreams", className: "space-y-4" }, /* @__PURE__ */ React5.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React5.createElement("h4", { className: "font-medium" }, "Work Stream Allocations"), ((_w = selectedContract.workStreams) == null ? void 0 : _w.length) > 0 ? /* @__PURE__ */ React5.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, selectedContract.workStreams.map((ws) => {
    var _a3;
    return /* @__PURE__ */ React5.createElement(Card5, { key: ws.workStreamId }, /* @__PURE__ */ React5.createElement(CardHeader5, { className: "pb-2" }, /* @__PURE__ */ React5.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ React5.createElement(CardTitle5, { className: "text-sm" }, ws.workStreamName), /* @__PURE__ */ React5.createElement(Badge2, { variant: "outline" }, ws.allocation, "%"))), /* @__PURE__ */ React5.createElement(CardContent5, { className: "space-y-2" }, /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("p", { className: "text-xs font-medium" }, "Lead"), /* @__PURE__ */ React5.createElement("p", { className: "text-sm text-muted-foreground" }, ws.lead)), /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("p", { className: "text-xs font-medium" }, "Team Size"), /* @__PURE__ */ React5.createElement("p", { className: "text-sm text-muted-foreground" }, ((_a3 = ws.teamMembers) == null ? void 0 : _a3.length) || 0, " members")), /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("p", { className: "text-xs font-medium" }, "Status"), /* @__PURE__ */ React5.createElement(
      Badge2,
      {
        variant: ws.status === "active" ? "default" : "secondary",
        className: "mt-1"
      },
      ws.status
    ))));
  })) : /* @__PURE__ */ React5.createElement("p", { className: "text-muted-foreground" }, "No work stream allocations defined")))))))));
}
var page_default4;
var init_page4 = __esm({
  "src/app/pages/ops/contracts/page.tsx"() {
    "use strict";
    "use client";
    init_esm();
    init_form();
    page_default4 = ContractsPage;
  }
});

// src/app/pages/ops/insights/page.tsx
var page_exports5 = {};
__export(page_exports5, {
  default: () => page_default5
});
import React6, { useEffect as useEffect6, useState as useState6 } from "react";
import { useCaptify as useCaptify5 } from "@captify-io/platform/hooks";
import { apiClient as apiClient6 } from "@captify-io/platform/lib/api";
import {
  Card as Card6,
  CardContent as CardContent6,
  CardHeader as CardHeader6,
  CardTitle as CardTitle6
} from "@captify-io/platform/components/ui";
function InsightsPage() {
  const { session } = useCaptify5();
  const [insights, setInsights] = useState6([]);
  const [predictions, setPredictions] = useState6([]);
  const [recommendations, setRecommendations] = useState6([]);
  const [query, setQuery] = useState6("");
  const [queryResult, setQueryResult] = useState6(null);
  const [loading, setLoading] = useState6(true);
  useEffect6(() => {
    loadIntelligenceData();
  }, []);
  const loadIntelligenceData = async () => {
    try {
      const insightsResponse = await apiClient6.run({
        service: "intelligence",
        operation: "getInsights",
        data: {}
      });
      setInsights(insightsResponse.data || []);
      const predictionsResponse = await apiClient6.run({
        service: "intelligence",
        operation: "generatePredictions",
        data: { horizon: 90 }
      });
      setPredictions(predictionsResponse.data || []);
      const recommendationsResponse = await apiClient6.run({
        service: "intelligence",
        operation: "getRecommendations",
        data: {}
      });
      setRecommendations(recommendationsResponse.data || []);
    } catch (error) {
      console.error("Failed to load intelligence data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleQuery = async () => {
    if (!query.trim()) return;
    try {
      const response = await apiClient6.run({
        service: "intelligence",
        operation: "processQuery",
        data: { query }
      });
      setQueryResult(response.data);
    } catch (error) {
      console.error("Failed to process query:", error);
    }
  };
  const getInsightTypeColor = (type) => {
    switch (type) {
      case "positive":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "border-red-500 bg-red-50";
      case "high":
        return "border-orange-500 bg-orange-50";
      case "medium":
        return "border-yellow-500 bg-yellow-50";
      default:
        return "border-blue-500 bg-blue-50";
    }
  };
  return /* @__PURE__ */ React6.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ React6.createElement("h1", { className: "text-3xl font-bold mb-6" }, "AI Intelligence"), /* @__PURE__ */ React6.createElement(Card6, { className: "mb-6" }, /* @__PURE__ */ React6.createElement(CardHeader6, null, /* @__PURE__ */ React6.createElement(CardTitle6, null, "Ask the AI")), /* @__PURE__ */ React6.createElement(CardContent6, null, /* @__PURE__ */ React6.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React6.createElement(
    "input",
    {
      type: "text",
      value: query,
      onChange: (e) => setQuery(e.target.value),
      placeholder: "Ask about your business performance, risks, or opportunities...",
      className: "flex-1 px-3 py-2 border rounded-md",
      onKeyPress: (e) => e.key === "Enter" && handleQuery()
    }
  ), /* @__PURE__ */ React6.createElement(
    "button",
    {
      onClick: handleQuery,
      className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    },
    "Ask"
  )), queryResult && /* @__PURE__ */ React6.createElement("div", { className: "mt-4 p-4 bg-gray-50 rounded-md" }, /* @__PURE__ */ React6.createElement("p", { className: "font-medium" }, "Answer:"), /* @__PURE__ */ React6.createElement("p", null, queryResult.response), /* @__PURE__ */ React6.createElement("p", { className: "text-sm text-muted-foreground mt-2" }, "Confidence: ", Math.round((queryResult.confidence || 0) * 100), "%")))), /* @__PURE__ */ React6.createElement(Card6, { className: "mb-6" }, /* @__PURE__ */ React6.createElement(CardHeader6, null, /* @__PURE__ */ React6.createElement(CardTitle6, null, "Latest Insights")), /* @__PURE__ */ React6.createElement(CardContent6, null, loading ? /* @__PURE__ */ React6.createElement("p", null, "Loading insights...") : insights.length > 0 ? /* @__PURE__ */ React6.createElement("div", { className: "space-y-4" }, insights.map((insight) => /* @__PURE__ */ React6.createElement(
    "div",
    {
      key: insight.id,
      className: "border-l-4 border-blue-500 pl-4"
    },
    /* @__PURE__ */ React6.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ React6.createElement(
      "h3",
      {
        className: `font-semibold ${getInsightTypeColor(
          insight.type
        )}`
      },
      insight.title
    ), /* @__PURE__ */ React6.createElement("span", { className: "text-xs bg-gray-200 px-2 py-1 rounded" }, insight.category)),
    /* @__PURE__ */ React6.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, insight.description),
    /* @__PURE__ */ React6.createElement("p", { className: "text-xs text-muted-foreground mt-2" }, "Confidence: ", Math.round((insight.confidence || 0) * 100), "% \u2022 Impact: ", insight.impact)
  ))) : /* @__PURE__ */ React6.createElement("p", null, "No insights available"))), /* @__PURE__ */ React6.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" }, /* @__PURE__ */ React6.createElement(Card6, null, /* @__PURE__ */ React6.createElement(CardHeader6, null, /* @__PURE__ */ React6.createElement(CardTitle6, null, "Predictions")), /* @__PURE__ */ React6.createElement(CardContent6, null, loading ? /* @__PURE__ */ React6.createElement("p", null, "Loading predictions...") : predictions.length > 0 ? /* @__PURE__ */ React6.createElement("div", { className: "space-y-4" }, predictions.map((prediction) => /* @__PURE__ */ React6.createElement("div", { key: prediction.id, className: "p-3 border rounded-lg" }, /* @__PURE__ */ React6.createElement("h4", { className: "font-medium" }, prediction.metric), /* @__PURE__ */ React6.createElement("div", { className: "flex justify-between mt-2" }, /* @__PURE__ */ React6.createElement("span", { className: "text-sm" }, "Current:"), /* @__PURE__ */ React6.createElement("span", { className: "font-medium" }, typeof prediction.currentValue === "number" ? prediction.currentValue.toLocaleString() : prediction.currentValue)), /* @__PURE__ */ React6.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React6.createElement("span", { className: "text-sm" }, "Predicted:"), /* @__PURE__ */ React6.createElement("span", { className: "font-medium text-blue-600" }, typeof prediction.predictedValue === "number" ? prediction.predictedValue.toLocaleString() : prediction.predictedValue)), /* @__PURE__ */ React6.createElement("p", { className: "text-xs text-muted-foreground mt-2" }, Math.round((prediction.confidence || 0) * 100), "% confidence \u2022 ", prediction.horizon, " days")))) : /* @__PURE__ */ React6.createElement("p", null, "No predictions available"))), /* @__PURE__ */ React6.createElement(Card6, null, /* @__PURE__ */ React6.createElement(CardHeader6, null, /* @__PURE__ */ React6.createElement(CardTitle6, null, "Recommendations")), /* @__PURE__ */ React6.createElement(CardContent6, null, loading ? /* @__PURE__ */ React6.createElement("p", null, "Loading recommendations...") : recommendations.length > 0 ? /* @__PURE__ */ React6.createElement("div", { className: "space-y-4" }, recommendations.map((rec) => /* @__PURE__ */ React6.createElement(
    "div",
    {
      key: rec.id,
      className: `p-3 border-l-4 rounded ${getPriorityColor(
        rec.priority
      )}`
    },
    /* @__PURE__ */ React6.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ React6.createElement("h4", { className: "font-medium" }, rec.title), /* @__PURE__ */ React6.createElement(
      "span",
      {
        className: `text-xs px-2 py-1 rounded ${rec.priority === "critical" ? "bg-red-200 text-red-800" : rec.priority === "high" ? "bg-orange-200 text-orange-800" : rec.priority === "medium" ? "bg-yellow-200 text-yellow-800" : "bg-blue-200 text-blue-800"}`
      },
      rec.priority
    )),
    /* @__PURE__ */ React6.createElement("p", { className: "text-sm mt-1" }, rec.description),
    /* @__PURE__ */ React6.createElement("p", { className: "text-sm font-medium mt-2" }, "Action: ", rec.action),
    /* @__PURE__ */ React6.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, "Impact: ", rec.impact, " \u2022 Effort: ", rec.effort)
  ))) : /* @__PURE__ */ React6.createElement("p", null, "No recommendations available")))));
}
var page_default5;
var init_page5 = __esm({
  "src/app/pages/ops/insights/page.tsx"() {
    "use strict";
    "use client";
    page_default5 = InsightsPage;
  }
});

// src/app/pages/ops/performance/page.tsx
var page_exports6 = {};
__export(page_exports6, {
  default: () => page_default6
});
import React7, { useEffect as useEffect7, useState as useState7 } from "react";
import { useCaptify as useCaptify6 } from "@captify-io/platform/hooks";
import { apiClient as apiClient7 } from "@captify-io/platform/lib/api";
import {
  Card as Card7,
  CardContent as CardContent7,
  CardHeader as CardHeader7,
  CardTitle as CardTitle7
} from "@captify-io/platform/components/ui";
function PerformancePage() {
  var _a2, _b2, _c2;
  const { session } = useCaptify6();
  const [businessHealth, setBusinessHealth] = useState7(null);
  const [burnAnalysis, setBurnAnalysis] = useState7(null);
  const [loading, setLoading] = useState7(true);
  useEffect7(() => {
    loadPerformanceData();
  }, []);
  const loadPerformanceData = async () => {
    try {
      const healthResponse = await apiClient7.run({
        service: "performance",
        operation: "getBusinessHealth",
        data: {}
      });
      setBusinessHealth(healthResponse.data || null);
      const burnResponse = await apiClient7.run({
        service: "performance",
        operation: "calculateBurnAnalysis",
        data: { period: "month" }
      });
      setBurnAnalysis(burnResponse.data || null);
    } catch (error) {
      console.error("Failed to load performance data:", error);
    } finally {
      setLoading(false);
    }
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  };
  return /* @__PURE__ */ React7.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ React7.createElement("h1", { className: "text-3xl font-bold mb-6" }, "Performance Analytics"), /* @__PURE__ */ React7.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" }, /* @__PURE__ */ React7.createElement(Card7, null, /* @__PURE__ */ React7.createElement(CardHeader7, null, /* @__PURE__ */ React7.createElement(CardTitle7, { className: "text-sm" }, "Overall Health")), /* @__PURE__ */ React7.createElement(CardContent7, null, /* @__PURE__ */ React7.createElement("div", { className: "text-2xl font-bold text-green-600" }, loading ? "..." : (businessHealth == null ? void 0 : businessHealth.overallScore) || 0), /* @__PURE__ */ React7.createElement("p", { className: "text-xs text-muted-foreground" }, "Health Score"))), /* @__PURE__ */ React7.createElement(Card7, null, /* @__PURE__ */ React7.createElement(CardHeader7, null, /* @__PURE__ */ React7.createElement(CardTitle7, { className: "text-sm" }, "Monthly Revenue")), /* @__PURE__ */ React7.createElement(CardContent7, null, /* @__PURE__ */ React7.createElement("div", { className: "text-2xl font-bold text-blue-600" }, loading ? "..." : formatCurrency(((_a2 = businessHealth == null ? void 0 : businessHealth.financial) == null ? void 0 : _a2.revenue) || 0)), /* @__PURE__ */ React7.createElement("p", { className: "text-xs text-muted-foreground" }, "Current Month"))), /* @__PURE__ */ React7.createElement(Card7, null, /* @__PURE__ */ React7.createElement(CardHeader7, null, /* @__PURE__ */ React7.createElement(CardTitle7, { className: "text-sm" }, "Profit Margin")), /* @__PURE__ */ React7.createElement(CardContent7, null, /* @__PURE__ */ React7.createElement("div", { className: "text-2xl font-bold text-purple-600" }, loading ? "..." : `${Math.round(
    ((_b2 = businessHealth == null ? void 0 : businessHealth.financial) == null ? void 0 : _b2.profitMargin) || 0
  )}%`), /* @__PURE__ */ React7.createElement("p", { className: "text-xs text-muted-foreground" }, "Current Margin"))), /* @__PURE__ */ React7.createElement(Card7, null, /* @__PURE__ */ React7.createElement(CardHeader7, null, /* @__PURE__ */ React7.createElement(CardTitle7, { className: "text-sm" }, "Team Utilization")), /* @__PURE__ */ React7.createElement(CardContent7, null, /* @__PURE__ */ React7.createElement("div", { className: "text-2xl font-bold text-orange-600" }, loading ? "..." : `${((_c2 = businessHealth == null ? void 0 : businessHealth.employee) == null ? void 0 : _c2.utilization) || 0}%`), /* @__PURE__ */ React7.createElement("p", { className: "text-xs text-muted-foreground" }, "Current Rate")))), /* @__PURE__ */ React7.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" }, /* @__PURE__ */ React7.createElement(Card7, null, /* @__PURE__ */ React7.createElement(CardHeader7, null, /* @__PURE__ */ React7.createElement(CardTitle7, null, "Financial Health")), /* @__PURE__ */ React7.createElement(CardContent7, null, loading ? /* @__PURE__ */ React7.createElement("p", null, "Loading...") : (businessHealth == null ? void 0 : businessHealth.financial) ? /* @__PURE__ */ React7.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React7.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React7.createElement("span", null, "Revenue:"), /* @__PURE__ */ React7.createElement("span", { className: "font-medium" }, formatCurrency(businessHealth.financial.revenue))), /* @__PURE__ */ React7.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React7.createElement("span", null, "Costs:"), /* @__PURE__ */ React7.createElement("span", { className: "font-medium" }, formatCurrency(businessHealth.financial.costs))), /* @__PURE__ */ React7.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React7.createElement("span", null, "Profit:"), /* @__PURE__ */ React7.createElement("span", { className: "font-medium text-green-600" }, formatCurrency(businessHealth.financial.profit))), /* @__PURE__ */ React7.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React7.createElement("span", null, "Runway:"), /* @__PURE__ */ React7.createElement("span", { className: "font-medium" }, Math.round(businessHealth.financial.runway), " months")), /* @__PURE__ */ React7.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React7.createElement("span", null, "Backlog:"), /* @__PURE__ */ React7.createElement("span", { className: "font-medium" }, formatCurrency(businessHealth.financial.backlog)))) : /* @__PURE__ */ React7.createElement("p", null, "No financial data available"))), /* @__PURE__ */ React7.createElement(Card7, null, /* @__PURE__ */ React7.createElement(CardHeader7, null, /* @__PURE__ */ React7.createElement(CardTitle7, null, "Employee Metrics")), /* @__PURE__ */ React7.createElement(CardContent7, null, loading ? /* @__PURE__ */ React7.createElement("p", null, "Loading...") : (businessHealth == null ? void 0 : businessHealth.employee) ? /* @__PURE__ */ React7.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React7.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React7.createElement("span", null, "Headcount:"), /* @__PURE__ */ React7.createElement("span", { className: "font-medium" }, businessHealth.employee.headcount)), /* @__PURE__ */ React7.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React7.createElement("span", null, "Utilization:"), /* @__PURE__ */ React7.createElement("span", { className: "font-medium" }, businessHealth.employee.utilization, "%")), /* @__PURE__ */ React7.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React7.createElement("span", null, "Satisfaction:"), /* @__PURE__ */ React7.createElement("span", { className: "font-medium" }, businessHealth.employee.satisfaction, "/5.0")), /* @__PURE__ */ React7.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React7.createElement("span", null, "Retention:"), /* @__PURE__ */ React7.createElement("span", { className: "font-medium" }, businessHealth.employee.retention, "%")), /* @__PURE__ */ React7.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React7.createElement("span", null, "Value/Employee:"), /* @__PURE__ */ React7.createElement("span", { className: "font-medium" }, formatCurrency(businessHealth.employee.valuePerEmployee)))) : /* @__PURE__ */ React7.createElement("p", null, "No employee data available")))), /* @__PURE__ */ React7.createElement(Card7, null, /* @__PURE__ */ React7.createElement(CardHeader7, null, /* @__PURE__ */ React7.createElement(CardTitle7, null, "Monthly Burn Analysis")), /* @__PURE__ */ React7.createElement(CardContent7, null, loading ? /* @__PURE__ */ React7.createElement("p", null, "Loading...") : burnAnalysis ? /* @__PURE__ */ React7.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" }, /* @__PURE__ */ React7.createElement("div", null, /* @__PURE__ */ React7.createElement("h4", { className: "font-semibold mb-2" }, "Revenue"), /* @__PURE__ */ React7.createElement("p", { className: "text-2xl font-bold text-green-600" }, formatCurrency(burnAnalysis.revenue))), /* @__PURE__ */ React7.createElement("div", null, /* @__PURE__ */ React7.createElement("h4", { className: "font-semibold mb-2" }, "Total Costs"), /* @__PURE__ */ React7.createElement("p", { className: "text-2xl font-bold text-red-600" }, formatCurrency(burnAnalysis.totalCosts))), /* @__PURE__ */ React7.createElement("div", null, /* @__PURE__ */ React7.createElement("h4", { className: "font-semibold mb-2" }, "Net Profit"), /* @__PURE__ */ React7.createElement("p", { className: "text-2xl font-bold text-blue-600" }, formatCurrency(burnAnalysis.profit))), /* @__PURE__ */ React7.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React7.createElement("h4", { className: "font-semibold mb-2" }, "Efficiency"), /* @__PURE__ */ React7.createElement("p", { className: "text-lg" }, burnAnalysis.efficiency, "% cost efficiency"))) : /* @__PURE__ */ React7.createElement("p", null, "No burn analysis data available"))));
}
var page_default6;
var init_page6 = __esm({
  "src/app/pages/ops/performance/page.tsx"() {
    "use strict";
    "use client";
    page_default6 = PerformancePage;
  }
});

// src/app/pages/services/page.tsx
var page_exports7 = {};
__export(page_exports7, {
  default: () => page_default7
});
import React8, { useEffect as useEffect8, useState as useState8 } from "react";
import { useCaptify as useCaptify7 } from "@captify-io/platform/hooks";
import { apiClient as apiClient8 } from "@captify-io/platform/lib/api";
import {
  Card as Card8,
  CardContent as CardContent8,
  CardHeader as CardHeader8,
  CardTitle as CardTitle8,
  Badge as Badge3,
  Button as Button4,
  Input as Input2,
  Textarea,
  Select as Select2,
  SelectContent as SelectContent2,
  SelectItem as SelectItem2,
  SelectTrigger as SelectTrigger2,
  SelectValue as SelectValue2,
  Tabs as Tabs3,
  TabsContent as TabsContent3,
  TabsList as TabsList3,
  TabsTrigger as TabsTrigger3
} from "@captify-io/platform/components/ui";
import { DynamicIcon as DynamicIcon4 } from "@captify-io/platform/components/ui";
function ServicesHubPage() {
  var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
  const { session } = useCaptify7();
  const [marketplace, setMarketplace] = useState8(null);
  const [catalog, setCatalog] = useState8([]);
  const [loading, setLoading] = useState8(true);
  const [showCreateTicket, setShowCreateTicket] = useState8(false);
  const [newTicket, setNewTicket] = useState8({
    title: "",
    description: "",
    serviceArea: "DevOps",
    type: "request",
    priority: "medium",
    bounty: 0
  });
  useEffect8(() => {
    loadMarketplace();
    loadCatalog();
  }, []);
  const loadMarketplace = async () => {
    var _a3;
    try {
      const response = await apiClient8.run({
        service: "service",
        operation: "getMarketplace",
        data: { userId: (_a3 = session == null ? void 0 : session.user) == null ? void 0 : _a3.id }
      });
      setMarketplace((response == null ? void 0 : response.data) || []);
    } catch (error) {
      console.error("Failed to load marketplace:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadCatalog = async () => {
    try {
      const response = await apiClient8.run({
        service: "service",
        operation: "getServiceCatalog"
      });
      setCatalog((response == null ? void 0 : response.data) || []);
    } catch (error) {
      console.error("Failed to load catalog:", error);
    }
  };
  const createTicket = async () => {
    var _a3;
    try {
      await apiClient8.run({
        service: "service",
        operation: "createTicket",
        data: __spreadProps(__spreadValues({}, newTicket), {
          requestor: (_a3 = session == null ? void 0 : session.user) == null ? void 0 : _a3.id
        })
      });
      setShowCreateTicket(false);
      setNewTicket({
        title: "",
        description: "",
        serviceArea: "DevOps",
        type: "request",
        priority: "medium",
        bounty: 0
      });
      loadMarketplace();
    } catch (error) {
      console.error("Failed to create ticket:", error);
    }
  };
  const claimTicket = async (ticketId) => {
    var _a3;
    try {
      await apiClient8.run({
        service: "service",
        operation: "claimTicket",
        data: {
          ticketId,
          userId: (_a3 = session == null ? void 0 : session.user) == null ? void 0 : _a3.id
        }
      });
      loadMarketplace();
    } catch (error) {
      console.error("Failed to claim ticket:", error);
    }
  };
  if (loading) {
    return /* @__PURE__ */ React8.createElement("div", { className: "flex items-center justify-center h-96" }, "Loading...");
  }
  return /* @__PURE__ */ React8.createElement("div", { className: "container mx-auto p-6 space-y-6" }, /* @__PURE__ */ React8.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("h1", { className: "text-3xl font-bold" }, "Services Hub"), /* @__PURE__ */ React8.createElement("p", { className: "text-muted-foreground" }, "Internal service marketplace")), /* @__PURE__ */ React8.createElement(Button4, { onClick: () => setShowCreateTicket(true) }, /* @__PURE__ */ React8.createElement(DynamicIcon4, { name: "plus", className: "h-4 w-4 mr-2" }), "Create Ticket")), /* @__PURE__ */ React8.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4" }, /* @__PURE__ */ React8.createElement(Card8, null, /* @__PURE__ */ React8.createElement(CardHeader8, { className: "pb-2" }, /* @__PURE__ */ React8.createElement(CardTitle8, { className: "text-sm" }, "Available Tickets")), /* @__PURE__ */ React8.createElement(CardContent8, null, /* @__PURE__ */ React8.createElement("div", { className: "text-2xl font-bold" }, ((_b2 = (_a2 = marketplace == null ? void 0 : marketplace.available) == null ? void 0 : _a2.urgent) == null ? void 0 : _b2.length) + ((_d = (_c2 = marketplace == null ? void 0 : marketplace.available) == null ? void 0 : _c2.highBounty) == null ? void 0 : _d.length) || 0), /* @__PURE__ */ React8.createElement("p", { className: "text-xs text-muted-foreground" }, "$", (marketplace == null ? void 0 : marketplace.potentialEarnings) || 0, " potential"))), /* @__PURE__ */ React8.createElement(Card8, null, /* @__PURE__ */ React8.createElement(CardHeader8, { className: "pb-2" }, /* @__PURE__ */ React8.createElement(CardTitle8, { className: "text-sm" }, "My Active")), /* @__PURE__ */ React8.createElement(CardContent8, null, /* @__PURE__ */ React8.createElement("div", { className: "text-2xl font-bold" }, ((_f = (_e = marketplace == null ? void 0 : marketplace.myTickets) == null ? void 0 : _e.assigned) == null ? void 0 : _f.length) || 0), /* @__PURE__ */ React8.createElement("div", { className: "flex items-center text-xs text-muted-foreground" }, /* @__PURE__ */ React8.createElement(DynamicIcon4, { name: "clock", className: "h-3 w-3 mr-1" }), "In progress"))), /* @__PURE__ */ React8.createElement(Card8, null, /* @__PURE__ */ React8.createElement(CardHeader8, { className: "pb-2" }, /* @__PURE__ */ React8.createElement(CardTitle8, { className: "text-sm" }, "My Requests")), /* @__PURE__ */ React8.createElement(CardContent8, null, /* @__PURE__ */ React8.createElement("div", { className: "text-2xl font-bold" }, ((_h = (_g = marketplace == null ? void 0 : marketplace.myTickets) == null ? void 0 : _g.requested) == null ? void 0 : _h.length) || 0), /* @__PURE__ */ React8.createElement("div", { className: "flex items-center text-xs text-muted-foreground" }, /* @__PURE__ */ React8.createElement(DynamicIcon4, { name: "ticket", className: "h-3 w-3 mr-1" }), "Submitted"))), /* @__PURE__ */ React8.createElement(Card8, null, /* @__PURE__ */ React8.createElement(CardHeader8, { className: "pb-2" }, /* @__PURE__ */ React8.createElement(CardTitle8, { className: "text-sm" }, "Leaderboard Rank")), /* @__PURE__ */ React8.createElement(CardContent8, null, /* @__PURE__ */ React8.createElement("div", { className: "text-2xl font-bold" }, "#5"), /* @__PURE__ */ React8.createElement("div", { className: "flex items-center text-xs text-muted-foreground" }, /* @__PURE__ */ React8.createElement(DynamicIcon4, { name: "star", className: "h-3 w-3 mr-1" }), "Top performer")))), /* @__PURE__ */ React8.createElement(Card8, null, /* @__PURE__ */ React8.createElement(CardHeader8, null, /* @__PURE__ */ React8.createElement(CardTitle8, null, "Service Marketplace")), /* @__PURE__ */ React8.createElement(CardContent8, null, /* @__PURE__ */ React8.createElement(Tabs3, { defaultValue: "available" }, /* @__PURE__ */ React8.createElement(TabsList3, null, /* @__PURE__ */ React8.createElement(TabsTrigger3, { value: "available" }, "Available"), /* @__PURE__ */ React8.createElement(TabsTrigger3, { value: "mytickets" }, "My Tickets"), /* @__PURE__ */ React8.createElement(TabsTrigger3, { value: "catalog" }, "Service Catalog"), /* @__PURE__ */ React8.createElement(TabsTrigger3, { value: "leaderboard" }, "Leaderboard")), /* @__PURE__ */ React8.createElement(TabsContent3, { value: "available", className: "space-y-4" }, ((_j = (_i = marketplace == null ? void 0 : marketplace.available) == null ? void 0 : _i.urgent) == null ? void 0 : _j.length) > 0 && /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("h4", { className: "font-medium mb-3 flex items-center gap-2" }, /* @__PURE__ */ React8.createElement(Badge3, { variant: "destructive" }, "Urgent"), "High Priority Tickets"), /* @__PURE__ */ React8.createElement("div", { className: "space-y-3" }, marketplace.available.urgent.map((ticket) => /* @__PURE__ */ React8.createElement(
    TicketCard,
    {
      key: ticket.id,
      ticket,
      onClaim: claimTicket
    }
  )))), ((_l = (_k = marketplace == null ? void 0 : marketplace.available) == null ? void 0 : _k.highBounty) == null ? void 0 : _l.length) > 0 && /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("h4", { className: "font-medium mb-3 flex items-center gap-2" }, /* @__PURE__ */ React8.createElement(DynamicIcon4, { name: "dollar-sign", className: "h-4 w-4" }), "High Bounty"), /* @__PURE__ */ React8.createElement("div", { className: "space-y-3" }, marketplace.available.highBounty.map((ticket) => /* @__PURE__ */ React8.createElement(
    TicketCard,
    {
      key: ticket.id,
      ticket,
      onClaim: claimTicket
    }
  ))))), /* @__PURE__ */ React8.createElement(TabsContent3, { value: "mytickets", className: "space-y-4" }, /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("h4", { className: "font-medium mb-3" }, "Assigned to Me"), /* @__PURE__ */ React8.createElement("div", { className: "space-y-3" }, (_n = (_m = marketplace == null ? void 0 : marketplace.myTickets) == null ? void 0 : _m.assigned) == null ? void 0 : _n.map((ticket) => /* @__PURE__ */ React8.createElement(TicketCard, { key: ticket.id, ticket, assigned: true })))), /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("h4", { className: "font-medium mb-3" }, "My Requests"), /* @__PURE__ */ React8.createElement("div", { className: "space-y-3" }, (_p = (_o = marketplace == null ? void 0 : marketplace.myTickets) == null ? void 0 : _o.requested) == null ? void 0 : _p.map((ticket) => /* @__PURE__ */ React8.createElement(TicketCard, { key: ticket.id, ticket, requested: true }))))), /* @__PURE__ */ React8.createElement(TabsContent3, { value: "catalog", className: "space-y-3" }, catalog.map((service) => /* @__PURE__ */ React8.createElement("div", { key: service.id, className: "p-4 rounded-lg border" }, /* @__PURE__ */ React8.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("h4", { className: "font-medium" }, service.service), /* @__PURE__ */ React8.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, service.description), /* @__PURE__ */ React8.createElement("div", { className: "flex gap-2 mt-2" }, /* @__PURE__ */ React8.createElement(Badge3, { variant: "outline" }, service.serviceArea), /* @__PURE__ */ React8.createElement(Badge3, { variant: "outline" }, service.complexity), /* @__PURE__ */ React8.createElement(Badge3, { variant: "outline" }, service.estimatedTime, "h"))), service.selfService && /* @__PURE__ */ React8.createElement(Button4, { size: "sm" }, "Request"))))), /* @__PURE__ */ React8.createElement(TabsContent3, { value: "leaderboard" }, /* @__PURE__ */ React8.createElement("div", { className: "space-y-3" }, (_q = marketplace == null ? void 0 : marketplace.leaderboard) == null ? void 0 : _q.map((entry, idx) => /* @__PURE__ */ React8.createElement(
    "div",
    {
      key: entry.userId,
      className: "flex items-center justify-between p-4 rounded-lg border"
    },
    /* @__PURE__ */ React8.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React8.createElement("div", { className: "text-2xl font-bold" }, "#", idx + 1), /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("p", { className: "font-medium" }, entry.userId), /* @__PURE__ */ React8.createElement("p", { className: "text-sm text-muted-foreground" }, entry.ticketsResolved, " resolved"))),
    /* @__PURE__ */ React8.createElement("div", { className: "text-right" }, /* @__PURE__ */ React8.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React8.createElement(
      DynamicIcon4,
      {
        name: "star",
        className: "h-4 w-4 text-yellow-500"
      }
    ), /* @__PURE__ */ React8.createElement("span", { className: "font-medium" }, entry.satisfaction, "%")), /* @__PURE__ */ React8.createElement("p", { className: "text-sm text-muted-foreground" }, "$", entry.earnings, " earned"))
  ))))))), showCreateTicket && /* @__PURE__ */ React8.createElement("div", { className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" }, /* @__PURE__ */ React8.createElement(Card8, { className: "w-full max-w-lg" }, /* @__PURE__ */ React8.createElement(CardHeader8, null, /* @__PURE__ */ React8.createElement(CardTitle8, null, "Create Service Ticket")), /* @__PURE__ */ React8.createElement(CardContent8, { className: "space-y-4" }, /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("label", { className: "text-sm font-medium" }, "Title"), /* @__PURE__ */ React8.createElement(
    Input2,
    {
      value: newTicket.title,
      onChange: (e) => setNewTicket(__spreadProps(__spreadValues({}, newTicket), { title: e.target.value })),
      placeholder: "Brief description of what you need"
    }
  )), /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("label", { className: "text-sm font-medium" }, "Description"), /* @__PURE__ */ React8.createElement(
    Textarea,
    {
      value: newTicket.description,
      onChange: (e) => setNewTicket(__spreadProps(__spreadValues({}, newTicket), { description: e.target.value })),
      placeholder: "Detailed description and acceptance criteria",
      rows: 4
    }
  )), /* @__PURE__ */ React8.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("label", { className: "text-sm font-medium" }, "Service Area"), /* @__PURE__ */ React8.createElement(
    Select2,
    {
      value: newTicket.serviceArea,
      onValueChange: (value) => setNewTicket(__spreadProps(__spreadValues({}, newTicket), { serviceArea: value }))
    },
    /* @__PURE__ */ React8.createElement(SelectTrigger2, null, /* @__PURE__ */ React8.createElement(SelectValue2, null)),
    /* @__PURE__ */ React8.createElement(SelectContent2, null, /* @__PURE__ */ React8.createElement(SelectItem2, { value: "DevOps" }, "DevOps"), /* @__PURE__ */ React8.createElement(SelectItem2, { value: "DataOps" }, "DataOps"), /* @__PURE__ */ React8.createElement(SelectItem2, { value: "PlatformOps" }, "PlatformOps"), /* @__PURE__ */ React8.createElement(SelectItem2, { value: "HelpDesk" }, "Help Desk"), /* @__PURE__ */ React8.createElement(SelectItem2, { value: "Security" }, "Security"))
  )), /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("label", { className: "text-sm font-medium" }, "Priority"), /* @__PURE__ */ React8.createElement(
    Select2,
    {
      value: newTicket.priority,
      onValueChange: (value) => setNewTicket(__spreadProps(__spreadValues({}, newTicket), { priority: value }))
    },
    /* @__PURE__ */ React8.createElement(SelectTrigger2, null, /* @__PURE__ */ React8.createElement(SelectValue2, null)),
    /* @__PURE__ */ React8.createElement(SelectContent2, null, /* @__PURE__ */ React8.createElement(SelectItem2, { value: "low" }, "Low"), /* @__PURE__ */ React8.createElement(SelectItem2, { value: "medium" }, "Medium"), /* @__PURE__ */ React8.createElement(SelectItem2, { value: "high" }, "High"), /* @__PURE__ */ React8.createElement(SelectItem2, { value: "critical" }, "Critical"))
  ))), /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("label", { className: "text-sm font-medium" }, "Bounty (optional)"), /* @__PURE__ */ React8.createElement(
    Input2,
    {
      type: "number",
      value: newTicket.bounty,
      onChange: (e) => setNewTicket(__spreadProps(__spreadValues({}, newTicket), {
        bounty: parseInt(e.target.value) || 0
      })),
      placeholder: "Incentive amount for faster completion"
    }
  )), /* @__PURE__ */ React8.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React8.createElement(Button4, { onClick: createTicket, className: "flex-1" }, "Create Ticket"), /* @__PURE__ */ React8.createElement(
    Button4,
    {
      onClick: () => setShowCreateTicket(false),
      variant: "outline",
      className: "flex-1"
    },
    "Cancel"
  ))))));
}
function TicketCard({ ticket, onClaim, assigned, requested }) {
  return /* @__PURE__ */ React8.createElement("div", { className: "flex items-center justify-between p-4 rounded-lg border bg-card" }, /* @__PURE__ */ React8.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React8.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React8.createElement("h4", { className: "font-medium" }, ticket.title), /* @__PURE__ */ React8.createElement(
    Badge3,
    {
      variant: ticket.priority === "critical" ? "destructive" : "default"
    },
    ticket.priority
  )), /* @__PURE__ */ React8.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, ticket.description), /* @__PURE__ */ React8.createElement("div", { className: "flex items-center gap-4 mt-2" }, /* @__PURE__ */ React8.createElement(Badge3, { variant: "outline" }, ticket.serviceArea), ticket.bounty > 0 && /* @__PURE__ */ React8.createElement("div", { className: "flex items-center text-sm" }, /* @__PURE__ */ React8.createElement(DynamicIcon4, { name: "dollar-sign", className: "h-3 w-3" }), ticket.bounty), ticket.sla && /* @__PURE__ */ React8.createElement("div", { className: "flex items-center text-sm text-muted-foreground" }, /* @__PURE__ */ React8.createElement(DynamicIcon4, { name: "clock", className: "h-3 w-3 mr-1" }), "SLA: ", ticket.sla, "h"))), !assigned && !requested && onClaim && /* @__PURE__ */ React8.createElement(Button4, { onClick: () => onClaim(ticket.id), size: "sm" }, "Claim"), assigned && /* @__PURE__ */ React8.createElement(Badge3, { variant: "default" }, "In Progress"), requested && /* @__PURE__ */ React8.createElement(Badge3, { variant: "outline" }, ticket.status));
}
var page_default7;
var init_page7 = __esm({
  "src/app/pages/services/page.tsx"() {
    "use strict";
    "use client";
    page_default7 = ServicesHubPage;
  }
});

// src/app/pages/strategic/page.tsx
var page_exports8 = {};
__export(page_exports8, {
  default: () => page_default8
});
import React9, { useEffect as useEffect9, useState as useState9 } from "react";
import { useCaptify as useCaptify8 } from "@captify-io/platform/hooks";
import { apiClient as apiClient9 } from "@captify-io/platform/lib/api";
import {
  Card as Card9,
  CardContent as CardContent9,
  CardHeader as CardHeader9,
  CardTitle as CardTitle9
} from "@captify-io/platform/components/ui";
function StrategicPage() {
  const { session } = useCaptify8();
  const [objectives, setObjectives] = useState9([]);
  const [alignment, setAlignment] = useState9(null);
  const [loading, setLoading] = useState9(true);
  useEffect9(() => {
    loadStrategicData();
  }, []);
  const loadStrategicData = async () => {
    var _a2;
    try {
      const objectivesResponse = await apiClient9.run({
        service: "strategic",
        operation: "getObjectivesHierarchy",
        data: {}
      });
      setObjectives(objectivesResponse.data || []);
      const alignmentResponse = await apiClient9.run({
        service: "strategic",
        operation: "calculateAlignment",
        data: { userId: (_a2 = session == null ? void 0 : session.user) == null ? void 0 : _a2.id }
      });
      setAlignment(alignmentResponse.data || null);
    } catch (error) {
      console.error("Failed to load strategic data:", error);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ React9.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ React9.createElement("h1", { className: "text-3xl font-bold mb-6" }, "Strategic Alignment"), /* @__PURE__ */ React9.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" }, /* @__PURE__ */ React9.createElement(Card9, null, /* @__PURE__ */ React9.createElement(CardHeader9, null, /* @__PURE__ */ React9.createElement(CardTitle9, null, "Strategic Alignment Score")), /* @__PURE__ */ React9.createElement(CardContent9, null, loading ? /* @__PURE__ */ React9.createElement("p", null, "Loading...") : alignment ? /* @__PURE__ */ React9.createElement("div", null, /* @__PURE__ */ React9.createElement("div", { className: "text-3xl font-bold text-blue-600 mb-2" }, Math.round(alignment.alignmentScore), "%"), /* @__PURE__ */ React9.createElement("p", { className: "text-sm text-muted-foreground" }, alignment.strategicHours, " of ", alignment.totalHours, " hours aligned")) : /* @__PURE__ */ React9.createElement("p", null, "No alignment data available"))), /* @__PURE__ */ React9.createElement(Card9, null, /* @__PURE__ */ React9.createElement(CardHeader9, null, /* @__PURE__ */ React9.createElement(CardTitle9, null, "Work Breakdown")), /* @__PURE__ */ React9.createElement(CardContent9, null, loading ? /* @__PURE__ */ React9.createElement("p", null, "Loading...") : (alignment == null ? void 0 : alignment.workBreakdown) ? /* @__PURE__ */ React9.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React9.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React9.createElement("span", null, "Strategic:"), /* @__PURE__ */ React9.createElement("span", { className: "font-medium" }, alignment.workBreakdown.strategic)), /* @__PURE__ */ React9.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React9.createElement("span", null, "Operational:"), /* @__PURE__ */ React9.createElement("span", { className: "font-medium" }, alignment.workBreakdown.operational)), /* @__PURE__ */ React9.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React9.createElement("span", null, "Maintenance:"), /* @__PURE__ */ React9.createElement("span", { className: "font-medium" }, alignment.workBreakdown.maintenance))) : /* @__PURE__ */ React9.createElement("p", null, "No breakdown data available")))), /* @__PURE__ */ React9.createElement(Card9, null, /* @__PURE__ */ React9.createElement(CardHeader9, null, /* @__PURE__ */ React9.createElement(CardTitle9, null, "Strategic Objectives")), /* @__PURE__ */ React9.createElement(CardContent9, null, loading ? /* @__PURE__ */ React9.createElement("p", null, "Loading objectives...") : objectives.length > 0 ? /* @__PURE__ */ React9.createElement("div", { className: "space-y-4" }, objectives.map((objective) => /* @__PURE__ */ React9.createElement(
    "div",
    {
      key: objective.id,
      className: "border-l-4 border-blue-500 pl-4"
    },
    /* @__PURE__ */ React9.createElement("h3", { className: "font-semibold" }, objective.statement),
    /* @__PURE__ */ React9.createElement("p", { className: "text-sm text-muted-foreground" }, objective.vision),
    objective.children && objective.children.length > 0 && /* @__PURE__ */ React9.createElement("div", { className: "ml-4 mt-2 space-y-2" }, objective.children.map((child) => /* @__PURE__ */ React9.createElement("div", { key: child.id, className: "text-sm" }, "\u2022 ", child.statement)))
  ))) : /* @__PURE__ */ React9.createElement("p", null, "No strategic objectives defined"))));
}
var page_default8;
var init_page8 = __esm({
  "src/app/pages/strategic/page.tsx"() {
    "use strict";
    "use client";
    page_default8 = StrategicPage;
  }
});

// src/app/pages/work/page.tsx
var page_exports9 = {};
__export(page_exports9, {
  default: () => page_default9
});
import React10, { useEffect as useEffect10, useState as useState10 } from "react";
import { useCaptify as useCaptify9 } from "@captify-io/platform/hooks";
import { apiClient as apiClient10 } from "@captify-io/platform/lib/api";
import {
  Card as Card10,
  CardContent as CardContent10,
  CardHeader as CardHeader10,
  CardTitle as CardTitle10,
  Button as Button5,
  Badge as Badge4,
  Progress as Progress3,
  Tabs as Tabs4,
  TabsContent as TabsContent4,
  TabsList as TabsList4,
  TabsTrigger as TabsTrigger4
} from "@captify-io/platform/components/ui";
import { DynamicIcon as DynamicIcon5 } from "@captify-io/platform/components/ui";
function WorkDashboardPage() {
  var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i;
  const { session } = useCaptify9();
  const [activeWork, setActiveWork] = useState10(null);
  const [workQueue, setWorkQueue] = useState10(null);
  const [productivity, setProductivity] = useState10(null);
  const [loading, setLoading] = useState10(true);
  const [timer, setTimer] = useState10(0);
  useEffect10(() => {
    loadWorkData();
    const interval = setInterval(() => {
      if (activeWork) {
        setTimer((prev) => prev + 1);
      }
    }, 1e3);
    return () => clearInterval(interval);
  }, [activeWork]);
  const loadWorkData = async () => {
    var _a3, _b3;
    try {
      const [queueData, prodData] = await Promise.all([
        apiClient10.run({
          service: "work",
          operation: "getWorkQueue",
          data: { userId: (_a3 = session == null ? void 0 : session.user) == null ? void 0 : _a3.id }
        }),
        apiClient10.run({
          service: "work",
          operation: "calculateProductivity",
          data: { userId: (_b3 = session == null ? void 0 : session.user) == null ? void 0 : _b3.id, period: "daily" }
        })
      ]);
      setWorkQueue(queueData);
      setProductivity(prodData);
    } catch (error) {
      console.error("Failed to load work data:", error);
    } finally {
      setLoading(false);
    }
  };
  const startWork = async (workItem) => {
    var _a3;
    try {
      const workSession = await apiClient10.run({
        service: "work",
        operation: "startWork",
        data: {
          userId: (_a3 = session == null ? void 0 : session.user) == null ? void 0 : _a3.id,
          workItemId: workItem.id
        }
      });
      setActiveWork(workItem);
      setTimer(0);
    } catch (error) {
      console.error("Failed to start work:", error);
    }
  };
  const stopWork = async () => {
    var _a3;
    try {
      await apiClient10.run({
        service: "work",
        operation: "stopActiveWork",
        data: { userId: (_a3 = session == null ? void 0 : session.user) == null ? void 0 : _a3.id }
      });
      setActiveWork(null);
      setTimer(0);
      loadWorkData();
    } catch (error) {
      console.error("Failed to stop work:", error);
    }
  };
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };
  if (loading) {
    return /* @__PURE__ */ React10.createElement("div", { className: "flex items-center justify-center h-96" }, "Loading...");
  }
  return /* @__PURE__ */ React10.createElement("div", { className: "container mx-auto p-6 space-y-6" }, /* @__PURE__ */ React10.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement("h1", { className: "text-3xl font-bold" }, "My Work"), /* @__PURE__ */ React10.createElement("p", { className: "text-muted-foreground" }, "Focus on value delivery"))), activeWork ? /* @__PURE__ */ React10.createElement(Card10, { className: "border-primary" }, /* @__PURE__ */ React10.createElement(CardHeader10, null, /* @__PURE__ */ React10.createElement(CardTitle10, { className: "flex items-center justify-between" }, /* @__PURE__ */ React10.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ React10.createElement(DynamicIcon5, { name: "play", className: "h-5 w-5 text-green-500" }), "Current Focus"), /* @__PURE__ */ React10.createElement(Badge4, { variant: "default" }, formatTime(timer)))), /* @__PURE__ */ React10.createElement(CardContent10, { className: "space-y-4" }, /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement("h3", { className: "font-semibold text-lg" }, activeWork.title), /* @__PURE__ */ React10.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, activeWork.description)), /* @__PURE__ */ React10.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React10.createElement(Badge4, null, activeWork.type), /* @__PURE__ */ React10.createElement(Badge4, { variant: "outline" }, "Value: ", activeWork.valueScore, "/10"), /* @__PURE__ */ React10.createElement(Badge4, { variant: "outline" }, activeWork.complexity)), /* @__PURE__ */ React10.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React10.createElement(
    Button5,
    {
      onClick: stopWork,
      variant: "destructive",
      className: "flex-1"
    },
    /* @__PURE__ */ React10.createElement(DynamicIcon5, { name: "pause", className: "h-4 w-4 mr-2" }),
    "Stop Work"
  ), /* @__PURE__ */ React10.createElement(
    Button5,
    {
      onClick: () => stopWork(),
      variant: "default",
      className: "flex-1"
    },
    /* @__PURE__ */ React10.createElement(DynamicIcon5, { name: "check-circle", className: "h-4 w-4 mr-2" }),
    "Complete"
  )))) : /* @__PURE__ */ React10.createElement(Card10, null, /* @__PURE__ */ React10.createElement(CardHeader10, null, /* @__PURE__ */ React10.createElement(CardTitle10, null, "Ready to Work")), /* @__PURE__ */ React10.createElement(CardContent10, null, /* @__PURE__ */ React10.createElement("p", { className: "text-muted-foreground" }, "Select a work item below to start tracking"))), /* @__PURE__ */ React10.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4" }, /* @__PURE__ */ React10.createElement(Card10, null, /* @__PURE__ */ React10.createElement(CardHeader10, { className: "pb-2" }, /* @__PURE__ */ React10.createElement(CardTitle10, { className: "text-sm" }, "Today's Progress")), /* @__PURE__ */ React10.createElement(CardContent10, null, /* @__PURE__ */ React10.createElement("div", { className: "text-2xl font-bold" }, ((_a2 = productivity == null ? void 0 : productivity.totalHours) == null ? void 0 : _a2.toFixed(1)) || 0, "h"), /* @__PURE__ */ React10.createElement(
    Progress3,
    {
      value: (productivity == null ? void 0 : productivity.totalHours) / 8 * 100 || 0,
      className: "mt-2"
    }
  ))), /* @__PURE__ */ React10.createElement(Card10, null, /* @__PURE__ */ React10.createElement(CardHeader10, { className: "pb-2" }, /* @__PURE__ */ React10.createElement(CardTitle10, { className: "text-sm" }, "Value Delivered")), /* @__PURE__ */ React10.createElement(CardContent10, null, /* @__PURE__ */ React10.createElement("div", { className: "text-2xl font-bold" }, "$", ((productivity == null ? void 0 : productivity.totalValue) || 0).toLocaleString()), /* @__PURE__ */ React10.createElement("p", { className: "text-xs text-muted-foreground" }, "ROI: ", ((_b2 = productivity == null ? void 0 : productivity.valuePerHour) == null ? void 0 : _b2.toFixed(0)) || 0, "/hr"))), /* @__PURE__ */ React10.createElement(Card10, null, /* @__PURE__ */ React10.createElement(CardHeader10, { className: "pb-2" }, /* @__PURE__ */ React10.createElement(CardTitle10, { className: "text-sm" }, "Strategic Alignment")), /* @__PURE__ */ React10.createElement(CardContent10, null, /* @__PURE__ */ React10.createElement("div", { className: "text-2xl font-bold" }, ((_c2 = productivity == null ? void 0 : productivity.strategicAlignment) == null ? void 0 : _c2.toFixed(0)) || 0, "%"), /* @__PURE__ */ React10.createElement("div", { className: "flex items-center text-xs text-muted-foreground" }, /* @__PURE__ */ React10.createElement(DynamicIcon5, { name: "target", className: "h-3 w-3 mr-1" }), "On critical path"))), /* @__PURE__ */ React10.createElement(Card10, null, /* @__PURE__ */ React10.createElement(CardHeader10, { className: "pb-2" }, /* @__PURE__ */ React10.createElement(CardTitle10, { className: "text-sm" }, "Focus Time")), /* @__PURE__ */ React10.createElement(CardContent10, null, /* @__PURE__ */ React10.createElement("div", { className: "text-2xl font-bold" }, ((_d = productivity == null ? void 0 : productivity.focusTime) == null ? void 0 : _d.toFixed(1)) || 0, "h"), /* @__PURE__ */ React10.createElement("div", { className: "flex items-center text-xs text-muted-foreground" }, /* @__PURE__ */ React10.createElement(DynamicIcon5, { name: "zap", className: "h-3 w-3 mr-1" }), "Deep work")))), /* @__PURE__ */ React10.createElement(Card10, null, /* @__PURE__ */ React10.createElement(CardHeader10, null, /* @__PURE__ */ React10.createElement(CardTitle10, null, "Work Queue")), /* @__PURE__ */ React10.createElement(CardContent10, null, /* @__PURE__ */ React10.createElement(Tabs4, { defaultValue: "recommended" }, /* @__PURE__ */ React10.createElement(TabsList4, { className: "grid w-full grid-cols-5" }, /* @__PURE__ */ React10.createElement(TabsTrigger4, { value: "recommended" }, "Recommended"), /* @__PURE__ */ React10.createElement(TabsTrigger4, { value: "critical" }, "Critical Path"), /* @__PURE__ */ React10.createElement(TabsTrigger4, { value: "quick" }, "Quick Wins"), /* @__PURE__ */ React10.createElement(TabsTrigger4, { value: "debt" }, "Tech Debt"), /* @__PURE__ */ React10.createElement(TabsTrigger4, { value: "blocked" }, "Blocked")), /* @__PURE__ */ React10.createElement(TabsContent4, { value: "recommended", className: "space-y-3" }, (_e = workQueue == null ? void 0 : workQueue.recommended) == null ? void 0 : _e.map((item) => /* @__PURE__ */ React10.createElement(WorkItem, { key: item.id, item, onStart: startWork }))), /* @__PURE__ */ React10.createElement(TabsContent4, { value: "critical", className: "space-y-3" }, (_f = workQueue == null ? void 0 : workQueue.criticalPath) == null ? void 0 : _f.map((item) => /* @__PURE__ */ React10.createElement(
    WorkItem,
    {
      key: item.id,
      item,
      onStart: startWork,
      critical: true
    }
  ))), /* @__PURE__ */ React10.createElement(TabsContent4, { value: "quick", className: "space-y-3" }, (_g = workQueue == null ? void 0 : workQueue.quickWins) == null ? void 0 : _g.map((item) => /* @__PURE__ */ React10.createElement(WorkItem, { key: item.id, item, onStart: startWork }))), /* @__PURE__ */ React10.createElement(TabsContent4, { value: "debt", className: "space-y-3" }, (_h = workQueue == null ? void 0 : workQueue.techDebt) == null ? void 0 : _h.map((item) => /* @__PURE__ */ React10.createElement(WorkItem, { key: item.id, item, onStart: startWork }))), /* @__PURE__ */ React10.createElement(TabsContent4, { value: "blocked", className: "space-y-3" }, (_i = workQueue == null ? void 0 : workQueue.blocked) == null ? void 0 : _i.map((item) => /* @__PURE__ */ React10.createElement(WorkItem, { key: item.id, item, blocked: true })))))));
}
function WorkItem({ item, onStart, critical, blocked }) {
  return /* @__PURE__ */ React10.createElement("div", { className: "flex items-center justify-between p-4 rounded-lg border bg-card" }, /* @__PURE__ */ React10.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React10.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React10.createElement("h4", { className: "font-medium" }, item.title), critical && /* @__PURE__ */ React10.createElement(DynamicIcon5, { name: "alert-circle", className: "h-4 w-4 text-red-500" })), /* @__PURE__ */ React10.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, item.description), /* @__PURE__ */ React10.createElement("div", { className: "flex gap-2 mt-2" }, /* @__PURE__ */ React10.createElement(Badge4, { variant: "outline" }, item.type), /* @__PURE__ */ React10.createElement(Badge4, { variant: "outline" }, item.complexity), /* @__PURE__ */ React10.createElement(Badge4, { variant: "outline" }, item.estimatedHours, "h"), /* @__PURE__ */ React10.createElement(Badge4, { variant: "default" }, "Value: ", item.valueScore))), /* @__PURE__ */ React10.createElement(Button5, { onClick: () => onStart(item), disabled: blocked, size: "sm" }, /* @__PURE__ */ React10.createElement(DynamicIcon5, { name: "play", className: "h-4 w-4 mr-1" }), "Start"));
}
var page_default9;
var init_page9 = __esm({
  "src/app/pages/work/page.tsx"() {
    "use strict";
    "use client";
    page_default9 = WorkDashboardPage;
  }
});

// src/components/PageRouter.tsx
import React11, { Suspense, useMemo } from "react";

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

// src/app/index.ts
function generatePageRegistry() {
  const registry = {};
  registry.home = () => Promise.resolve().then(() => (init_page(), page_exports));
  registry.dashboard = () => Promise.resolve().then(() => (init_page(), page_exports));
  function processMenuItems(items, parentPath = "") {
    items.forEach((item) => {
      if (item.children) {
        processMenuItems(item.children, parentPath);
      } else if (item.href) {
        const importPath = item.href.replace(/^\//, "").replace(/\//g, "/");
        const staticImports = {
          "exe/my-tickets": () => Promise.resolve().then(() => (init_page2(), page_exports2)),
          "exe/value-streams": () => Promise.resolve().then(() => (init_page3(), page_exports3)),
          "ops/contracts": () => Promise.resolve().then(() => (init_page4(), page_exports4)),
          "ops/insights": () => Promise.resolve().then(() => (init_page5(), page_exports5)),
          "ops/people": () => Promise.resolve().then(() => (init_page(), page_exports)),
          "ops/performance": () => Promise.resolve().then(() => (init_page6(), page_exports6)),
          "services": () => Promise.resolve().then(() => (init_page7(), page_exports7)),
          "strategic": () => Promise.resolve().then(() => (init_page8(), page_exports8)),
          "work": () => Promise.resolve().then(() => (init_page9(), page_exports9))
        };
        const dynamicImport = async () => {
          const moduleImport = staticImports[importPath];
          if (moduleImport) {
            const module = await moduleImport();
            return { default: module.default };
          }
          throw new Error(`Page not found: ${importPath}`);
        };
        registry[item.id] = dynamicImport;
      }
    });
  }
  processMenuItems(menu);
  return registry;
}
var pageRegistry = generatePageRegistry();

// src/components/PageRouter.tsx
var PageRouter = ({ href, fallback }) => {
  const PageComponent = useMemo(() => {
    const pageImport = pageRegistry[href];
    if (!pageImport) {
      return () => React11.createElement("div", null, `Page not found: ${href}`);
    }
    return React11.lazy(pageImport);
  }, [href]);
  return React11.createElement(
    Suspense,
    { fallback: fallback || React11.createElement("div", null, "Loading...") },
    React11.createElement(PageComponent)
  );
};
var PageRouter_default = PageRouter;
export {
  PageRouter_default as PageRouter
};
