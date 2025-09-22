"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app/pages/ops/people/page.tsx
var page_exports = {};
__export(page_exports, {
  default: () => page_default
});
function CommandCenterPage() {
  var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
  const { session } = (0, import_hooks.useCaptify)();
  const [health, setHealth] = (0, import_react.useState)(null);
  const [dashboard, setDashboard] = (0, import_react.useState)(null);
  const [recommendations, setRecommendations] = (0, import_react.useState)([]);
  const [loading, setLoading] = (0, import_react.useState)(true);
  (0, import_react.useEffect)(() => {
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
        import_api.apiClient.run({
          service: "performance",
          operation: "getCompanyHealth"
        }),
        import_api.apiClient.run({
          service: "performance",
          operation: "getExecutiveDashboard"
        }),
        import_api.apiClient.run({
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
    return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center justify-center h-96" }, "Loading...");
  }
  if (!((_b2 = (_a2 = session == null ? void 0 : session.user) == null ? void 0 : _a2.groups) == null ? void 0 : _b2.includes("Operations"))) {
    return /* @__PURE__ */ import_react.default.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ import_react.default.createElement(import_ui.Alert, null, /* @__PURE__ */ import_react.default.createElement(import_dynamic.DynamicIcon, { name: "alert-circle", className: "h-4 w-4" }), /* @__PURE__ */ import_react.default.createElement(import_ui.AlertDescription, null, "You need Operations role to view this page.")));
  }
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "container mx-auto p-6 space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h1", { className: "text-3xl font-bold" }, "Command Center"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-muted-foreground" }, "Strategic business intelligence")), /* @__PURE__ */ import_react.default.createElement(
    import_ui.Badge,
    {
      variant: (health == null ? void 0 : health.trend) === "improving" ? "default" : "destructive"
    },
    "Health Score: ",
    (health == null ? void 0 : health.score) || 0,
    "/100"
  )), ((_d = (_c2 = dashboard == null ? void 0 : dashboard.health) == null ? void 0 : _c2.alerts) == null ? void 0 : _d.length) > 0 && /* @__PURE__ */ import_react.default.createElement(import_ui.Alert, { variant: "destructive" }, /* @__PURE__ */ import_react.default.createElement(import_dynamic.DynamicIcon, { name: "alert-circle", className: "h-4 w-4" }), /* @__PURE__ */ import_react.default.createElement(import_ui.AlertDescription, null, dashboard.health.alerts[0].description)), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ import_react.default.createElement(import_ui.Card, null, /* @__PURE__ */ import_react.default.createElement(import_ui.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" }, /* @__PURE__ */ import_react.default.createElement(import_ui.CardTitle, { className: "text-sm font-medium" }, "Runway"), /* @__PURE__ */ import_react.default.createElement(import_dynamic.DynamicIcon, { name: "clock", className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ import_react.default.createElement(import_ui.CardContent, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-2xl font-bold" }, ((_f = (_e = dashboard == null ? void 0 : dashboard.health) == null ? void 0 : _e.runway) == null ? void 0 : _f.toFixed(1)) || 0, " months"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Cash available"))), /* @__PURE__ */ import_react.default.createElement(import_ui.Card, null, /* @__PURE__ */ import_react.default.createElement(import_ui.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" }, /* @__PURE__ */ import_react.default.createElement(import_ui.CardTitle, { className: "text-sm font-medium" }, "Monthly Burn"), /* @__PURE__ */ import_react.default.createElement(import_dynamic.DynamicIcon, { name: "dollar-sign", className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ import_react.default.createElement(import_ui.CardContent, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-2xl font-bold" }, "$", (((_g = dashboard == null ? void 0 : dashboard.financial) == null ? void 0 : _g.monthlyBurn) / 1e3 || 0).toFixed(0), "k"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center text-xs" }, ((_h = dashboard == null ? void 0 : dashboard.health) == null ? void 0 : _h.trend) === "improving" ? /* @__PURE__ */ import_react.default.createElement(import_dynamic.DynamicIcon, { name: "trending-down", className: "h-3 w-3 text-green-500 mr-1" }) : /* @__PURE__ */ import_react.default.createElement(import_dynamic.DynamicIcon, { name: "trending-up", className: "h-3 w-3 text-red-500 mr-1" }), /* @__PURE__ */ import_react.default.createElement("span", null, "vs last month")))), /* @__PURE__ */ import_react.default.createElement(import_ui.Card, null, /* @__PURE__ */ import_react.default.createElement(import_ui.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" }, /* @__PURE__ */ import_react.default.createElement(import_ui.CardTitle, { className: "text-sm font-medium" }, "Utilization"), /* @__PURE__ */ import_react.default.createElement(import_dynamic.DynamicIcon, { name: "users", className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ import_react.default.createElement(import_ui.CardContent, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-2xl font-bold" }, ((_j = (_i = dashboard == null ? void 0 : dashboard.operations) == null ? void 0 : _i.utilizationRate) == null ? void 0 : _j.toFixed(0)) || 0, "%"), /* @__PURE__ */ import_react.default.createElement(
    import_ui.Progress,
    {
      value: ((_k = dashboard == null ? void 0 : dashboard.operations) == null ? void 0 : _k.utilizationRate) || 0,
      className: "mt-2"
    }
  ))), /* @__PURE__ */ import_react.default.createElement(import_ui.Card, null, /* @__PURE__ */ import_react.default.createElement(import_ui.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" }, /* @__PURE__ */ import_react.default.createElement(import_ui.CardTitle, { className: "text-sm font-medium" }, "Profit Margin"), /* @__PURE__ */ import_react.default.createElement(import_dynamic.DynamicIcon, { name: "target", className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ import_react.default.createElement(import_ui.CardContent, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-2xl font-bold" }, ((_m = (_l = dashboard == null ? void 0 : dashboard.health) == null ? void 0 : _l.profitMargin) == null ? void 0 : _m.toFixed(1)) || 0, "%"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Target: 15%")))), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ import_react.default.createElement(import_ui.Card, null, /* @__PURE__ */ import_react.default.createElement(import_ui.CardHeader, null, /* @__PURE__ */ import_react.default.createElement(import_ui.CardTitle, null, "Financial Forecast")), /* @__PURE__ */ import_react.default.createElement(import_ui.CardContent, { className: "space-y-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm" }, "Best Case"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm font-medium" }, "$", (((_n = dashboard == null ? void 0 : dashboard.forecast) == null ? void 0 : _n.bestCase) / 1e6 || 0).toFixed(1), "M")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm" }, "Likely"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm font-medium" }, "$", (((_p = (_o = dashboard == null ? void 0 : dashboard.forecast) == null ? void 0 : _o.nextQuarter) == null ? void 0 : _p.revenue) / 1e6 || 0).toFixed(1), "M")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm" }, "Worst Case"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm font-medium" }, "$", (((_q = dashboard == null ? void 0 : dashboard.forecast) == null ? void 0 : _q.worstCase) / 1e6 || 0).toFixed(1), "M"))))), /* @__PURE__ */ import_react.default.createElement(import_ui.Card, null, /* @__PURE__ */ import_react.default.createElement(import_ui.CardHeader, null, /* @__PURE__ */ import_react.default.createElement(import_ui.CardTitle, null, "Operational Metrics")), /* @__PURE__ */ import_react.default.createElement(import_ui.CardContent, { className: "space-y-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm" }, "Delivery Velocity"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm font-medium" }, ((_r = dashboard == null ? void 0 : dashboard.operations) == null ? void 0 : _r.deliveryVelocity) || 0, " pts/sprint")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm" }, "Customer Satisfaction"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm font-medium" }, ((_t = (_s = dashboard == null ? void 0 : dashboard.operations) == null ? void 0 : _s.customerSatisfaction) == null ? void 0 : _t.toFixed(1)) || 0, "/5")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm" }, "SLA Compliance"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm font-medium" }, ((_u = dashboard == null ? void 0 : dashboard.operations) == null ? void 0 : _u.slaCompliance) || 0, "%")))))), recommendations.length > 0 && /* @__PURE__ */ import_react.default.createElement(import_ui.Card, null, /* @__PURE__ */ import_react.default.createElement(import_ui.CardHeader, null, /* @__PURE__ */ import_react.default.createElement(import_ui.CardTitle, { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react.default.createElement(import_dynamic.DynamicIcon, { name: "activity", className: "h-5 w-5" }), "AI Recommendations")), /* @__PURE__ */ import_react.default.createElement(import_ui.CardContent, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-3" }, recommendations.slice(0, 3).map((rec, idx) => /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      key: idx,
      className: "flex items-start gap-3 p-3 rounded-lg bg-muted/50"
    },
    /* @__PURE__ */ import_react.default.createElement(
      import_ui.Badge,
      {
        variant: rec.priority === "high" ? "destructive" : "default"
      },
      rec.priority
    ),
    /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react.default.createElement("p", { className: "font-medium text-sm" }, rec.title), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, rec.action), rec.impact && /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-green-600 mt-1" }, "Impact: ", rec.impact))
  ))))));
}
var import_react, import_hooks, import_api, import_ui, import_dynamic, page_default;
var init_page = __esm({
  "src/app/pages/ops/people/page.tsx"() {
    "use strict";
    "use client";
    import_react = __toESM(require("react"), 1);
    import_hooks = require("@captify-io/platform/hooks");
    import_api = require("@captify-io/platform/lib/api");
    import_ui = require("@captify-io/platform/components/ui");
    import_dynamic = require("lucide-react/dynamic");
    page_default = CommandCenterPage;
  }
});

// src/app/pages/exe/my-tickets/page.tsx
var page_exports2 = {};
__export(page_exports2, {
  default: () => page_default2
});
function MyTicketsPage() {
  const { session } = (0, import_hooks2.useCaptify)();
  const [tickets, setTickets] = (0, import_react2.useState)([]);
  const [loading, setLoading] = (0, import_react2.useState)(true);
  const [filter, setFilter] = (0, import_react2.useState)("all");
  (0, import_react2.useEffect)(() => {
    loadMyTickets();
  }, [filter]);
  const loadMyTickets = async () => {
    try {
      const response = await import_api2.apiClient.run({
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
  return /* @__PURE__ */ import_react2.default.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex justify-between items-center mb-6" }, /* @__PURE__ */ import_react2.default.createElement("h1", { className: "text-3xl font-bold" }, "My Tickets"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex gap-2" }, ["all", "todo", "in-progress", "review", "done"].map((status) => /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      key: status,
      onClick: () => setFilter(status),
      className: `px-3 py-1 text-sm rounded-md border transition-colors ${filter === status ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`
    },
    status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
  )))), loading ? /* @__PURE__ */ import_react2.default.createElement("p", null, "Loading tickets...") : /* @__PURE__ */ import_react2.default.createElement("div", { className: "space-y-4" }, filteredTickets.length > 0 ? filteredTickets.map((ticket) => /* @__PURE__ */ import_react2.default.createElement(import_ui2.Card, { key: ticket.id, className: "hover:shadow-md transition-shadow" }, /* @__PURE__ */ import_react2.default.createElement(import_ui2.CardContent, { className: "pt-6" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex justify-between items-start mb-4" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ import_react2.default.createElement("h3", { className: "font-semibold text-lg" }, ticket.title), /* @__PURE__ */ import_react2.default.createElement(
    "span",
    {
      className: `px-2 py-1 text-xs rounded-full border ${getStatusColor(
        ticket.status
      )}`
    },
    ticket.status.replace("-", " ")
  )), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-sm text-muted-foreground mb-2" }, ticket.description)), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center gap-4 ml-4" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "text-right" }, /* @__PURE__ */ import_react2.default.createElement("p", { className: `text-sm font-medium ${getPriorityColor(ticket.priority)}` }, ticket.priority, " priority"), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Due: ", new Date(ticket.dueDate).toLocaleDateString())))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex justify-between items-center pt-4 border-t" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex gap-4 text-xs text-muted-foreground" }, /* @__PURE__ */ import_react2.default.createElement("span", null, "ID: ", ticket.id), /* @__PURE__ */ import_react2.default.createElement("span", null, "Project: ", ticket.project), /* @__PURE__ */ import_react2.default.createElement("span", null, "Assignee: ", ticket.assignee)), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react2.default.createElement("button", { className: "px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700" }, "View"), ticket.status !== "done" && /* @__PURE__ */ import_react2.default.createElement("button", { className: "px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50" }, "Update")))))) : /* @__PURE__ */ import_react2.default.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-muted-foreground" }, filter === "all" ? "No tickets assigned to you" : `No ${filter.replace("-", " ")} tickets`))));
}
var import_react2, import_hooks2, import_api2, import_ui2, page_default2;
var init_page2 = __esm({
  "src/app/pages/exe/my-tickets/page.tsx"() {
    "use strict";
    "use client";
    import_react2 = __toESM(require("react"), 1);
    import_hooks2 = require("@captify-io/platform/hooks");
    import_api2 = require("@captify-io/platform/lib/api");
    import_ui2 = require("@captify-io/platform/components/ui");
    page_default2 = MyTicketsPage;
  }
});

// src/app/pages/exe/value-streams/page.tsx
var page_exports3 = {};
__export(page_exports3, {
  default: () => page_default3
});
function ValueStreamsPage() {
  const { session } = (0, import_hooks3.useCaptify)();
  const [valueStreams, setValueStreams] = (0, import_react3.useState)([]);
  const [loading, setLoading] = (0, import_react3.useState)(true);
  (0, import_react3.useEffect)(() => {
    loadValueStreams();
  }, []);
  const loadValueStreams = async () => {
    try {
      const response = await import_api3.apiClient.run({
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
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ import_react3.default.createElement("h1", { className: "text-3xl font-bold mb-6" }, "Value Streams"), loading ? /* @__PURE__ */ import_react3.default.createElement("p", null, "Loading value streams...") : /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, valueStreams.length > 0 ? valueStreams.map((stream) => /* @__PURE__ */ import_react3.default.createElement(import_ui3.Card, { key: stream.id, className: "hover:shadow-md transition-shadow" }, /* @__PURE__ */ import_react3.default.createElement(import_ui3.CardHeader, null, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ import_react3.default.createElement(import_ui3.CardTitle, { className: "text-lg" }, stream.name), /* @__PURE__ */ import_react3.default.createElement(
    "span",
    {
      className: `px-2 py-1 text-xs rounded-full border ${getStatusColor(
        stream.status
      )}`
    },
    stream.status
  ))), /* @__PURE__ */ import_react3.default.createElement(import_ui3.CardContent, null, /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-sm text-muted-foreground mb-4" }, stream.description), /* @__PURE__ */ import_react3.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex justify-between text-sm" }, /* @__PURE__ */ import_react3.default.createElement("span", null, "Lead Time:"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-medium" }, stream.leadTime, "d")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex justify-between text-sm" }, /* @__PURE__ */ import_react3.default.createElement("span", null, "Throughput:"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-medium" }, stream.throughput, "/week")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex justify-between text-sm" }, /* @__PURE__ */ import_react3.default.createElement("span", null, "Efficiency:"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-medium" }, stream.efficiency, "%"))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-4 pt-4 border-t" }, /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Owner: ", stream.owner, " \u2022 Last updated: ", new Date(stream.lastUpdated).toLocaleDateString()))))) : /* @__PURE__ */ import_react3.default.createElement("div", { className: "col-span-full text-center py-12" }, /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-muted-foreground" }, "No value streams configured"))));
}
var import_react3, import_hooks3, import_api3, import_ui3, page_default3;
var init_page3 = __esm({
  "src/app/pages/exe/value-streams/page.tsx"() {
    "use strict";
    "use client";
    import_react3 = __toESM(require("react"), 1);
    import_hooks3 = require("@captify-io/platform/hooks");
    import_api3 = require("@captify-io/platform/lib/api");
    import_ui3 = require("@captify-io/platform/components/ui");
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
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    (0, import_crypto.randomFillSync)(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
var import_crypto, rnds8Pool, poolPtr;
var init_rng = __esm({
  "node_modules/uuid/dist/esm/rng.js"() {
    "use strict";
    import_crypto = require("crypto");
    rnds8Pool = new Uint8Array(256);
    poolPtr = rnds8Pool.length;
  }
});

// node_modules/uuid/dist/esm/native.js
var import_crypto2, native_default;
var init_native = __esm({
  "node_modules/uuid/dist/esm/native.js"() {
    "use strict";
    import_crypto2 = require("crypto");
    native_default = { randomUUID: import_crypto2.randomUUID };
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
  const [formData, setFormData] = (0, import_react4.useState)(
    getInitialFormData()
  );
  const [loading, setLoading] = (0, import_react4.useState)(false);
  const [activeTab, setActiveTab] = (0, import_react4.useState)("info");
  const [customers, setCustomers] = (0, import_react4.useState)([
    "Department of Defense",
    "Department of State",
    "DHS",
    "NASA",
    "EPA"
  ]);
  const [agencies, setAgencies] = (0, import_react4.useState)([
    "DISA",
    "USCIS",
    "CBP",
    "CISA",
    "SPAWAR"
  ]);
  const [users, setUsers] = (0, import_react4.useState)([]);
  const [customerOpen, setCustomerOpen] = (0, import_react4.useState)(false);
  const [agencyOpen, setAgencyOpen] = (0, import_react4.useState)(false);
  const [newCustomer, setNewCustomer] = (0, import_react4.useState)("");
  const [newAgency, setNewAgency] = (0, import_react4.useState)("");
  (0, import_react4.useEffect)(() => {
    loadDropdownData();
  }, []);
  const loadDropdownData = async () => {
    try {
      const usersRes = await import_api4.apiClient.run({
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
  return /* @__PURE__ */ import_react4.default.createElement("div", { className: "max-w-6xl" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "flex justify-between items-center mb-6" }, /* @__PURE__ */ import_react4.default.createElement("h2", { className: "text-2xl font-bold" }, (contract == null ? void 0 : contract.id) && (contract == null ? void 0 : contract.name) ? "Edit Contract" : "New Contract")), /* @__PURE__ */ import_react4.default.createElement(import_ui4.Tabs, { value: activeTab, onValueChange: setActiveTab }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.TabsList, { className: "grid w-full grid-cols-5" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.TabsTrigger, { value: "info" }, "Info"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.TabsTrigger, { value: "financial" }, "Financial"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.TabsTrigger, { value: "costs" }, "Cost Breakdown"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.TabsTrigger, { value: "team" }, "Team"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.TabsTrigger, { value: "documents" }, "Documents")), /* @__PURE__ */ import_react4.default.createElement(import_ui4.TabsContent, { value: "info", className: "space-y-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "contractNumber" }, "Contract Number*"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      id: "contractNumber",
      value: formData.contractNumber || "",
      onChange: (e) => handleInputChange("contractNumber", e.target.value),
      placeholder: "e.g., W15P7T-20-C-0001",
      required: true
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "name" }, "Contract Name*"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      id: "name",
      value: formData.name || "",
      onChange: (e) => handleInputChange("name", e.target.value),
      placeholder: "e.g., IT Support Services",
      required: true
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "type" }, "Contract Type*"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Select,
    {
      value: formData.type || "FFP",
      onValueChange: (value) => handleInputChange("type", value)
    },
    /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectTrigger, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectValue, { placeholder: "Select type" })),
    /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectContent, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "FFP" }, "FFP - Firm Fixed Price"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "CPFF" }, "CPFF - Cost Plus Fixed Fee"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "CPIF" }, "CPIF - Cost Plus Incentive Fee"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "T&M" }, "T&M - Time & Materials"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "IDIQ" }, "IDIQ - Indefinite Delivery/Quantity"))
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "status" }, "Status*"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Select,
    {
      value: formData.status || "pre-award",
      onValueChange: (value) => handleInputChange("status", value)
    },
    /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectTrigger, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectValue, { placeholder: "Select status" })),
    /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectContent, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "pre-award" }, "Pre-Award"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "active" }, "Active"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "option-pending" }, "Option Pending"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "closing" }, "Closing"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "closed" }, "Closed"))
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "customer" }, "Customer*"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.Popover, { open: customerOpen, onOpenChange: setCustomerOpen }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.PopoverTrigger, { asChild: true }, /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Button,
    {
      variant: "outline",
      role: "combobox",
      "aria-expanded": customerOpen,
      className: "w-full justify-between"
    },
    formData.customer || "Select customer...",
    /* @__PURE__ */ import_react4.default.createElement(
      import_dynamic2.DynamicIcon,
      {
        name: "chevrons-up-down",
        className: "ml-2 h-4 w-4 shrink-0 opacity-50"
      }
    )
  )), /* @__PURE__ */ import_react4.default.createElement(import_ui4.PopoverContent, { className: "w-full p-0" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Command, null, /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.CommandInput,
    {
      placeholder: "Search or add customer...",
      value: newCustomer,
      onValueChange: setNewCustomer
    }
  ), /* @__PURE__ */ import_react4.default.createElement(import_ui4.CommandList, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.CommandEmpty, null, /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Button,
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
    /* @__PURE__ */ import_react4.default.createElement(import_dynamic2.DynamicIcon, { name: "plus", className: "mr-2 h-4 w-4" }),
    'Add "',
    newCustomer,
    '"'
  )), /* @__PURE__ */ import_react4.default.createElement(import_ui4.CommandGroup, null, customers.map((customer) => /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.CommandItem,
    {
      key: customer,
      onSelect: () => {
        handleInputChange("customer", customer);
        setCustomerOpen(false);
      }
    },
    /* @__PURE__ */ import_react4.default.createElement(
      import_dynamic2.DynamicIcon,
      {
        name: "check",
        className: (0, import_utils.cn)(
          "mr-2 h-4 w-4",
          formData.customer === customer ? "opacity-100" : "opacity-0"
        )
      }
    ),
    customer
  )))))))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "agency" }, "Agency"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.Popover, { open: agencyOpen, onOpenChange: setAgencyOpen }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.PopoverTrigger, { asChild: true }, /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Button,
    {
      variant: "outline",
      role: "combobox",
      "aria-expanded": agencyOpen,
      className: "w-full justify-between"
    },
    formData.agency || "Select agency...",
    /* @__PURE__ */ import_react4.default.createElement(
      import_dynamic2.DynamicIcon,
      {
        name: "chevrons-up-down",
        className: "ml-2 h-4 w-4 shrink-0 opacity-50"
      }
    )
  )), /* @__PURE__ */ import_react4.default.createElement(import_ui4.PopoverContent, { className: "w-full p-0" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Command, null, /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.CommandInput,
    {
      placeholder: "Search or add agency...",
      value: newAgency,
      onValueChange: setNewAgency
    }
  ), /* @__PURE__ */ import_react4.default.createElement(import_ui4.CommandList, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.CommandEmpty, null, /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Button,
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
    /* @__PURE__ */ import_react4.default.createElement(import_dynamic2.DynamicIcon, { name: "plus", className: "mr-2 h-4 w-4" }),
    'Add "',
    newAgency,
    '"'
  )), /* @__PURE__ */ import_react4.default.createElement(import_ui4.CommandGroup, null, agencies.map((agency) => /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.CommandItem,
    {
      key: agency,
      onSelect: () => {
        handleInputChange("agency", agency);
        setAgencyOpen(false);
      }
    },
    /* @__PURE__ */ import_react4.default.createElement(
      import_dynamic2.DynamicIcon,
      {
        name: "check",
        className: (0, import_utils.cn)(
          "mr-2 h-4 w-4",
          formData.agency === agency ? "opacity-100" : "opacity-0"
        )
      }
    ),
    agency
  )))))))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "startDate" }, "Start Date*"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
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
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "popMonths" }, "POP (months)*"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
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
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "awardAmount" }, "Award Amount*"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
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
  )))), /* @__PURE__ */ import_react4.default.createElement(import_ui4.TabsContent, { value: "financial", className: "space-y-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "totalValue" }, "Total Contract Value"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      id: "totalValue",
      type: "number",
      value: formData.totalValue || "",
      onChange: (e) => handleInputChange("totalValue", parseFloat(e.target.value)),
      placeholder: "0.00"
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "fundedValue" }, "Funded Value"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      id: "fundedValue",
      type: "number",
      value: formData.fundedValue || "",
      onChange: (e) => handleInputChange("fundedValue", parseFloat(e.target.value)),
      placeholder: "0.00"
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "avgMonthlyBurn" }, "Average Monthly Burn"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
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
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "indirectRate" }, "Indirect Rate (%)"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      id: "indirectRate",
      type: "number",
      value: formData.indirectRate || "",
      onChange: (e) => handleInputChange("indirectRate", parseFloat(e.target.value)),
      placeholder: "0"
    }
  )))), /* @__PURE__ */ import_react4.default.createElement(import_ui4.TabsContent, { value: "costs", className: "space-y-6" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Card, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.CardHeader, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.CardTitle, null, "Budgeted Costs")), /* @__PURE__ */ import_react4.default.createElement(import_ui4.CardContent, null, /* @__PURE__ */ import_react4.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, null, "Direct Costs"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      type: "number",
      value: ((_a2 = formData.budgetedCosts) == null ? void 0 : _a2.direct) || 0,
      onChange: (e) => handleCostChange(
        "budgetedCosts",
        "direct",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, null, "Indirect Costs"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      type: "number",
      value: ((_b2 = formData.budgetedCosts) == null ? void 0 : _b2.indirect) || 0,
      onChange: (e) => handleCostChange(
        "budgetedCosts",
        "indirect",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, null, "Materials"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      type: "number",
      value: ((_c2 = formData.budgetedCosts) == null ? void 0 : _c2.materials) || 0,
      onChange: (e) => handleCostChange(
        "budgetedCosts",
        "materials",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, null, "Subcontracts"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      type: "number",
      value: ((_d = formData.budgetedCosts) == null ? void 0 : _d.subcontracts) || 0,
      onChange: (e) => handleCostChange(
        "budgetedCosts",
        "subcontracts",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, null, "Profit/Fee"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      type: "number",
      value: ((_e = formData.budgetedCosts) == null ? void 0 : _e.profit) || 0,
      onChange: (e) => handleCostChange(
        "budgetedCosts",
        "profit",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, null, "Total Budgeted"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      type: "number",
      value: ((_f = formData.budgetedCosts) == null ? void 0 : _f.total) || 0,
      disabled: true,
      className: "font-bold"
    }
  ))))), /* @__PURE__ */ import_react4.default.createElement(import_ui4.Card, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.CardHeader, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.CardTitle, null, "Expended Costs")), /* @__PURE__ */ import_react4.default.createElement(import_ui4.CardContent, null, /* @__PURE__ */ import_react4.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, null, "Direct Costs"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      type: "number",
      value: ((_g = formData.expendedCosts) == null ? void 0 : _g.direct) || 0,
      onChange: (e) => handleCostChange(
        "expendedCosts",
        "direct",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, null, "Indirect Costs"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      type: "number",
      value: ((_h = formData.expendedCosts) == null ? void 0 : _h.indirect) || 0,
      onChange: (e) => handleCostChange(
        "expendedCosts",
        "indirect",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, null, "Materials"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      type: "number",
      value: ((_i = formData.expendedCosts) == null ? void 0 : _i.materials) || 0,
      onChange: (e) => handleCostChange(
        "expendedCosts",
        "materials",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, null, "Subcontracts"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      type: "number",
      value: ((_j = formData.expendedCosts) == null ? void 0 : _j.subcontracts) || 0,
      onChange: (e) => handleCostChange(
        "expendedCosts",
        "subcontracts",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, null, "Profit/Fee"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      type: "number",
      value: ((_k = formData.expendedCosts) == null ? void 0 : _k.profit) || 0,
      onChange: (e) => handleCostChange(
        "expendedCosts",
        "profit",
        parseFloat(e.target.value) || 0
      )
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, null, "Total Expended"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Input,
    {
      type: "number",
      value: ((_l = formData.expendedCosts) == null ? void 0 : _l.total) || 0,
      disabled: true,
      className: "font-bold"
    }
  )))))), /* @__PURE__ */ import_react4.default.createElement(import_ui4.TabsContent, { value: "team", className: "space-y-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "programManager" }, "Program Manager*"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Select,
    {
      value: formData.programManager || "",
      onValueChange: (value) => handleInputChange("programManager", value)
    },
    /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectTrigger, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectValue, { placeholder: "Select Program Manager" })),
    /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectContent, null, users.length > 0 ? users.map((user) => /* @__PURE__ */ import_react4.default.createElement(
      import_ui4.SelectItem,
      {
        key: user.id || user.email,
        value: user.email
      },
      user.name || user.email
    )) : /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "john.doe@example.com" }, "John Doe"))
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "technicalLead" }, "Technical Lead"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Select,
    {
      value: formData.technicalLead || "",
      onValueChange: (value) => handleInputChange("technicalLead", value)
    },
    /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectTrigger, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectValue, { placeholder: "Select Technical Lead" })),
    /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectContent, null, users.length > 0 ? users.map((user) => /* @__PURE__ */ import_react4.default.createElement(
      import_ui4.SelectItem,
      {
        key: user.id || user.email,
        value: user.email
      },
      user.name || user.email
    )) : /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "jane.smith@example.com" }, "Jane Smith"))
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "contractingOfficer" }, "Contracting Officer"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Select,
    {
      value: formData.contractingOfficer || "",
      onValueChange: (value) => handleInputChange("contractingOfficer", value)
    },
    /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectTrigger, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectValue, { placeholder: "Select Contracting Officer" })),
    /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectContent, null, users.length > 0 ? users.map((user) => /* @__PURE__ */ import_react4.default.createElement(
      import_ui4.SelectItem,
      {
        key: user.id || user.email,
        value: user.email
      },
      user.name || user.email
    )) : /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "co@agency.gov" }, "CO Name"))
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Label, { htmlFor: "contractingOfficerRep" }, "Contracting Officer Representative (COR)"), /* @__PURE__ */ import_react4.default.createElement(
    import_ui4.Select,
    {
      value: formData.contractingOfficerRep || "",
      onValueChange: (value) => handleInputChange("contractingOfficerRep", value)
    },
    /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectTrigger, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectValue, { placeholder: "Select COR" })),
    /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectContent, null, users.length > 0 ? users.map((user) => /* @__PURE__ */ import_react4.default.createElement(
      import_ui4.SelectItem,
      {
        key: user.id || user.email,
        value: user.email
      },
      user.name || user.email
    )) : /* @__PURE__ */ import_react4.default.createElement(import_ui4.SelectItem, { value: "cor@agency.gov" }, "COR Name"))
  )))), /* @__PURE__ */ import_react4.default.createElement(import_ui4.TabsContent, { value: "documents", className: "space-y-4" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Card, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.CardHeader, null, /* @__PURE__ */ import_react4.default.createElement(import_ui4.CardTitle, null, "Contract Documents")), /* @__PURE__ */ import_react4.default.createElement(import_ui4.CardContent, { className: "space-y-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center" }, /* @__PURE__ */ import_react4.default.createElement(
    import_dynamic2.DynamicIcon,
    {
      name: "upload",
      className: "mx-auto h-12 w-12 text-gray-400"
    }
  ), /* @__PURE__ */ import_react4.default.createElement("p", { className: "mt-2 text-sm text-gray-600 font-semibold" }, "Document Upload Coming Soon"), /* @__PURE__ */ import_react4.default.createElement("p", { className: "mt-1 text-xs text-gray-500" }, "Documents will be stored in S3 and accessible to the AI agent"), /* @__PURE__ */ import_react4.default.createElement("p", { className: "mt-3 text-xs text-gray-400" }, "Supported formats: PDF, Word, Excel, PowerPoint")))))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "flex justify-end gap-2 mt-6" }, /* @__PURE__ */ import_react4.default.createElement(import_ui4.Button, { variant: "outline", onClick: onClose, disabled: loading }, "Cancel"), /* @__PURE__ */ import_react4.default.createElement(import_ui4.Button, { onClick: handleSubmit, disabled: loading }, loading ? "Saving..." : "Save Contract")));
}
var import_react4, import_api4, import_utils, import_dynamic2, import_ui4;
var init_form = __esm({
  "src/app/pages/ops/contracts/form.tsx"() {
    "use strict";
    "use client";
    import_react4 = __toESM(require("react"), 1);
    import_api4 = require("@captify-io/platform/lib/api");
    import_utils = require("@captify-io/platform/lib/utils");
    import_dynamic2 = require("lucide-react/dynamic");
    import_ui4 = require("@captify-io/platform/components/ui");
  }
});

// src/app/pages/ops/contracts/page.tsx
var page_exports4 = {};
__export(page_exports4, {
  default: () => page_default4
});
function ContractsPage() {
  var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
  const { session } = (0, import_hooks4.useCaptify)();
  const [contracts, setContracts] = (0, import_react5.useState)([]);
  const [selectedContract, setSelectedContract] = (0, import_react5.useState)(null);
  const [contractDetails, setContractDetails] = (0, import_react5.useState)(null);
  const [loading, setLoading] = (0, import_react5.useState)(true);
  const [isFormOpen, setIsFormOpen] = (0, import_react5.useState)(false);
  const [editingContract, setEditingContract] = (0, import_react5.useState)(null);
  const [filter, setFilter] = (0, import_react5.useState)("active");
  const [viewMode, setViewMode] = (0, import_react5.useState)("list");
  (0, import_react5.useEffect)(() => {
    loadContracts();
  }, []);
  (0, import_react5.useEffect)(() => {
    if (selectedContract) {
      loadContractDetails(selectedContract.id);
    }
  }, [selectedContract]);
  const loadContracts = async () => {
    try {
      const response = await import_api5.apiClient.run({
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
        import_api5.apiClient.run({
          service: "contract",
          operation: "getContractBurn",
          data: { contractId },
          app: "pmbook"
        }),
        import_api5.apiClient.run({
          service: "contract",
          operation: "getCDRLStatus",
          data: { contractId },
          app: "pmbook"
        }),
        import_api5.apiClient.run({
          service: "contract",
          operation: "getMilestoneProgress",
          data: { contractId },
          app: "pmbook"
        }),
        import_api5.apiClient.run({
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
      await import_api5.apiClient.run({
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
        await import_api5.apiClient.run({
          service: "contract",
          operation: "updateContract",
          data: __spreadProps(__spreadValues({}, contractData), {
            contractId: editingContract.id
          }),
          app: "pmbook"
        });
      } else {
        await import_api5.apiClient.run({
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
  const Breadcrumbs = () => /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center space-x-2 text-sm text-muted-foreground mb-4" }, /* @__PURE__ */ import_react5.default.createElement(
    "button",
    {
      onClick: () => {
        setViewMode("list");
        setEditingContract(null);
      },
      className: "hover:text-foreground transition-colors"
    },
    "Contracts"
  ), /* @__PURE__ */ import_react5.default.createElement("span", null, "/"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-foreground" }, editingContract && contracts.some((c) => c.id === editingContract.id) ? editingContract.name || editingContract.contractNumber || "Edit Contract" : "New Contract"));
  if (loading) {
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center justify-center h-96" }, "Loading...");
  }
  if (viewMode === "form" && editingContract) {
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: "container mx-auto p-6 space-y-6" }, /* @__PURE__ */ import_react5.default.createElement(Breadcrumbs, null), /* @__PURE__ */ import_react5.default.createElement(
      ContractForm,
      {
        contract: editingContract,
        isOpen: true,
        onClose: handleCancelEdit,
        onSave: handleSaveContract
      }
    ));
  }
  return /* @__PURE__ */ import_react5.default.createElement("div", { className: "container mx-auto p-6 space-y-6" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h1", { className: "text-3xl font-bold" }, "Contract Management"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground" }, "Monitor contracts, deliverables, and financial performance")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.Button, { onClick: handleAddContract }, /* @__PURE__ */ import_react5.default.createElement(import_dynamic3.DynamicIcon, { name: "plus", className: "mr-2 h-4 w-4" }), "Add Contract"))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react5.default.createElement(
    import_ui5.Button,
    {
      variant: filter === "active" ? "default" : "outline",
      size: "sm",
      onClick: () => setFilter("active")
    },
    "Active (",
    (contracts || []).filter((c) => c.status !== "closed").length,
    ")"
  ), /* @__PURE__ */ import_react5.default.createElement(
    import_ui5.Button,
    {
      variant: filter === "all" ? "default" : "outline",
      size: "sm",
      onClick: () => setFilter("all")
    },
    "All (",
    (contracts || []).length,
    ")"
  ), /* @__PURE__ */ import_react5.default.createElement(
    import_ui5.Button,
    {
      variant: filter === "archived" ? "default" : "outline",
      size: "sm",
      onClick: () => setFilter("archived")
    },
    "Archived (",
    (contracts || []).filter((c) => c.status === "closed").length,
    ")"
  )), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex gap-2 overflow-x-auto pb-2" }, filteredContracts.map((contract) => /* @__PURE__ */ import_react5.default.createElement(
    import_ui5.Button,
    {
      key: contract.id,
      variant: (selectedContract == null ? void 0 : selectedContract.id) === contract.id ? "default" : "outline",
      onClick: () => setSelectedContract(contract),
      className: "flex-shrink-0"
    },
    /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-left" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "font-medium" }, contract.contractNumber), /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-xs text-muted-foreground" }, "$", (contract.totalValue / 1e6).toFixed(1), "M"))
  ))), selectedContract && /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between items-center mb-4" }, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "text-2xl font-semibold" }, selectedContract.name || selectedContract.contractNumber), /* @__PURE__ */ import_react5.default.createElement(import_ui5.DropdownMenu, null, /* @__PURE__ */ import_react5.default.createElement(import_ui5.DropdownMenuTrigger, { asChild: true }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.Button, { variant: "outline", size: "sm" }, /* @__PURE__ */ import_react5.default.createElement(import_dynamic3.DynamicIcon, { name: "more-vertical", className: "h-4 w-4" }))), /* @__PURE__ */ import_react5.default.createElement(import_ui5.DropdownMenuContent, { align: "end" }, /* @__PURE__ */ import_react5.default.createElement(
    import_ui5.DropdownMenuItem,
    {
      onClick: () => handleEditContract(selectedContract)
    },
    /* @__PURE__ */ import_react5.default.createElement(import_dynamic3.DynamicIcon, { name: "edit", className: "mr-2 h-4 w-4" }),
    "Edit Contract"
  ), /* @__PURE__ */ import_react5.default.createElement(
    import_ui5.DropdownMenuItem,
    {
      onClick: () => handleArchiveContract(selectedContract.id)
    },
    /* @__PURE__ */ import_react5.default.createElement(import_dynamic3.DynamicIcon, { name: "archive", className: "mr-2 h-4 w-4" }),
    "Archive Contract"
  ), /* @__PURE__ */ import_react5.default.createElement(import_ui5.DropdownMenuItem, null, /* @__PURE__ */ import_react5.default.createElement(import_dynamic3.DynamicIcon, { name: "download", className: "mr-2 h-4 w-4" }), "Export Data")))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.Card, null, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardTitle, { className: "text-sm" }, "Total Value")), /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardContent, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-2xl font-bold" }, "$", (selectedContract.totalValue / 1e6).toFixed(1), "M"), /* @__PURE__ */ import_react5.default.createElement(
    import_ui5.Progress,
    {
      value: selectedContract.burnedValue / selectedContract.totalValue * 100,
      className: "mt-2"
    }
  ), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, (selectedContract.burnedValue / selectedContract.totalValue * 100).toFixed(0), "% burned"))), /* @__PURE__ */ import_react5.default.createElement(import_ui5.Card, null, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardTitle, { className: "text-sm" }, "Monthly Burn")), /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardContent, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-2xl font-bold" }, "$", (((_a2 = contractDetails == null ? void 0 : contractDetails.burn) == null ? void 0 : _a2.currentMonthBurn) / 1e3 || 0).toFixed(0), "k"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center text-xs text-muted-foreground mt-1" }, /* @__PURE__ */ import_react5.default.createElement(import_dynamic3.DynamicIcon, { name: "trending-up", className: "h-3 w-3 mr-1" }), ((_b2 = contractDetails == null ? void 0 : contractDetails.burn) == null ? void 0 : _b2.trend) || "stable"))), /* @__PURE__ */ import_react5.default.createElement(import_ui5.Card, null, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardTitle, { className: "text-sm" }, "Health Score")), /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardContent, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-2xl font-bold" }, selectedContract.healthScore, "%"), /* @__PURE__ */ import_react5.default.createElement(
    import_ui5.Badge,
    {
      variant: selectedContract.healthScore > 80 ? "default" : "destructive",
      className: "mt-2"
    },
    selectedContract.healthScore > 80 ? "Healthy" : "At Risk"
  ))), /* @__PURE__ */ import_react5.default.createElement(import_ui5.Card, null, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardTitle, { className: "text-sm" }, "Time Remaining")), /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardContent, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-2xl font-bold" }, Math.floor(
    (new Date(selectedContract.endDate).getTime() - Date.now()) / (1e3 * 60 * 60 * 24)
  ), " ", "days"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, "Ends ", new Date(selectedContract.endDate).toLocaleDateString())))), /* @__PURE__ */ import_react5.default.createElement(import_ui5.Card, null, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardContent, { className: "p-0" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.Tabs, { defaultValue: "cdrls" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsList, { className: "w-full justify-start rounded-none border-b" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsTrigger, { value: "cdrls" }, "CDRLs"), /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsTrigger, { value: "milestones" }, "Milestones"), /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsTrigger, { value: "financial" }, "Financial"), /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsTrigger, { value: "team" }, "Team"), /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsTrigger, { value: "strategic" }, "Strategic Goals"), /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsTrigger, { value: "workstreams" }, "Work Streams")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "p-6" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsContent, { value: "cdrls", className: "space-y-4" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "grid grid-cols-4 gap-4" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-2xl font-bold" }, ((_d = (_c2 = contractDetails == null ? void 0 : contractDetails.cdrls) == null ? void 0 : _c2.summary) == null ? void 0 : _d.total) || 0), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Total CDRLs")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-2xl font-bold text-green-600" }, ((_f = (_e = contractDetails == null ? void 0 : contractDetails.cdrls) == null ? void 0 : _e.summary) == null ? void 0 : _f.completed) || 0), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Completed")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-2xl font-bold text-yellow-600" }, ((_h = (_g = contractDetails == null ? void 0 : contractDetails.cdrls) == null ? void 0 : _g.summary) == null ? void 0 : _h.pending) || 0), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Pending")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-2xl font-bold text-red-600" }, ((_j = (_i = contractDetails == null ? void 0 : contractDetails.cdrls) == null ? void 0 : _i.summary) == null ? void 0 : _j.overdue) || 0), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Overdue"))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react5.default.createElement("h4", { className: "font-medium" }, "Upcoming Deadlines"), (_l = (_k = contractDetails == null ? void 0 : contractDetails.cdrls) == null ? void 0 : _k.upcoming) == null ? void 0 : _l.map((cdrl) => /* @__PURE__ */ import_react5.default.createElement(
    "div",
    {
      key: cdrl.id,
      className: "flex items-center justify-between p-3 rounded-lg border"
    },
    /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("p", { className: "font-medium" }, cdrl.number, ": ", cdrl.title), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-sm text-muted-foreground" }, cdrl.type)),
    /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-right" }, /* @__PURE__ */ import_react5.default.createElement(
      import_ui5.Badge,
      {
        variant: cdrl.status === "overdue" ? "destructive" : "default"
      },
      cdrl.status
    ), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, "Due: ", new Date(cdrl.dueDate).toLocaleDateString()))
  )))), /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsContent, { value: "milestones", className: "space-y-4" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-3" }, (_n = (_m = contractDetails == null ? void 0 : contractDetails.milestones) == null ? void 0 : _m.milestones) == null ? void 0 : _n.map(
    (milestone) => /* @__PURE__ */ import_react5.default.createElement(
      "div",
      {
        key: milestone.id,
        className: "p-4 rounded-lg border"
      },
      /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("p", { className: "font-medium" }, milestone.title), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, "$", (milestone.value / 1e3).toFixed(0), "k value")), /* @__PURE__ */ import_react5.default.createElement(
        import_ui5.Badge,
        {
          variant: milestone.status === "complete" ? "default" : "secondary"
        },
        milestone.status
      )),
      /* @__PURE__ */ import_react5.default.createElement(
        import_ui5.Progress,
        {
          value: milestone.progress || 0,
          className: "mt-3"
        }
      ),
      /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, milestone.progress || 0, "% complete - Due", " ", new Date(milestone.dueDate).toLocaleDateString())
    )
  ))), /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsContent, { value: "financial", className: "space-y-4" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "grid grid-cols-3 gap-4" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.Card, null, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardTitle, { className: "text-sm" }, "Profit Margin")), /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardContent, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-2xl font-bold" }, ((_p = (_o = contractDetails == null ? void 0 : contractDetails.profitability) == null ? void 0 : _o.margin) == null ? void 0 : _p.toFixed(
    1
  )) || 0, "%"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Target: 15%"))), /* @__PURE__ */ import_react5.default.createElement(import_ui5.Card, null, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardTitle, { className: "text-sm" }, "Revenue")), /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardContent, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-2xl font-bold" }, "$", (((_q = contractDetails == null ? void 0 : contractDetails.profitability) == null ? void 0 : _q.revenue) / 1e6 || 0).toFixed(1), "M"))), /* @__PURE__ */ import_react5.default.createElement(import_ui5.Card, null, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardTitle, { className: "text-sm" }, "Profit")), /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardContent, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-2xl font-bold" }, "$", (((_r = contractDetails == null ? void 0 : contractDetails.profitability) == null ? void 0 : _r.profit) / 1e3 || 0).toFixed(0), "k")))), (_t = (_s = contractDetails == null ? void 0 : contractDetails.burn) == null ? void 0 : _s.recommendations) == null ? void 0 : _t.map(
    (rec, idx) => /* @__PURE__ */ import_react5.default.createElement(import_ui5.Alert, { key: idx }, /* @__PURE__ */ import_react5.default.createElement(import_dynamic3.DynamicIcon, { name: "alert-circle", className: "h-4 w-4" }), /* @__PURE__ */ import_react5.default.createElement(import_ui5.AlertDescription, null, /* @__PURE__ */ import_react5.default.createElement("strong", null, rec.message), /* @__PURE__ */ import_react5.default.createElement("br", null), rec.action))
  )), /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsContent, { value: "team" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-sm font-medium" }, "Program Manager"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground" }, selectedContract.programManager)), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-sm font-medium" }, "Technical Lead"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground" }, selectedContract.technicalLead || "Not assigned")), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-sm font-medium" }, "Teams"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex gap-2 mt-1" }, (_u = selectedContract.teams) == null ? void 0 : _u.map((team) => /* @__PURE__ */ import_react5.default.createElement(import_ui5.Badge, { key: team, variant: "outline" }, team)))))), /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsContent, { value: "strategic", className: "space-y-4" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react5.default.createElement("h4", { className: "font-medium" }, "Strategic Goals"), ((_v = selectedContract.strategicGoals) == null ? void 0 : _v.length) > 0 ? selectedContract.strategicGoals.map((goal) => /* @__PURE__ */ import_react5.default.createElement(
    "div",
    {
      key: goal.id,
      className: "p-4 rounded-lg border space-y-2"
    },
    /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("p", { className: "font-medium" }, goal.title), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-sm text-muted-foreground" }, goal.description)), /* @__PURE__ */ import_react5.default.createElement(
      import_ui5.Badge,
      {
        variant: goal.priority === "critical" ? "destructive" : goal.priority === "high" ? "default" : "secondary"
      },
      goal.priority
    )),
    /* @__PURE__ */ import_react5.default.createElement(
      import_ui5.Progress,
      {
        value: goal.progress || 0,
        className: "mt-2"
      }
    ),
    /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between text-xs text-muted-foreground" }, /* @__PURE__ */ import_react5.default.createElement("span", null, goal.status), /* @__PURE__ */ import_react5.default.createElement("span", null, "Target:", " ", new Date(goal.targetDate).toLocaleDateString()))
  )) : /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground" }, "No strategic goals defined"))), /* @__PURE__ */ import_react5.default.createElement(import_ui5.TabsContent, { value: "workstreams", className: "space-y-4" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react5.default.createElement("h4", { className: "font-medium" }, "Work Stream Allocations"), ((_w = selectedContract.workStreams) == null ? void 0 : _w.length) > 0 ? /* @__PURE__ */ import_react5.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, selectedContract.workStreams.map((ws) => {
    var _a3;
    return /* @__PURE__ */ import_react5.default.createElement(import_ui5.Card, { key: ws.workStreamId }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardTitle, { className: "text-sm" }, ws.workStreamName), /* @__PURE__ */ import_react5.default.createElement(import_ui5.Badge, { variant: "outline" }, ws.allocation, "%"))), /* @__PURE__ */ import_react5.default.createElement(import_ui5.CardContent, { className: "space-y-2" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs font-medium" }, "Lead"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-sm text-muted-foreground" }, ws.lead)), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs font-medium" }, "Team Size"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-sm text-muted-foreground" }, ((_a3 = ws.teamMembers) == null ? void 0 : _a3.length) || 0, " members")), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs font-medium" }, "Status"), /* @__PURE__ */ import_react5.default.createElement(
      import_ui5.Badge,
      {
        variant: ws.status === "active" ? "default" : "secondary",
        className: "mt-1"
      },
      ws.status
    ))));
  })) : /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground" }, "No work stream allocations defined")))))))));
}
var import_react5, import_api5, import_hooks4, import_ui5, import_dynamic3, page_default4;
var init_page4 = __esm({
  "src/app/pages/ops/contracts/page.tsx"() {
    "use strict";
    "use client";
    import_react5 = __toESM(require("react"), 1);
    import_api5 = require("@captify-io/platform/lib/api");
    import_hooks4 = require("@captify-io/platform/hooks");
    import_ui5 = require("@captify-io/platform/components/ui");
    import_dynamic3 = require("lucide-react/dynamic");
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
function InsightsPage() {
  const { session } = (0, import_hooks5.useCaptify)();
  const [insights, setInsights] = (0, import_react6.useState)([]);
  const [predictions, setPredictions] = (0, import_react6.useState)([]);
  const [recommendations, setRecommendations] = (0, import_react6.useState)([]);
  const [query, setQuery] = (0, import_react6.useState)("");
  const [queryResult, setQueryResult] = (0, import_react6.useState)(null);
  const [loading, setLoading] = (0, import_react6.useState)(true);
  (0, import_react6.useEffect)(() => {
    loadIntelligenceData();
  }, []);
  const loadIntelligenceData = async () => {
    try {
      const insightsResponse = await import_api6.apiClient.run({
        service: "intelligence",
        operation: "getInsights",
        data: {}
      });
      setInsights(insightsResponse.data || []);
      const predictionsResponse = await import_api6.apiClient.run({
        service: "intelligence",
        operation: "generatePredictions",
        data: { horizon: 90 }
      });
      setPredictions(predictionsResponse.data || []);
      const recommendationsResponse = await import_api6.apiClient.run({
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
      const response = await import_api6.apiClient.run({
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
  return /* @__PURE__ */ import_react6.default.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ import_react6.default.createElement("h1", { className: "text-3xl font-bold mb-6" }, "AI Intelligence"), /* @__PURE__ */ import_react6.default.createElement(import_ui6.Card, { className: "mb-6" }, /* @__PURE__ */ import_react6.default.createElement(import_ui6.CardHeader, null, /* @__PURE__ */ import_react6.default.createElement(import_ui6.CardTitle, null, "Ask the AI")), /* @__PURE__ */ import_react6.default.createElement(import_ui6.CardContent, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react6.default.createElement(
    "input",
    {
      type: "text",
      value: query,
      onChange: (e) => setQuery(e.target.value),
      placeholder: "Ask about your business performance, risks, or opportunities...",
      className: "flex-1 px-3 py-2 border rounded-md",
      onKeyPress: (e) => e.key === "Enter" && handleQuery()
    }
  ), /* @__PURE__ */ import_react6.default.createElement(
    "button",
    {
      onClick: handleQuery,
      className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    },
    "Ask"
  )), queryResult && /* @__PURE__ */ import_react6.default.createElement("div", { className: "mt-4 p-4 bg-gray-50 rounded-md" }, /* @__PURE__ */ import_react6.default.createElement("p", { className: "font-medium" }, "Answer:"), /* @__PURE__ */ import_react6.default.createElement("p", null, queryResult.response), /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-sm text-muted-foreground mt-2" }, "Confidence: ", Math.round((queryResult.confidence || 0) * 100), "%")))), /* @__PURE__ */ import_react6.default.createElement(import_ui6.Card, { className: "mb-6" }, /* @__PURE__ */ import_react6.default.createElement(import_ui6.CardHeader, null, /* @__PURE__ */ import_react6.default.createElement(import_ui6.CardTitle, null, "Latest Insights")), /* @__PURE__ */ import_react6.default.createElement(import_ui6.CardContent, null, loading ? /* @__PURE__ */ import_react6.default.createElement("p", null, "Loading insights...") : insights.length > 0 ? /* @__PURE__ */ import_react6.default.createElement("div", { className: "space-y-4" }, insights.map((insight) => /* @__PURE__ */ import_react6.default.createElement(
    "div",
    {
      key: insight.id,
      className: "border-l-4 border-blue-500 pl-4"
    },
    /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ import_react6.default.createElement(
      "h3",
      {
        className: `font-semibold ${getInsightTypeColor(
          insight.type
        )}`
      },
      insight.title
    ), /* @__PURE__ */ import_react6.default.createElement("span", { className: "text-xs bg-gray-200 px-2 py-1 rounded" }, insight.category)),
    /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, insight.description),
    /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-xs text-muted-foreground mt-2" }, "Confidence: ", Math.round((insight.confidence || 0) * 100), "% \u2022 Impact: ", insight.impact)
  ))) : /* @__PURE__ */ import_react6.default.createElement("p", null, "No insights available"))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" }, /* @__PURE__ */ import_react6.default.createElement(import_ui6.Card, null, /* @__PURE__ */ import_react6.default.createElement(import_ui6.CardHeader, null, /* @__PURE__ */ import_react6.default.createElement(import_ui6.CardTitle, null, "Predictions")), /* @__PURE__ */ import_react6.default.createElement(import_ui6.CardContent, null, loading ? /* @__PURE__ */ import_react6.default.createElement("p", null, "Loading predictions...") : predictions.length > 0 ? /* @__PURE__ */ import_react6.default.createElement("div", { className: "space-y-4" }, predictions.map((prediction) => /* @__PURE__ */ import_react6.default.createElement("div", { key: prediction.id, className: "p-3 border rounded-lg" }, /* @__PURE__ */ import_react6.default.createElement("h4", { className: "font-medium" }, prediction.metric), /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex justify-between mt-2" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "text-sm" }, "Current:"), /* @__PURE__ */ import_react6.default.createElement("span", { className: "font-medium" }, typeof prediction.currentValue === "number" ? prediction.currentValue.toLocaleString() : prediction.currentValue)), /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "text-sm" }, "Predicted:"), /* @__PURE__ */ import_react6.default.createElement("span", { className: "font-medium text-blue-600" }, typeof prediction.predictedValue === "number" ? prediction.predictedValue.toLocaleString() : prediction.predictedValue)), /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-xs text-muted-foreground mt-2" }, Math.round((prediction.confidence || 0) * 100), "% confidence \u2022 ", prediction.horizon, " days")))) : /* @__PURE__ */ import_react6.default.createElement("p", null, "No predictions available"))), /* @__PURE__ */ import_react6.default.createElement(import_ui6.Card, null, /* @__PURE__ */ import_react6.default.createElement(import_ui6.CardHeader, null, /* @__PURE__ */ import_react6.default.createElement(import_ui6.CardTitle, null, "Recommendations")), /* @__PURE__ */ import_react6.default.createElement(import_ui6.CardContent, null, loading ? /* @__PURE__ */ import_react6.default.createElement("p", null, "Loading recommendations...") : recommendations.length > 0 ? /* @__PURE__ */ import_react6.default.createElement("div", { className: "space-y-4" }, recommendations.map((rec) => /* @__PURE__ */ import_react6.default.createElement(
    "div",
    {
      key: rec.id,
      className: `p-3 border-l-4 rounded ${getPriorityColor(
        rec.priority
      )}`
    },
    /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ import_react6.default.createElement("h4", { className: "font-medium" }, rec.title), /* @__PURE__ */ import_react6.default.createElement(
      "span",
      {
        className: `text-xs px-2 py-1 rounded ${rec.priority === "critical" ? "bg-red-200 text-red-800" : rec.priority === "high" ? "bg-orange-200 text-orange-800" : rec.priority === "medium" ? "bg-yellow-200 text-yellow-800" : "bg-blue-200 text-blue-800"}`
      },
      rec.priority
    )),
    /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-sm mt-1" }, rec.description),
    /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-sm font-medium mt-2" }, "Action: ", rec.action),
    /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, "Impact: ", rec.impact, " \u2022 Effort: ", rec.effort)
  ))) : /* @__PURE__ */ import_react6.default.createElement("p", null, "No recommendations available")))));
}
var import_react6, import_hooks5, import_api6, import_ui6, page_default5;
var init_page5 = __esm({
  "src/app/pages/ops/insights/page.tsx"() {
    "use strict";
    "use client";
    import_react6 = __toESM(require("react"), 1);
    import_hooks5 = require("@captify-io/platform/hooks");
    import_api6 = require("@captify-io/platform/lib/api");
    import_ui6 = require("@captify-io/platform/components/ui");
    page_default5 = InsightsPage;
  }
});

// src/app/pages/ops/performance/page.tsx
var page_exports6 = {};
__export(page_exports6, {
  default: () => page_default6
});
function PerformancePage() {
  var _a2, _b2, _c2;
  const { session } = (0, import_hooks6.useCaptify)();
  const [businessHealth, setBusinessHealth] = (0, import_react7.useState)(null);
  const [burnAnalysis, setBurnAnalysis] = (0, import_react7.useState)(null);
  const [loading, setLoading] = (0, import_react7.useState)(true);
  (0, import_react7.useEffect)(() => {
    loadPerformanceData();
  }, []);
  const loadPerformanceData = async () => {
    try {
      const healthResponse = await import_api7.apiClient.run({
        service: "performance",
        operation: "getBusinessHealth",
        data: {}
      });
      setBusinessHealth(healthResponse.data || null);
      const burnResponse = await import_api7.apiClient.run({
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
  return /* @__PURE__ */ import_react7.default.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ import_react7.default.createElement("h1", { className: "text-3xl font-bold mb-6" }, "Performance Analytics"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" }, /* @__PURE__ */ import_react7.default.createElement(import_ui7.Card, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardTitle, { className: "text-sm" }, "Overall Health")), /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardContent, null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-2xl font-bold text-green-600" }, loading ? "..." : (businessHealth == null ? void 0 : businessHealth.overallScore) || 0), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Health Score"))), /* @__PURE__ */ import_react7.default.createElement(import_ui7.Card, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardTitle, { className: "text-sm" }, "Monthly Revenue")), /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardContent, null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-2xl font-bold text-blue-600" }, loading ? "..." : formatCurrency(((_a2 = businessHealth == null ? void 0 : businessHealth.financial) == null ? void 0 : _a2.revenue) || 0)), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Current Month"))), /* @__PURE__ */ import_react7.default.createElement(import_ui7.Card, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardTitle, { className: "text-sm" }, "Profit Margin")), /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardContent, null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-2xl font-bold text-purple-600" }, loading ? "..." : `${Math.round(
    ((_b2 = businessHealth == null ? void 0 : businessHealth.financial) == null ? void 0 : _b2.profitMargin) || 0
  )}%`), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Current Margin"))), /* @__PURE__ */ import_react7.default.createElement(import_ui7.Card, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardTitle, { className: "text-sm" }, "Team Utilization")), /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardContent, null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-2xl font-bold text-orange-600" }, loading ? "..." : `${((_c2 = businessHealth == null ? void 0 : businessHealth.employee) == null ? void 0 : _c2.utilization) || 0}%`), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Current Rate")))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" }, /* @__PURE__ */ import_react7.default.createElement(import_ui7.Card, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardTitle, null, "Financial Health")), /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardContent, null, loading ? /* @__PURE__ */ import_react7.default.createElement("p", null, "Loading...") : (businessHealth == null ? void 0 : businessHealth.financial) ? /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Revenue:"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-medium" }, formatCurrency(businessHealth.financial.revenue))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Costs:"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-medium" }, formatCurrency(businessHealth.financial.costs))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Profit:"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-medium text-green-600" }, formatCurrency(businessHealth.financial.profit))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Runway:"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-medium" }, Math.round(businessHealth.financial.runway), " months")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Backlog:"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-medium" }, formatCurrency(businessHealth.financial.backlog)))) : /* @__PURE__ */ import_react7.default.createElement("p", null, "No financial data available"))), /* @__PURE__ */ import_react7.default.createElement(import_ui7.Card, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardTitle, null, "Employee Metrics")), /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardContent, null, loading ? /* @__PURE__ */ import_react7.default.createElement("p", null, "Loading...") : (businessHealth == null ? void 0 : businessHealth.employee) ? /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Headcount:"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-medium" }, businessHealth.employee.headcount)), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Utilization:"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-medium" }, businessHealth.employee.utilization, "%")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Satisfaction:"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-medium" }, businessHealth.employee.satisfaction, "/5.0")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Retention:"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-medium" }, businessHealth.employee.retention, "%")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Value/Employee:"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-medium" }, formatCurrency(businessHealth.employee.valuePerEmployee)))) : /* @__PURE__ */ import_react7.default.createElement("p", null, "No employee data available")))), /* @__PURE__ */ import_react7.default.createElement(import_ui7.Card, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardTitle, null, "Monthly Burn Analysis")), /* @__PURE__ */ import_react7.default.createElement(import_ui7.CardContent, null, loading ? /* @__PURE__ */ import_react7.default.createElement("p", null, "Loading...") : burnAnalysis ? /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement("h4", { className: "font-semibold mb-2" }, "Revenue"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-2xl font-bold text-green-600" }, formatCurrency(burnAnalysis.revenue))), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement("h4", { className: "font-semibold mb-2" }, "Total Costs"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-2xl font-bold text-red-600" }, formatCurrency(burnAnalysis.totalCosts))), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement("h4", { className: "font-semibold mb-2" }, "Net Profit"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-2xl font-bold text-blue-600" }, formatCurrency(burnAnalysis.profit))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "mt-4" }, /* @__PURE__ */ import_react7.default.createElement("h4", { className: "font-semibold mb-2" }, "Efficiency"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-lg" }, burnAnalysis.efficiency, "% cost efficiency"))) : /* @__PURE__ */ import_react7.default.createElement("p", null, "No burn analysis data available"))));
}
var import_react7, import_hooks6, import_api7, import_ui7, page_default6;
var init_page6 = __esm({
  "src/app/pages/ops/performance/page.tsx"() {
    "use strict";
    "use client";
    import_react7 = __toESM(require("react"), 1);
    import_hooks6 = require("@captify-io/platform/hooks");
    import_api7 = require("@captify-io/platform/lib/api");
    import_ui7 = require("@captify-io/platform/components/ui");
    page_default6 = PerformancePage;
  }
});

// src/app/pages/services/page.tsx
var page_exports7 = {};
__export(page_exports7, {
  default: () => page_default7
});
function ServicesHubPage() {
  var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
  const { session } = (0, import_hooks7.useCaptify)();
  const [marketplace, setMarketplace] = (0, import_react8.useState)(null);
  const [catalog, setCatalog] = (0, import_react8.useState)([]);
  const [loading, setLoading] = (0, import_react8.useState)(true);
  const [showCreateTicket, setShowCreateTicket] = (0, import_react8.useState)(false);
  const [newTicket, setNewTicket] = (0, import_react8.useState)({
    title: "",
    description: "",
    serviceArea: "DevOps",
    type: "request",
    priority: "medium",
    bounty: 0
  });
  (0, import_react8.useEffect)(() => {
    loadMarketplace();
    loadCatalog();
  }, []);
  const loadMarketplace = async () => {
    var _a3;
    try {
      const response = await import_api8.apiClient.run({
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
      const response = await import_api8.apiClient.run({
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
      await import_api8.apiClient.run({
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
      await import_api8.apiClient.run({
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
    return /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center justify-center h-96" }, "Loading...");
  }
  return /* @__PURE__ */ import_react8.default.createElement("div", { className: "container mx-auto p-6 space-y-6" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("h1", { className: "text-3xl font-bold" }, "Services Hub"), /* @__PURE__ */ import_react8.default.createElement("p", { className: "text-muted-foreground" }, "Internal service marketplace")), /* @__PURE__ */ import_react8.default.createElement(import_ui8.Button, { onClick: () => setShowCreateTicket(true) }, /* @__PURE__ */ import_react8.default.createElement(import_dynamic4.DynamicIcon, { name: "plus", className: "h-4 w-4 mr-2" }), "Create Ticket")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4" }, /* @__PURE__ */ import_react8.default.createElement(import_ui8.Card, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardTitle, { className: "text-sm" }, "Available Tickets")), /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardContent, null, /* @__PURE__ */ import_react8.default.createElement("div", { className: "text-2xl font-bold" }, ((_b2 = (_a2 = marketplace == null ? void 0 : marketplace.available) == null ? void 0 : _a2.urgent) == null ? void 0 : _b2.length) + ((_d = (_c2 = marketplace == null ? void 0 : marketplace.available) == null ? void 0 : _c2.highBounty) == null ? void 0 : _d.length) || 0), /* @__PURE__ */ import_react8.default.createElement("p", { className: "text-xs text-muted-foreground" }, "$", (marketplace == null ? void 0 : marketplace.potentialEarnings) || 0, " potential"))), /* @__PURE__ */ import_react8.default.createElement(import_ui8.Card, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardTitle, { className: "text-sm" }, "My Active")), /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardContent, null, /* @__PURE__ */ import_react8.default.createElement("div", { className: "text-2xl font-bold" }, ((_f = (_e = marketplace == null ? void 0 : marketplace.myTickets) == null ? void 0 : _e.assigned) == null ? void 0 : _f.length) || 0), /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center text-xs text-muted-foreground" }, /* @__PURE__ */ import_react8.default.createElement(import_dynamic4.DynamicIcon, { name: "clock", className: "h-3 w-3 mr-1" }), "In progress"))), /* @__PURE__ */ import_react8.default.createElement(import_ui8.Card, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardTitle, { className: "text-sm" }, "My Requests")), /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardContent, null, /* @__PURE__ */ import_react8.default.createElement("div", { className: "text-2xl font-bold" }, ((_h = (_g = marketplace == null ? void 0 : marketplace.myTickets) == null ? void 0 : _g.requested) == null ? void 0 : _h.length) || 0), /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center text-xs text-muted-foreground" }, /* @__PURE__ */ import_react8.default.createElement(import_dynamic4.DynamicIcon, { name: "ticket", className: "h-3 w-3 mr-1" }), "Submitted"))), /* @__PURE__ */ import_react8.default.createElement(import_ui8.Card, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardTitle, { className: "text-sm" }, "Leaderboard Rank")), /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardContent, null, /* @__PURE__ */ import_react8.default.createElement("div", { className: "text-2xl font-bold" }, "#5"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center text-xs text-muted-foreground" }, /* @__PURE__ */ import_react8.default.createElement(import_dynamic4.DynamicIcon, { name: "star", className: "h-3 w-3 mr-1" }), "Top performer")))), /* @__PURE__ */ import_react8.default.createElement(import_ui8.Card, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardHeader, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardTitle, null, "Service Marketplace")), /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardContent, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.Tabs, { defaultValue: "available" }, /* @__PURE__ */ import_react8.default.createElement(import_ui8.TabsList, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.TabsTrigger, { value: "available" }, "Available"), /* @__PURE__ */ import_react8.default.createElement(import_ui8.TabsTrigger, { value: "mytickets" }, "My Tickets"), /* @__PURE__ */ import_react8.default.createElement(import_ui8.TabsTrigger, { value: "catalog" }, "Service Catalog"), /* @__PURE__ */ import_react8.default.createElement(import_ui8.TabsTrigger, { value: "leaderboard" }, "Leaderboard")), /* @__PURE__ */ import_react8.default.createElement(import_ui8.TabsContent, { value: "available", className: "space-y-4" }, ((_j = (_i = marketplace == null ? void 0 : marketplace.available) == null ? void 0 : _i.urgent) == null ? void 0 : _j.length) > 0 && /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("h4", { className: "font-medium mb-3 flex items-center gap-2" }, /* @__PURE__ */ import_react8.default.createElement(import_ui8.Badge, { variant: "destructive" }, "Urgent"), "High Priority Tickets"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-3" }, marketplace.available.urgent.map((ticket) => /* @__PURE__ */ import_react8.default.createElement(
    TicketCard,
    {
      key: ticket.id,
      ticket,
      onClaim: claimTicket
    }
  )))), ((_l = (_k = marketplace == null ? void 0 : marketplace.available) == null ? void 0 : _k.highBounty) == null ? void 0 : _l.length) > 0 && /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("h4", { className: "font-medium mb-3 flex items-center gap-2" }, /* @__PURE__ */ import_react8.default.createElement(import_dynamic4.DynamicIcon, { name: "dollar-sign", className: "h-4 w-4" }), "High Bounty"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-3" }, marketplace.available.highBounty.map((ticket) => /* @__PURE__ */ import_react8.default.createElement(
    TicketCard,
    {
      key: ticket.id,
      ticket,
      onClaim: claimTicket
    }
  ))))), /* @__PURE__ */ import_react8.default.createElement(import_ui8.TabsContent, { value: "mytickets", className: "space-y-4" }, /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("h4", { className: "font-medium mb-3" }, "Assigned to Me"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-3" }, (_n = (_m = marketplace == null ? void 0 : marketplace.myTickets) == null ? void 0 : _m.assigned) == null ? void 0 : _n.map((ticket) => /* @__PURE__ */ import_react8.default.createElement(TicketCard, { key: ticket.id, ticket, assigned: true })))), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("h4", { className: "font-medium mb-3" }, "My Requests"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-3" }, (_p = (_o = marketplace == null ? void 0 : marketplace.myTickets) == null ? void 0 : _o.requested) == null ? void 0 : _p.map((ticket) => /* @__PURE__ */ import_react8.default.createElement(TicketCard, { key: ticket.id, ticket, requested: true }))))), /* @__PURE__ */ import_react8.default.createElement(import_ui8.TabsContent, { value: "catalog", className: "space-y-3" }, catalog.map((service) => /* @__PURE__ */ import_react8.default.createElement("div", { key: service.id, className: "p-4 rounded-lg border" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("h4", { className: "font-medium" }, service.service), /* @__PURE__ */ import_react8.default.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, service.description), /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex gap-2 mt-2" }, /* @__PURE__ */ import_react8.default.createElement(import_ui8.Badge, { variant: "outline" }, service.serviceArea), /* @__PURE__ */ import_react8.default.createElement(import_ui8.Badge, { variant: "outline" }, service.complexity), /* @__PURE__ */ import_react8.default.createElement(import_ui8.Badge, { variant: "outline" }, service.estimatedTime, "h"))), service.selfService && /* @__PURE__ */ import_react8.default.createElement(import_ui8.Button, { size: "sm" }, "Request"))))), /* @__PURE__ */ import_react8.default.createElement(import_ui8.TabsContent, { value: "leaderboard" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-3" }, (_q = marketplace == null ? void 0 : marketplace.leaderboard) == null ? void 0 : _q.map((entry, idx) => /* @__PURE__ */ import_react8.default.createElement(
    "div",
    {
      key: entry.userId,
      className: "flex items-center justify-between p-4 rounded-lg border"
    },
    /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "text-2xl font-bold" }, "#", idx + 1), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("p", { className: "font-medium" }, entry.userId), /* @__PURE__ */ import_react8.default.createElement("p", { className: "text-sm text-muted-foreground" }, entry.ticketsResolved, " resolved"))),
    /* @__PURE__ */ import_react8.default.createElement("div", { className: "text-right" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react8.default.createElement(import_dynamic4.DynamicIcon, { name: "star", className: "h-4 w-4 text-yellow-500" }), /* @__PURE__ */ import_react8.default.createElement("span", { className: "font-medium" }, entry.satisfaction, "%")), /* @__PURE__ */ import_react8.default.createElement("p", { className: "text-sm text-muted-foreground" }, "$", entry.earnings, " earned"))
  ))))))), showCreateTicket && /* @__PURE__ */ import_react8.default.createElement("div", { className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" }, /* @__PURE__ */ import_react8.default.createElement(import_ui8.Card, { className: "w-full max-w-lg" }, /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardHeader, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardTitle, null, "Create Service Ticket")), /* @__PURE__ */ import_react8.default.createElement(import_ui8.CardContent, { className: "space-y-4" }, /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("label", { className: "text-sm font-medium" }, "Title"), /* @__PURE__ */ import_react8.default.createElement(
    import_ui8.Input,
    {
      value: newTicket.title,
      onChange: (e) => setNewTicket(__spreadProps(__spreadValues({}, newTicket), { title: e.target.value })),
      placeholder: "Brief description of what you need"
    }
  )), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("label", { className: "text-sm font-medium" }, "Description"), /* @__PURE__ */ import_react8.default.createElement(
    import_ui8.Textarea,
    {
      value: newTicket.description,
      onChange: (e) => setNewTicket(__spreadProps(__spreadValues({}, newTicket), { description: e.target.value })),
      placeholder: "Detailed description and acceptance criteria",
      rows: 4
    }
  )), /* @__PURE__ */ import_react8.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("label", { className: "text-sm font-medium" }, "Service Area"), /* @__PURE__ */ import_react8.default.createElement(
    import_ui8.Select,
    {
      value: newTicket.serviceArea,
      onValueChange: (value) => setNewTicket(__spreadProps(__spreadValues({}, newTicket), { serviceArea: value }))
    },
    /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectTrigger, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectValue, null)),
    /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectContent, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectItem, { value: "DevOps" }, "DevOps"), /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectItem, { value: "DataOps" }, "DataOps"), /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectItem, { value: "PlatformOps" }, "PlatformOps"), /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectItem, { value: "HelpDesk" }, "Help Desk"), /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectItem, { value: "Security" }, "Security"))
  )), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("label", { className: "text-sm font-medium" }, "Priority"), /* @__PURE__ */ import_react8.default.createElement(
    import_ui8.Select,
    {
      value: newTicket.priority,
      onValueChange: (value) => setNewTicket(__spreadProps(__spreadValues({}, newTicket), { priority: value }))
    },
    /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectTrigger, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectValue, null)),
    /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectContent, null, /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectItem, { value: "low" }, "Low"), /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectItem, { value: "medium" }, "Medium"), /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectItem, { value: "high" }, "High"), /* @__PURE__ */ import_react8.default.createElement(import_ui8.SelectItem, { value: "critical" }, "Critical"))
  ))), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("label", { className: "text-sm font-medium" }, "Bounty (optional)"), /* @__PURE__ */ import_react8.default.createElement(
    import_ui8.Input,
    {
      type: "number",
      value: newTicket.bounty,
      onChange: (e) => setNewTicket(__spreadProps(__spreadValues({}, newTicket), {
        bounty: parseInt(e.target.value) || 0
      })),
      placeholder: "Incentive amount for faster completion"
    }
  )), /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react8.default.createElement(import_ui8.Button, { onClick: createTicket, className: "flex-1" }, "Create Ticket"), /* @__PURE__ */ import_react8.default.createElement(
    import_ui8.Button,
    {
      onClick: () => setShowCreateTicket(false),
      variant: "outline",
      className: "flex-1"
    },
    "Cancel"
  ))))));
}
function TicketCard({ ticket, onClaim, assigned, requested }) {
  return /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center justify-between p-4 rounded-lg border bg-card" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react8.default.createElement("h4", { className: "font-medium" }, ticket.title), /* @__PURE__ */ import_react8.default.createElement(
    import_ui8.Badge,
    {
      variant: ticket.priority === "critical" ? "destructive" : "default"
    },
    ticket.priority
  )), /* @__PURE__ */ import_react8.default.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, ticket.description), /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center gap-4 mt-2" }, /* @__PURE__ */ import_react8.default.createElement(import_ui8.Badge, { variant: "outline" }, ticket.serviceArea), ticket.bounty > 0 && /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center text-sm" }, /* @__PURE__ */ import_react8.default.createElement(import_dynamic4.DynamicIcon, { name: "dollar-sign", className: "h-3 w-3" }), ticket.bounty), ticket.sla && /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center text-sm text-muted-foreground" }, /* @__PURE__ */ import_react8.default.createElement(import_dynamic4.DynamicIcon, { name: "clock", className: "h-3 w-3 mr-1" }), "SLA: ", ticket.sla, "h"))), !assigned && !requested && onClaim && /* @__PURE__ */ import_react8.default.createElement(import_ui8.Button, { onClick: () => onClaim(ticket.id), size: "sm" }, "Claim"), assigned && /* @__PURE__ */ import_react8.default.createElement(import_ui8.Badge, { variant: "default" }, "In Progress"), requested && /* @__PURE__ */ import_react8.default.createElement(import_ui8.Badge, { variant: "outline" }, ticket.status));
}
var import_react8, import_hooks7, import_api8, import_ui8, import_dynamic4, page_default7;
var init_page7 = __esm({
  "src/app/pages/services/page.tsx"() {
    "use strict";
    "use client";
    import_react8 = __toESM(require("react"), 1);
    import_hooks7 = require("@captify-io/platform/hooks");
    import_api8 = require("@captify-io/platform/lib/api");
    import_ui8 = require("@captify-io/platform/components/ui");
    import_dynamic4 = require("lucide-react/dynamic");
    page_default7 = ServicesHubPage;
  }
});

// src/app/pages/strategic/page.tsx
var page_exports8 = {};
__export(page_exports8, {
  default: () => page_default8
});
function StrategicPage() {
  const { session } = (0, import_hooks8.useCaptify)();
  const [objectives, setObjectives] = (0, import_react9.useState)([]);
  const [alignment, setAlignment] = (0, import_react9.useState)(null);
  const [loading, setLoading] = (0, import_react9.useState)(true);
  (0, import_react9.useEffect)(() => {
    loadStrategicData();
  }, []);
  const loadStrategicData = async () => {
    var _a2;
    try {
      const objectivesResponse = await import_api9.apiClient.run({
        service: "strategic",
        operation: "getObjectivesHierarchy",
        data: {}
      });
      setObjectives(objectivesResponse.data || []);
      const alignmentResponse = await import_api9.apiClient.run({
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
  return /* @__PURE__ */ import_react9.default.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ import_react9.default.createElement("h1", { className: "text-3xl font-bold mb-6" }, "Strategic Alignment"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" }, /* @__PURE__ */ import_react9.default.createElement(import_ui9.Card, null, /* @__PURE__ */ import_react9.default.createElement(import_ui9.CardHeader, null, /* @__PURE__ */ import_react9.default.createElement(import_ui9.CardTitle, null, "Strategic Alignment Score")), /* @__PURE__ */ import_react9.default.createElement(import_ui9.CardContent, null, loading ? /* @__PURE__ */ import_react9.default.createElement("p", null, "Loading...") : alignment ? /* @__PURE__ */ import_react9.default.createElement("div", null, /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-3xl font-bold text-blue-600 mb-2" }, Math.round(alignment.alignmentScore), "%"), /* @__PURE__ */ import_react9.default.createElement("p", { className: "text-sm text-muted-foreground" }, alignment.strategicHours, " of ", alignment.totalHours, " hours aligned")) : /* @__PURE__ */ import_react9.default.createElement("p", null, "No alignment data available"))), /* @__PURE__ */ import_react9.default.createElement(import_ui9.Card, null, /* @__PURE__ */ import_react9.default.createElement(import_ui9.CardHeader, null, /* @__PURE__ */ import_react9.default.createElement(import_ui9.CardTitle, null, "Work Breakdown")), /* @__PURE__ */ import_react9.default.createElement(import_ui9.CardContent, null, loading ? /* @__PURE__ */ import_react9.default.createElement("p", null, "Loading...") : (alignment == null ? void 0 : alignment.workBreakdown) ? /* @__PURE__ */ import_react9.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react9.default.createElement("span", null, "Strategic:"), /* @__PURE__ */ import_react9.default.createElement("span", { className: "font-medium" }, alignment.workBreakdown.strategic)), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react9.default.createElement("span", null, "Operational:"), /* @__PURE__ */ import_react9.default.createElement("span", { className: "font-medium" }, alignment.workBreakdown.operational)), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react9.default.createElement("span", null, "Maintenance:"), /* @__PURE__ */ import_react9.default.createElement("span", { className: "font-medium" }, alignment.workBreakdown.maintenance))) : /* @__PURE__ */ import_react9.default.createElement("p", null, "No breakdown data available")))), /* @__PURE__ */ import_react9.default.createElement(import_ui9.Card, null, /* @__PURE__ */ import_react9.default.createElement(import_ui9.CardHeader, null, /* @__PURE__ */ import_react9.default.createElement(import_ui9.CardTitle, null, "Strategic Objectives")), /* @__PURE__ */ import_react9.default.createElement(import_ui9.CardContent, null, loading ? /* @__PURE__ */ import_react9.default.createElement("p", null, "Loading objectives...") : objectives.length > 0 ? /* @__PURE__ */ import_react9.default.createElement("div", { className: "space-y-4" }, objectives.map((objective) => /* @__PURE__ */ import_react9.default.createElement(
    "div",
    {
      key: objective.id,
      className: "border-l-4 border-blue-500 pl-4"
    },
    /* @__PURE__ */ import_react9.default.createElement("h3", { className: "font-semibold" }, objective.statement),
    /* @__PURE__ */ import_react9.default.createElement("p", { className: "text-sm text-muted-foreground" }, objective.vision),
    objective.children && objective.children.length > 0 && /* @__PURE__ */ import_react9.default.createElement("div", { className: "ml-4 mt-2 space-y-2" }, objective.children.map((child) => /* @__PURE__ */ import_react9.default.createElement("div", { key: child.id, className: "text-sm" }, "\u2022 ", child.statement)))
  ))) : /* @__PURE__ */ import_react9.default.createElement("p", null, "No strategic objectives defined"))));
}
var import_react9, import_hooks8, import_api9, import_ui9, page_default8;
var init_page8 = __esm({
  "src/app/pages/strategic/page.tsx"() {
    "use strict";
    "use client";
    import_react9 = __toESM(require("react"), 1);
    import_hooks8 = require("@captify-io/platform/hooks");
    import_api9 = require("@captify-io/platform/lib/api");
    import_ui9 = require("@captify-io/platform/components/ui");
    page_default8 = StrategicPage;
  }
});

// src/app/pages/work/page.tsx
var page_exports9 = {};
__export(page_exports9, {
  default: () => page_default9
});
function WorkDashboardPage() {
  var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i;
  const { session } = (0, import_hooks9.useCaptify)();
  const [activeWork, setActiveWork] = (0, import_react10.useState)(null);
  const [workQueue, setWorkQueue] = (0, import_react10.useState)(null);
  const [productivity, setProductivity] = (0, import_react10.useState)(null);
  const [loading, setLoading] = (0, import_react10.useState)(true);
  const [timer, setTimer] = (0, import_react10.useState)(0);
  (0, import_react10.useEffect)(() => {
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
        import_api10.apiClient.run({
          service: "work",
          operation: "getWorkQueue",
          data: { userId: (_a3 = session == null ? void 0 : session.user) == null ? void 0 : _a3.id }
        }),
        import_api10.apiClient.run({
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
      const workSession = await import_api10.apiClient.run({
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
      await import_api10.apiClient.run({
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
    return /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center justify-center h-96" }, "Loading...");
  }
  return /* @__PURE__ */ import_react10.default.createElement("div", { className: "container mx-auto p-6 space-y-6" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("h1", { className: "text-3xl font-bold" }, "My Work"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-muted-foreground" }, "Focus on value delivery"))), activeWork ? /* @__PURE__ */ import_react10.default.createElement(import_ui10.Card, { className: "border-primary" }, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardHeader, null, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardTitle, { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react10.default.createElement(import_dynamic5.DynamicIcon, { name: "play", className: "h-5 w-5 text-green-500" }), "Current Focus"), /* @__PURE__ */ import_react10.default.createElement(import_ui10.Badge, { variant: "default" }, formatTime(timer)))), /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardContent, { className: "space-y-4" }, /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("h3", { className: "font-semibold text-lg" }, activeWork.title), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, activeWork.description)), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react10.default.createElement(import_ui10.Badge, null, activeWork.type), /* @__PURE__ */ import_react10.default.createElement(import_ui10.Badge, { variant: "outline" }, "Value: ", activeWork.valueScore, "/10"), /* @__PURE__ */ import_react10.default.createElement(import_ui10.Badge, { variant: "outline" }, activeWork.complexity)), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react10.default.createElement(
    import_ui10.Button,
    {
      onClick: stopWork,
      variant: "destructive",
      className: "flex-1"
    },
    /* @__PURE__ */ import_react10.default.createElement(import_dynamic5.DynamicIcon, { name: "pause", className: "h-4 w-4 mr-2" }),
    "Stop Work"
  ), /* @__PURE__ */ import_react10.default.createElement(
    import_ui10.Button,
    {
      onClick: () => stopWork(),
      variant: "default",
      className: "flex-1"
    },
    /* @__PURE__ */ import_react10.default.createElement(import_dynamic5.DynamicIcon, { name: "check-circle", className: "h-4 w-4 mr-2" }),
    "Complete"
  )))) : /* @__PURE__ */ import_react10.default.createElement(import_ui10.Card, null, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardHeader, null, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardTitle, null, "Ready to Work")), /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardContent, null, /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-muted-foreground" }, "Select a work item below to start tracking"))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4" }, /* @__PURE__ */ import_react10.default.createElement(import_ui10.Card, null, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardTitle, { className: "text-sm" }, "Today's Progress")), /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardContent, null, /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-2xl font-bold" }, ((_a2 = productivity == null ? void 0 : productivity.totalHours) == null ? void 0 : _a2.toFixed(1)) || 0, "h"), /* @__PURE__ */ import_react10.default.createElement(
    import_ui10.Progress,
    {
      value: (productivity == null ? void 0 : productivity.totalHours) / 8 * 100 || 0,
      className: "mt-2"
    }
  ))), /* @__PURE__ */ import_react10.default.createElement(import_ui10.Card, null, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardTitle, { className: "text-sm" }, "Value Delivered")), /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardContent, null, /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-2xl font-bold" }, "$", ((productivity == null ? void 0 : productivity.totalValue) || 0).toLocaleString()), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-xs text-muted-foreground" }, "ROI: ", ((_b2 = productivity == null ? void 0 : productivity.valuePerHour) == null ? void 0 : _b2.toFixed(0)) || 0, "/hr"))), /* @__PURE__ */ import_react10.default.createElement(import_ui10.Card, null, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardTitle, { className: "text-sm" }, "Strategic Alignment")), /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardContent, null, /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-2xl font-bold" }, ((_c2 = productivity == null ? void 0 : productivity.strategicAlignment) == null ? void 0 : _c2.toFixed(0)) || 0, "%"), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center text-xs text-muted-foreground" }, /* @__PURE__ */ import_react10.default.createElement(import_dynamic5.DynamicIcon, { name: "target", className: "h-3 w-3 mr-1" }), "On critical path"))), /* @__PURE__ */ import_react10.default.createElement(import_ui10.Card, null, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardHeader, { className: "pb-2" }, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardTitle, { className: "text-sm" }, "Focus Time")), /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardContent, null, /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-2xl font-bold" }, ((_d = productivity == null ? void 0 : productivity.focusTime) == null ? void 0 : _d.toFixed(1)) || 0, "h"), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center text-xs text-muted-foreground" }, /* @__PURE__ */ import_react10.default.createElement(import_dynamic5.DynamicIcon, { name: "zap", className: "h-3 w-3 mr-1" }), "Deep work")))), /* @__PURE__ */ import_react10.default.createElement(import_ui10.Card, null, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardHeader, null, /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardTitle, null, "Work Queue")), /* @__PURE__ */ import_react10.default.createElement(import_ui10.CardContent, null, /* @__PURE__ */ import_react10.default.createElement(import_ui10.Tabs, { defaultValue: "recommended" }, /* @__PURE__ */ import_react10.default.createElement(import_ui10.TabsList, { className: "grid w-full grid-cols-5" }, /* @__PURE__ */ import_react10.default.createElement(import_ui10.TabsTrigger, { value: "recommended" }, "Recommended"), /* @__PURE__ */ import_react10.default.createElement(import_ui10.TabsTrigger, { value: "critical" }, "Critical Path"), /* @__PURE__ */ import_react10.default.createElement(import_ui10.TabsTrigger, { value: "quick" }, "Quick Wins"), /* @__PURE__ */ import_react10.default.createElement(import_ui10.TabsTrigger, { value: "debt" }, "Tech Debt"), /* @__PURE__ */ import_react10.default.createElement(import_ui10.TabsTrigger, { value: "blocked" }, "Blocked")), /* @__PURE__ */ import_react10.default.createElement(import_ui10.TabsContent, { value: "recommended", className: "space-y-3" }, (_e = workQueue == null ? void 0 : workQueue.recommended) == null ? void 0 : _e.map((item) => /* @__PURE__ */ import_react10.default.createElement(WorkItem, { key: item.id, item, onStart: startWork }))), /* @__PURE__ */ import_react10.default.createElement(import_ui10.TabsContent, { value: "critical", className: "space-y-3" }, (_f = workQueue == null ? void 0 : workQueue.criticalPath) == null ? void 0 : _f.map((item) => /* @__PURE__ */ import_react10.default.createElement(
    WorkItem,
    {
      key: item.id,
      item,
      onStart: startWork,
      critical: true
    }
  ))), /* @__PURE__ */ import_react10.default.createElement(import_ui10.TabsContent, { value: "quick", className: "space-y-3" }, (_g = workQueue == null ? void 0 : workQueue.quickWins) == null ? void 0 : _g.map((item) => /* @__PURE__ */ import_react10.default.createElement(WorkItem, { key: item.id, item, onStart: startWork }))), /* @__PURE__ */ import_react10.default.createElement(import_ui10.TabsContent, { value: "debt", className: "space-y-3" }, (_h = workQueue == null ? void 0 : workQueue.techDebt) == null ? void 0 : _h.map((item) => /* @__PURE__ */ import_react10.default.createElement(WorkItem, { key: item.id, item, onStart: startWork }))), /* @__PURE__ */ import_react10.default.createElement(import_ui10.TabsContent, { value: "blocked", className: "space-y-3" }, (_i = workQueue == null ? void 0 : workQueue.blocked) == null ? void 0 : _i.map((item) => /* @__PURE__ */ import_react10.default.createElement(WorkItem, { key: item.id, item, blocked: true })))))));
}
function WorkItem({ item, onStart, critical, blocked }) {
  return /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center justify-between p-4 rounded-lg border bg-card" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react10.default.createElement("h4", { className: "font-medium" }, item.title), critical && /* @__PURE__ */ import_react10.default.createElement(import_dynamic5.DynamicIcon, { name: "alert-circle", className: "h-4 w-4 text-red-500" })), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, item.description), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex gap-2 mt-2" }, /* @__PURE__ */ import_react10.default.createElement(import_ui10.Badge, { variant: "outline" }, item.type), /* @__PURE__ */ import_react10.default.createElement(import_ui10.Badge, { variant: "outline" }, item.complexity), /* @__PURE__ */ import_react10.default.createElement(import_ui10.Badge, { variant: "outline" }, item.estimatedHours, "h"), /* @__PURE__ */ import_react10.default.createElement(import_ui10.Badge, { variant: "default" }, "Value: ", item.valueScore))), /* @__PURE__ */ import_react10.default.createElement(import_ui10.Button, { onClick: () => onStart(item), disabled: blocked, size: "sm" }, /* @__PURE__ */ import_react10.default.createElement(import_dynamic5.DynamicIcon, { name: "play", className: "h-4 w-4 mr-1" }), "Start"));
}
var import_react10, import_hooks9, import_api10, import_ui10, import_dynamic5, page_default9;
var init_page9 = __esm({
  "src/app/pages/work/page.tsx"() {
    "use strict";
    "use client";
    import_react10 = __toESM(require("react"), 1);
    import_hooks9 = require("@captify-io/platform/hooks");
    import_api10 = require("@captify-io/platform/lib/api");
    import_ui10 = require("@captify-io/platform/components/ui");
    import_dynamic5 = require("lucide-react/dynamic");
    page_default9 = WorkDashboardPage;
  }
});

// src/components/index.ts
var components_exports = {};
__export(components_exports, {
  PageRouter: () => PageRouter_default
});
module.exports = __toCommonJS(components_exports);

// src/components/PageRouter.tsx
var import_react11 = __toESM(require("react"), 1);

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
            const module2 = await moduleImport();
            return { default: module2.default };
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
  const PageComponent = (0, import_react11.useMemo)(() => {
    const pageImport = pageRegistry[href];
    if (!pageImport) {
      return () => import_react11.default.createElement("div", null, `Page not found: ${href}`);
    }
    return import_react11.default.lazy(pageImport);
  }, [href]);
  return import_react11.default.createElement(
    import_react11.Suspense,
    { fallback: fallback || import_react11.default.createElement("div", null, "Loading...") },
    import_react11.default.createElement(PageComponent)
  );
};
var PageRouter_default = PageRouter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PageRouter
});
