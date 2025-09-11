"use client";
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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CommandCenterPage: () => CommandCenterPage,
  ContractsPage: () => page_default,
  IntelligencePage: () => IntelligencePage,
  MyTicketsPage: () => page_default3,
  PerformancePage: () => PerformancePage,
  ServicesHubPage: () => ServicesHubPage,
  ValueStreamsPage: () => page_default2,
  WorkDashboardPage: () => WorkDashboardPage,
  componentRegistry: () => componentRegistry,
  menuConfiguration: () => menuConfiguration,
  pageRegistry: () => pageRegistry
});
module.exports = __toCommonJS(index_exports);

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

// src/app/pages/ops/insights/page.tsx
var import_react = require("react");
var import_hooks = require("@captify-io/platform/hooks");
var import_api = require("@captify-io/platform/api");
var import_ui = require("@captify-io/platform/ui");
var import_jsx_runtime = require("react/jsx-runtime");
function IntelligencePage() {
  const { session } = (0, import_hooks.useCaptify)();
  const [insights, setInsights] = (0, import_react.useState)([]);
  const [predictions, setPredictions] = (0, import_react.useState)([]);
  const [recommendations, setRecommendations] = (0, import_react.useState)([]);
  const [query, setQuery] = (0, import_react.useState)("");
  const [queryResult, setQueryResult] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(true);
  (0, import_react.useEffect)(() => {
    loadIntelligenceData();
  }, []);
  const loadIntelligenceData = async () => {
    try {
      const insightsResponse = await import_api.apiClient.run({
        service: "intelligence",
        operation: "getInsights",
        data: {}
      });
      setInsights(insightsResponse.data || []);
      const predictionsResponse = await import_api.apiClient.run({
        service: "intelligence",
        operation: "generatePredictions",
        data: { horizon: 90 }
      });
      setPredictions(predictionsResponse.data || []);
      const recommendationsResponse = await import_api.apiClient.run({
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
      const response = await import_api.apiClient.run({
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container mx-auto p-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-3xl font-bold mb-6", children: "AI Intelligence" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Card, { className: "mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.CardTitle, { children: "Ask the AI" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.CardContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "text",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: "Ask about your business performance, risks, or opportunities...",
              className: "flex-1 px-3 py-2 border rounded-md",
              onKeyPress: (e) => e.key === "Enter" && handleQuery()
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              onClick: handleQuery,
              className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
              children: "Ask"
            }
          )
        ] }),
        queryResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-4 p-4 bg-gray-50 rounded-md", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-medium", children: "Answer:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: queryResult.response }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm text-muted-foreground mt-2", children: [
            "Confidence: ",
            Math.round((queryResult.confidence || 0) * 100),
            "%"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Card, { className: "mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.CardTitle, { children: "Latest Insights" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.CardContent, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading insights..." }) : insights.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "space-y-4", children: insights.map((insight) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          className: "border-l-4 border-blue-500 pl-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "h3",
                {
                  className: `font-semibold ${getInsightTypeColor(
                    insight.type
                  )}`,
                  children: insight.title
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs bg-gray-200 px-2 py-1 rounded", children: insight.category })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground mt-1", children: insight.description }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-xs text-muted-foreground mt-2", children: [
              "Confidence: ",
              Math.round((insight.confidence || 0) * 100),
              "% \u2022 Impact: ",
              insight.impact
            ] })
          ]
        },
        insight.id
      )) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No insights available" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.CardTitle, { children: "Predictions" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.CardContent, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading predictions..." }) : predictions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "space-y-4", children: predictions.map((prediction) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "p-3 border rounded-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { className: "font-medium", children: prediction.metric }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between mt-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm", children: "Current:" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium", children: typeof prediction.currentValue === "number" ? prediction.currentValue.toLocaleString() : prediction.currentValue })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm", children: "Predicted:" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-blue-600", children: typeof prediction.predictedValue === "number" ? prediction.predictedValue.toLocaleString() : prediction.predictedValue })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-xs text-muted-foreground mt-2", children: [
            Math.round((prediction.confidence || 0) * 100),
            "% confidence \u2022 ",
            prediction.horizon,
            " days"
          ] })
        ] }, prediction.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No predictions available" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.CardTitle, { children: "Recommendations" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.CardContent, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading recommendations..." }) : recommendations.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "space-y-4", children: recommendations.map((rec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: `p-3 border-l-4 rounded ${getPriorityColor(
              rec.priority
            )}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { className: "font-medium", children: rec.title }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "span",
                  {
                    className: `text-xs px-2 py-1 rounded ${rec.priority === "critical" ? "bg-red-200 text-red-800" : rec.priority === "high" ? "bg-orange-200 text-orange-800" : rec.priority === "medium" ? "bg-yellow-200 text-yellow-800" : "bg-blue-200 text-blue-800"}`,
                    children: rec.priority
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm mt-1", children: rec.description }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm font-medium mt-2", children: [
                "Action: ",
                rec.action
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-xs text-muted-foreground mt-1", children: [
                "Impact: ",
                rec.impact,
                " \u2022 Effort: ",
                rec.effort
              ] })
            ]
          },
          rec.id
        )) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No recommendations available" }) })
      ] })
    ] })
  ] });
}

// src/app/pages/ops/contracts/page.tsx
var import_react3 = require("react");
var import_api3 = require("@captify-io/platform/api");
var import_hooks2 = require("@captify-io/platform/hooks");
var import_ui3 = require("@captify-io/platform/ui");
var import_uuid = require("uuid");

// src/app/pages/ops/contracts/form.tsx
var import_react2 = require("react");
var import_api2 = require("@captify-io/platform/api");
var import_utils = require("@captify-io/platform/utils");
var import_ui2 = require("@captify-io/platform/ui");
var import_jsx_runtime2 = require("react/jsx-runtime");
function ContractForm({
  contract,
  isOpen,
  onClose,
  onSave
}) {
  const getInitialFormData = () => {
    if (contract) return { ...contract };
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
  const [formData, setFormData] = (0, import_react2.useState)(
    getInitialFormData()
  );
  const [loading, setLoading] = (0, import_react2.useState)(false);
  const [activeTab, setActiveTab] = (0, import_react2.useState)("info");
  const [customers, setCustomers] = (0, import_react2.useState)([
    "Department of Defense",
    "Department of State",
    "DHS",
    "NASA",
    "EPA"
  ]);
  const [agencies, setAgencies] = (0, import_react2.useState)([
    "DISA",
    "USCIS",
    "CBP",
    "CISA",
    "SPAWAR"
  ]);
  const [users, setUsers] = (0, import_react2.useState)([]);
  const [customerOpen, setCustomerOpen] = (0, import_react2.useState)(false);
  const [agencyOpen, setAgencyOpen] = (0, import_react2.useState)(false);
  const [newCustomer, setNewCustomer] = (0, import_react2.useState)("");
  const [newAgency, setNewAgency] = (0, import_react2.useState)("");
  (0, import_react2.useEffect)(() => {
    loadDropdownData();
  }, []);
  const loadDropdownData = async () => {
    try {
      const usersRes = await import_api2.apiClient.run({
        service: "user",
        operation: "listUsers"
      });
      setUsers(usersRes?.data || []);
    } catch (error) {
      console.log("Error loading dropdown data:", error);
    }
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const handleCostChange = (costType, field, value) => {
    setFormData((prev) => {
      const costs = { ...prev[costType] };
      costs[field] = value;
      costs.total = (costs.direct || 0) + (costs.indirect || 0) + (costs.materials || 0) + (costs.subcontracts || 0) + (costs.profit || 0);
      return {
        ...prev,
        [costType]: costs
      };
    });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const submitData = { ...formData };
      if (submitData.startDate && submitData.expendedCosts?.total) {
        const start = new Date(submitData.startDate);
        const now = /* @__PURE__ */ new Date();
        const monthsElapsed = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1;
        submitData.avgMonthlyBurn = submitData.expendedCosts.total / monthsElapsed;
      }
      if (submitData.totalValue && submitData.burnedValue !== void 0) {
        submitData.remainingValue = submitData.totalValue - (submitData.burnedValue || 0);
      }
      if (submitData.expendedCosts?.total && !submitData.burnedValue) {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-6xl", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex justify-between items-center mb-6", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-2xl font-bold", children: contract?.id && contract?.name ? "Edit Contract" : "New Contract" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.TabsList, { className: "grid w-full grid-cols-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.TabsTrigger, { value: "info", children: "Info" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.TabsTrigger, { value: "financial", children: "Financial" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.TabsTrigger, { value: "costs", children: "Cost Breakdown" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.TabsTrigger, { value: "team", children: "Team" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.TabsTrigger, { value: "documents", children: "Documents" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.TabsContent, { value: "info", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "contractNumber", children: "Contract Number*" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_ui2.Input,
            {
              id: "contractNumber",
              value: formData.contractNumber || "",
              onChange: (e) => handleInputChange("contractNumber", e.target.value),
              placeholder: "e.g., W15P7T-20-C-0001",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "name", children: "Contract Name*" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_ui2.Input,
            {
              id: "name",
              value: formData.name || "",
              onChange: (e) => handleInputChange("name", e.target.value),
              placeholder: "e.g., IT Support Services",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "type", children: "Contract Type*" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            import_ui2.Select,
            {
              value: formData.type || "FFP",
              onValueChange: (value) => handleInputChange("type", value),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectValue, { placeholder: "Select type" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.SelectContent, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "FFP", children: "FFP - Firm Fixed Price" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "CPFF", children: "CPFF - Cost Plus Fixed Fee" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "CPIF", children: "CPIF - Cost Plus Incentive Fee" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "T&M", children: "T&M - Time & Materials" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "IDIQ", children: "IDIQ - Indefinite Delivery/Quantity" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "status", children: "Status*" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            import_ui2.Select,
            {
              value: formData.status || "pre-award",
              onValueChange: (value) => handleInputChange("status", value),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectValue, { placeholder: "Select status" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.SelectContent, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "pre-award", children: "Pre-Award" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "active", children: "Active" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "option-pending", children: "Option Pending" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "closing", children: "Closing" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "closed", children: "Closed" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "customer", children: "Customer*" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Popover, { open: customerOpen, onOpenChange: setCustomerOpen, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              import_ui2.Button,
              {
                variant: "outline",
                role: "combobox",
                "aria-expanded": customerOpen,
                className: "w-full justify-between",
                children: [
                  formData.customer || "Select customer...",
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    import_ui2.DynamicIcon,
                    {
                      name: "chevrons-up-down",
                      className: "ml-2 h-4 w-4 shrink-0 opacity-50"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.PopoverContent, { className: "w-full p-0", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Command, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.CommandInput,
                {
                  placeholder: "Search or add customer...",
                  value: newCustomer,
                  onValueChange: setNewCustomer
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.CommandList, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CommandEmpty, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                  import_ui2.Button,
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
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.DynamicIcon, { name: "plus", className: "mr-2 h-4 w-4" }),
                      'Add "',
                      newCustomer,
                      '"'
                    ]
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CommandGroup, { children: customers.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                  import_ui2.CommandItem,
                  {
                    onSelect: () => {
                      handleInputChange("customer", customer);
                      setCustomerOpen(false);
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        import_ui2.DynamicIcon,
                        {
                          name: "check",
                          className: (0, import_utils.cn)(
                            "mr-2 h-4 w-4",
                            formData.customer === customer ? "opacity-100" : "opacity-0"
                          )
                        }
                      ),
                      customer
                    ]
                  },
                  customer
                )) })
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "agency", children: "Agency" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Popover, { open: agencyOpen, onOpenChange: setAgencyOpen, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              import_ui2.Button,
              {
                variant: "outline",
                role: "combobox",
                "aria-expanded": agencyOpen,
                className: "w-full justify-between",
                children: [
                  formData.agency || "Select agency...",
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    import_ui2.DynamicIcon,
                    {
                      name: "chevrons-up-down",
                      className: "ml-2 h-4 w-4 shrink-0 opacity-50"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.PopoverContent, { className: "w-full p-0", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Command, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.CommandInput,
                {
                  placeholder: "Search or add agency...",
                  value: newAgency,
                  onValueChange: setNewAgency
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.CommandList, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CommandEmpty, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                  import_ui2.Button,
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
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.DynamicIcon, { name: "plus", className: "mr-2 h-4 w-4" }),
                      'Add "',
                      newAgency,
                      '"'
                    ]
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CommandGroup, { children: agencies.map((agency) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                  import_ui2.CommandItem,
                  {
                    onSelect: () => {
                      handleInputChange("agency", agency);
                      setAgencyOpen(false);
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        import_ui2.DynamicIcon,
                        {
                          name: "check",
                          className: (0, import_utils.cn)(
                            "mr-2 h-4 w-4",
                            formData.agency === agency ? "opacity-100" : "opacity-0"
                          )
                        }
                      ),
                      agency
                    ]
                  },
                  agency
                )) })
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "startDate", children: "Start Date*" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_ui2.Input,
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
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "popMonths", children: "POP (months)*" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_ui2.Input,
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
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "awardAmount", children: "Award Amount*" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_ui2.Input,
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
          )
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.TabsContent, { value: "financial", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "totalValue", children: "Total Contract Value" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_ui2.Input,
            {
              id: "totalValue",
              type: "number",
              value: formData.totalValue || "",
              onChange: (e) => handleInputChange("totalValue", parseFloat(e.target.value)),
              placeholder: "0.00"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "fundedValue", children: "Funded Value" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_ui2.Input,
            {
              id: "fundedValue",
              type: "number",
              value: formData.fundedValue || "",
              onChange: (e) => handleInputChange("fundedValue", parseFloat(e.target.value)),
              placeholder: "0.00"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "avgMonthlyBurn", children: "Average Monthly Burn" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_ui2.Input,
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
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "indirectRate", children: "Indirect Rate (%)" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_ui2.Input,
            {
              id: "indirectRate",
              type: "number",
              value: formData.indirectRate || "",
              onChange: (e) => handleInputChange("indirectRate", parseFloat(e.target.value)),
              placeholder: "0"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.TabsContent, { value: "costs", className: "space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CardTitle, { children: "Budgeted Costs" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { children: "Direct Costs" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.Input,
                {
                  type: "number",
                  value: formData.budgetedCosts?.direct || 0,
                  onChange: (e) => handleCostChange(
                    "budgetedCosts",
                    "direct",
                    parseFloat(e.target.value) || 0
                  )
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { children: "Indirect Costs" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.Input,
                {
                  type: "number",
                  value: formData.budgetedCosts?.indirect || 0,
                  onChange: (e) => handleCostChange(
                    "budgetedCosts",
                    "indirect",
                    parseFloat(e.target.value) || 0
                  )
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { children: "Materials" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.Input,
                {
                  type: "number",
                  value: formData.budgetedCosts?.materials || 0,
                  onChange: (e) => handleCostChange(
                    "budgetedCosts",
                    "materials",
                    parseFloat(e.target.value) || 0
                  )
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { children: "Subcontracts" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.Input,
                {
                  type: "number",
                  value: formData.budgetedCosts?.subcontracts || 0,
                  onChange: (e) => handleCostChange(
                    "budgetedCosts",
                    "subcontracts",
                    parseFloat(e.target.value) || 0
                  )
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { children: "Profit/Fee" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.Input,
                {
                  type: "number",
                  value: formData.budgetedCosts?.profit || 0,
                  onChange: (e) => handleCostChange(
                    "budgetedCosts",
                    "profit",
                    parseFloat(e.target.value) || 0
                  )
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { children: "Total Budgeted" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.Input,
                {
                  type: "number",
                  value: formData.budgetedCosts?.total || 0,
                  disabled: true,
                  className: "font-bold"
                }
              )
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CardTitle, { children: "Expended Costs" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { children: "Direct Costs" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.Input,
                {
                  type: "number",
                  value: formData.expendedCosts?.direct || 0,
                  onChange: (e) => handleCostChange(
                    "expendedCosts",
                    "direct",
                    parseFloat(e.target.value) || 0
                  )
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { children: "Indirect Costs" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.Input,
                {
                  type: "number",
                  value: formData.expendedCosts?.indirect || 0,
                  onChange: (e) => handleCostChange(
                    "expendedCosts",
                    "indirect",
                    parseFloat(e.target.value) || 0
                  )
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { children: "Materials" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.Input,
                {
                  type: "number",
                  value: formData.expendedCosts?.materials || 0,
                  onChange: (e) => handleCostChange(
                    "expendedCosts",
                    "materials",
                    parseFloat(e.target.value) || 0
                  )
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { children: "Subcontracts" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.Input,
                {
                  type: "number",
                  value: formData.expendedCosts?.subcontracts || 0,
                  onChange: (e) => handleCostChange(
                    "expendedCosts",
                    "subcontracts",
                    parseFloat(e.target.value) || 0
                  )
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { children: "Profit/Fee" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.Input,
                {
                  type: "number",
                  value: formData.expendedCosts?.profit || 0,
                  onChange: (e) => handleCostChange(
                    "expendedCosts",
                    "profit",
                    parseFloat(e.target.value) || 0
                  )
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { children: "Total Expended" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_ui2.Input,
                {
                  type: "number",
                  value: formData.expendedCosts?.total || 0,
                  disabled: true,
                  className: "font-bold"
                }
              )
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.TabsContent, { value: "team", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "programManager", children: "Program Manager*" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            import_ui2.Select,
            {
              value: formData.programManager || "",
              onValueChange: (value) => handleInputChange("programManager", value),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectValue, { placeholder: "Select Program Manager" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectContent, { children: users.length > 0 ? users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  import_ui2.SelectItem,
                  {
                    value: user.email,
                    children: user.name || user.email
                  },
                  user.id || user.email
                )) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "john.doe@example.com", children: "John Doe" }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "technicalLead", children: "Technical Lead" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            import_ui2.Select,
            {
              value: formData.technicalLead || "",
              onValueChange: (value) => handleInputChange("technicalLead", value),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectValue, { placeholder: "Select Technical Lead" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectContent, { children: users.length > 0 ? users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  import_ui2.SelectItem,
                  {
                    value: user.email,
                    children: user.name || user.email
                  },
                  user.id || user.email
                )) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "jane.smith@example.com", children: "Jane Smith" }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "contractingOfficer", children: "Contracting Officer" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            import_ui2.Select,
            {
              value: formData.contractingOfficer || "",
              onValueChange: (value) => handleInputChange("contractingOfficer", value),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectValue, { placeholder: "Select Contracting Officer" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectContent, { children: users.length > 0 ? users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  import_ui2.SelectItem,
                  {
                    value: user.email,
                    children: user.name || user.email
                  },
                  user.id || user.email
                )) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "co@agency.gov", children: "CO Name" }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Label, { htmlFor: "contractingOfficerRep", children: "Contracting Officer Representative (COR)" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            import_ui2.Select,
            {
              value: formData.contractingOfficerRep || "",
              onValueChange: (value) => handleInputChange("contractingOfficerRep", value),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectValue, { placeholder: "Select COR" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectContent, { children: users.length > 0 ? users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  import_ui2.SelectItem,
                  {
                    value: user.email,
                    children: user.name || user.email
                  },
                  user.id || user.email
                )) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.SelectItem, { value: "cor@agency.gov", children: "COR Name" }) })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.TabsContent, { value: "documents", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CardTitle, { children: "Contract Documents" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.CardContent, { className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_ui2.DynamicIcon,
            {
              name: "upload",
              className: "mx-auto h-12 w-12 text-gray-400"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mt-2 text-sm text-gray-600 font-semibold", children: "Document Upload Coming Soon" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mt-1 text-xs text-gray-500", children: "Documents will be stored in S3 and accessible to the AI agent" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mt-3 text-xs text-gray-400", children: "Supported formats: PDF, Word, Excel, PowerPoint" })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex justify-end gap-2 mt-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Button, { variant: "outline", onClick: onClose, disabled: loading, children: "Cancel" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Button, { onClick: handleSubmit, disabled: loading, children: loading ? "Saving..." : "Save Contract" })
    ] })
  ] });
}

// src/app/pages/ops/contracts/page.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function ContractsPage() {
  const { session } = (0, import_hooks2.useCaptify)();
  const [contracts, setContracts] = (0, import_react3.useState)([]);
  const [selectedContract, setSelectedContract] = (0, import_react3.useState)(null);
  const [contractDetails, setContractDetails] = (0, import_react3.useState)(null);
  const [loading, setLoading] = (0, import_react3.useState)(true);
  const [isFormOpen, setIsFormOpen] = (0, import_react3.useState)(false);
  const [editingContract, setEditingContract] = (0, import_react3.useState)(null);
  const [filter, setFilter] = (0, import_react3.useState)("active");
  const [viewMode, setViewMode] = (0, import_react3.useState)("list");
  (0, import_react3.useEffect)(() => {
    loadContracts();
  }, []);
  (0, import_react3.useEffect)(() => {
    if (selectedContract) {
      loadContractDetails(selectedContract.id);
    }
  }, [selectedContract]);
  const loadContracts = async () => {
    try {
      const response = await import_api3.apiClient.run({
        service: "contract",
        operation: "getActiveContracts",
        app: "pmbook"
      });
      const data = response?.data || [];
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
        import_api3.apiClient.run({
          service: "contract",
          operation: "getContractBurn",
          data: { contractId },
          app: "pmbook"
        }),
        import_api3.apiClient.run({
          service: "contract",
          operation: "getCDRLStatus",
          data: { contractId },
          app: "pmbook"
        }),
        import_api3.apiClient.run({
          service: "contract",
          operation: "getMilestoneProgress",
          data: { contractId },
          app: "pmbook"
        }),
        import_api3.apiClient.run({
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
      id: (0, import_uuid.v4)(),
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
      await import_api3.apiClient.run({
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
        await import_api3.apiClient.run({
          service: "contract",
          operation: "updateContract",
          data: {
            ...contractData,
            contractId: editingContract.id
          },
          app: "pmbook"
        });
      } else {
        await import_api3.apiClient.run({
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
  const Breadcrumbs = () => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center space-x-2 text-sm text-muted-foreground mb-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        onClick: () => {
          setViewMode("list");
          setEditingContract(null);
        },
        className: "hover:text-foreground transition-colors",
        children: "Contracts"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "/" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-foreground", children: editingContract && contracts.some((c) => c.id === editingContract.id) ? editingContract.name || editingContract.contractNumber || "Edit Contract" : "New Contract" })
  ] });
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center justify-center h-96", children: "Loading..." });
  }
  if (viewMode === "form" && editingContract) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "container mx-auto p-6 space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Breadcrumbs, {}),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ContractForm,
        {
          contract: editingContract,
          isOpen: true,
          onClose: handleCancelEdit,
          onSave: handleSaveContract
        }
      )
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "container mx-auto p-6 space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex justify-between items-start", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h1", { className: "text-3xl font-bold", children: "Contract Management" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-muted-foreground", children: "Monitor contracts, deliverables, and financial performance" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Button, { onClick: handleAddContract, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.DynamicIcon, { name: "plus", className: "mr-2 h-4 w-4" }),
        "Add Contract"
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        import_ui3.Button,
        {
          variant: filter === "active" ? "default" : "outline",
          size: "sm",
          onClick: () => setFilter("active"),
          children: [
            "Active (",
            (contracts || []).filter((c) => c.status !== "closed").length,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        import_ui3.Button,
        {
          variant: filter === "all" ? "default" : "outline",
          size: "sm",
          onClick: () => setFilter("all"),
          children: [
            "All (",
            (contracts || []).length,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        import_ui3.Button,
        {
          variant: filter === "archived" ? "default" : "outline",
          size: "sm",
          onClick: () => setFilter("archived"),
          children: [
            "Archived (",
            (contracts || []).filter((c) => c.status === "closed").length,
            ")"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex gap-2 overflow-x-auto pb-2", children: filteredContracts.map((contract) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_ui3.Button,
      {
        variant: selectedContract?.id === contract.id ? "default" : "outline",
        onClick: () => setSelectedContract(contract),
        className: "flex-shrink-0",
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-left", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "font-medium", children: contract.contractNumber }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-xs text-muted-foreground", children: [
            "$",
            (contract.totalValue / 1e6).toFixed(1),
            "M"
          ] })
        ] })
      },
      contract.id
    )) }),
    selectedContract && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-semibold", children: selectedContract.name || selectedContract.contractNumber }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.DropdownMenu, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Button, { variant: "outline", size: "sm", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.DynamicIcon, { name: "more-vertical", className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              import_ui3.DropdownMenuItem,
              {
                onClick: () => handleEditContract(selectedContract),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.DynamicIcon, { name: "edit", className: "mr-2 h-4 w-4" }),
                  "Edit Contract"
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              import_ui3.DropdownMenuItem,
              {
                onClick: () => handleArchiveContract(selectedContract.id),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.DynamicIcon, { name: "archive", className: "mr-2 h-4 w-4" }),
                  "Archive Contract"
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.DropdownMenuItem, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.DynamicIcon, { name: "download", className: "mr-2 h-4 w-4" }),
              "Export Data"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardTitle, { className: "text-sm", children: "Total Value" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.CardContent, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-2xl font-bold", children: [
              "$",
              (selectedContract.totalValue / 1e6).toFixed(1),
              "M"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_ui3.Progress,
              {
                value: selectedContract.burnedValue / selectedContract.totalValue * 100,
                className: "mt-2"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "text-xs text-muted-foreground mt-1", children: [
              (selectedContract.burnedValue / selectedContract.totalValue * 100).toFixed(0),
              "% burned"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardTitle, { className: "text-sm", children: "Monthly Burn" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.CardContent, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-2xl font-bold", children: [
              "$",
              (contractDetails?.burn?.currentMonthBurn / 1e3 || 0).toFixed(0),
              "k"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center text-xs text-muted-foreground mt-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.DynamicIcon, { name: "trending-up", className: "h-3 w-3 mr-1" }),
              contractDetails?.burn?.trend || "stable"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardTitle, { className: "text-sm", children: "Health Score" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.CardContent, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-2xl font-bold", children: [
              selectedContract.healthScore,
              "%"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_ui3.Badge,
              {
                variant: selectedContract.healthScore > 80 ? "default" : "destructive",
                className: "mt-2",
                children: selectedContract.healthScore > 80 ? "Healthy" : "At Risk"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardTitle, { className: "text-sm", children: "Time Remaining" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.CardContent, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-2xl font-bold", children: [
              Math.floor(
                (new Date(selectedContract.endDate).getTime() - Date.now()) / (1e3 * 60 * 60 * 24)
              ),
              " ",
              "days"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "Ends ",
              new Date(selectedContract.endDate).toLocaleDateString()
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardContent, { className: "p-0", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Tabs, { defaultValue: "cdrls", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.TabsList, { className: "w-full justify-start rounded-none border-b", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.TabsTrigger, { value: "cdrls", children: "CDRLs" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.TabsTrigger, { value: "milestones", children: "Milestones" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.TabsTrigger, { value: "financial", children: "Financial" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.TabsTrigger, { value: "team", children: "Team" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.TabsTrigger, { value: "strategic", children: "Strategic Goals" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.TabsTrigger, { value: "workstreams", children: "Work Streams" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.TabsContent, { value: "cdrls", className: "space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-4 gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-center", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-2xl font-bold", children: contractDetails?.cdrls?.summary?.total || 0 }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs text-muted-foreground", children: "Total CDRLs" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-center", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-2xl font-bold text-green-600", children: contractDetails?.cdrls?.summary?.completed || 0 }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs text-muted-foreground", children: "Completed" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-center", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-2xl font-bold text-yellow-600", children: contractDetails?.cdrls?.summary?.pending || 0 }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs text-muted-foreground", children: "Pending" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-center", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-2xl font-bold text-red-600", children: contractDetails?.cdrls?.summary?.overdue || 0 }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs text-muted-foreground", children: "Overdue" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "font-medium", children: "Upcoming Deadlines" }),
              contractDetails?.cdrls?.upcoming?.map((cdrl) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "div",
                {
                  className: "flex items-center justify-between p-3 rounded-lg border",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "font-medium", children: [
                        cdrl.number,
                        ": ",
                        cdrl.title
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm text-muted-foreground", children: cdrl.type })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-right", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        import_ui3.Badge,
                        {
                          variant: cdrl.status === "overdue" ? "destructive" : "default",
                          children: cdrl.status
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "text-xs text-muted-foreground mt-1", children: [
                        "Due: ",
                        new Date(cdrl.dueDate).toLocaleDateString()
                      ] })
                    ] })
                  ]
                },
                cdrl.id
              ))
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.TabsContent, { value: "milestones", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "space-y-3", children: contractDetails?.milestones?.milestones?.map(
            (milestone) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "p-4 rounded-lg border",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "font-medium", children: milestone.title }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "text-sm text-muted-foreground mt-1", children: [
                        "$",
                        (milestone.value / 1e3).toFixed(0),
                        "k value"
                      ] })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_ui3.Badge,
                      {
                        variant: milestone.status === "complete" ? "default" : "secondary",
                        children: milestone.status
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_ui3.Progress,
                    {
                      value: milestone.progress || 0,
                      className: "mt-3"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "text-xs text-muted-foreground mt-1", children: [
                    milestone.progress || 0,
                    "% complete - Due",
                    " ",
                    new Date(milestone.dueDate).toLocaleDateString()
                  ] })
                ]
              },
              milestone.id
            )
          ) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.TabsContent, { value: "financial", className: "space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-3 gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Card, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardTitle, { className: "text-sm", children: "Profit Margin" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.CardContent, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-2xl font-bold", children: [
                    contractDetails?.profitability?.margin?.toFixed(
                      1
                    ) || 0,
                    "%"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs text-muted-foreground", children: "Target: 15%" })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Card, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardTitle, { className: "text-sm", children: "Revenue" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-2xl font-bold", children: [
                  "$",
                  (contractDetails?.profitability?.revenue / 1e6 || 0).toFixed(1),
                  "M"
                ] }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Card, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardTitle, { className: "text-sm", children: "Profit" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-2xl font-bold", children: [
                  "$",
                  (contractDetails?.profitability?.profit / 1e3 || 0).toFixed(0),
                  "k"
                ] }) })
              ] })
            ] }),
            contractDetails?.burn?.recommendations?.map(
              (rec, idx) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Alert, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.DynamicIcon, { name: "alert-circle", className: "h-4 w-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.AlertDescription, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: rec.message }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("br", {}),
                  rec.action
                ] })
              ] }, idx)
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.TabsContent, { value: "team", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm font-medium", children: "Program Manager" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-muted-foreground", children: selectedContract.programManager })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm font-medium", children: "Technical Lead" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-muted-foreground", children: selectedContract.technicalLead || "Not assigned" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm font-medium", children: "Teams" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex gap-2 mt-1", children: selectedContract.teams?.map((team) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Badge, { variant: "outline", children: team }, team)) })
            ] })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.TabsContent, { value: "strategic", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "font-medium", children: "Strategic Goals" }),
            selectedContract.strategicGoals?.length > 0 ? selectedContract.strategicGoals.map((goal) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "p-4 rounded-lg border space-y-2",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "font-medium", children: goal.title }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm text-muted-foreground", children: goal.description })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_ui3.Badge,
                      {
                        variant: goal.priority === "critical" ? "destructive" : goal.priority === "high" ? "default" : "secondary",
                        children: goal.priority
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_ui3.Progress,
                    {
                      value: goal.progress || 0,
                      className: "mt-2"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: goal.status }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
                      "Target:",
                      " ",
                      new Date(goal.targetDate).toLocaleDateString()
                    ] })
                  ] })
                ]
              },
              goal.id
            )) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-muted-foreground", children: "No strategic goals defined" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.TabsContent, { value: "workstreams", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "font-medium", children: "Work Stream Allocations" }),
            selectedContract.workStreams?.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: selectedContract.workStreams.map((ws) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Card, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.CardTitle, { className: "text-sm", children: ws.workStreamName }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Badge, { variant: "outline", children: [
                  ws.allocation,
                  "%"
                ] })
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.CardContent, { className: "space-y-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs font-medium", children: "Lead" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm text-muted-foreground", children: ws.lead })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs font-medium", children: "Team Size" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "text-sm text-muted-foreground", children: [
                    ws.teamMembers?.length || 0,
                    " members"
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs font-medium", children: "Status" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_ui3.Badge,
                    {
                      variant: ws.status === "active" ? "default" : "secondary",
                      className: "mt-1",
                      children: ws.status
                    }
                  )
                ] })
              ] })
            ] }, ws.workStreamId)) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-muted-foreground", children: "No work stream allocations defined" })
          ] }) })
        ] })
      ] }) }) })
    ] })
  ] });
}
var page_default = ContractsPage;

// src/app/pages/ops/people/page.tsx
var import_react4 = require("react");
var import_hooks3 = require("@captify-io/platform/hooks");
var import_api4 = require("@captify-io/platform/api");
var import_ui4 = require("@captify-io/platform/ui");
var import_jsx_runtime4 = require("react/jsx-runtime");
function CommandCenterPage() {
  const { session } = (0, import_hooks3.useCaptify)();
  const [health, setHealth] = (0, import_react4.useState)(null);
  const [dashboard, setDashboard] = (0, import_react4.useState)(null);
  const [recommendations, setRecommendations] = (0, import_react4.useState)([]);
  const [loading, setLoading] = (0, import_react4.useState)(true);
  (0, import_react4.useEffect)(() => {
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
        import_api4.apiClient.run({
          service: "performance",
          operation: "getCompanyHealth"
        }),
        import_api4.apiClient.run({
          service: "performance",
          operation: "getExecutiveDashboard"
        }),
        import_api4.apiClient.run({
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
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex items-center justify-center h-96", children: "Loading..." });
  }
  if (!session?.user?.groups?.includes("Operations")) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "container mx-auto p-6", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.Alert, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.DynamicIcon, { name: "alert-circle", className: "h-4 w-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.AlertDescription, { children: "You need Operations role to view this page." })
    ] }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "container mx-auto p-6 space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { className: "text-3xl font-bold", children: "Command Center" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-muted-foreground", children: "Strategic business intelligence" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        import_ui4.Badge,
        {
          variant: health?.trend === "improving" ? "default" : "destructive",
          children: [
            "Health Score: ",
            health?.score || 0,
            "/100"
          ]
        }
      )
    ] }),
    dashboard?.health?.alerts?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.Alert, { variant: "destructive", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.DynamicIcon, { name: "alert-circle", className: "h-4 w-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.AlertDescription, { children: dashboard.health.alerts[0].description })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.CardTitle, { className: "text-sm font-medium", children: "Runway" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.DynamicIcon, { name: "clock", className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "text-2xl font-bold", children: [
            dashboard?.health?.runway?.toFixed(1) || 0,
            " months"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-xs text-muted-foreground", children: "Cash available" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.CardTitle, { className: "text-sm font-medium", children: "Monthly Burn" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.DynamicIcon, { name: "dollar-sign", className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "text-2xl font-bold", children: [
            "$",
            (dashboard?.financial?.monthlyBurn / 1e3 || 0).toFixed(0),
            "k"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center text-xs", children: [
            dashboard?.health?.trend === "improving" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.DynamicIcon, { name: "trending-down", className: "h-3 w-3 text-green-500 mr-1" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.DynamicIcon, { name: "trending-up", className: "h-3 w-3 text-red-500 mr-1" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "vs last month" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.CardTitle, { className: "text-sm font-medium", children: "Utilization" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.DynamicIcon, { name: "users", className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "text-2xl font-bold", children: [
            dashboard?.operations?.utilizationRate?.toFixed(0) || 0,
            "%"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            import_ui4.Progress,
            {
              value: dashboard?.operations?.utilizationRate || 0,
              className: "mt-2"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.CardTitle, { className: "text-sm font-medium", children: "Profit Margin" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.DynamicIcon, { name: "target", className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "text-2xl font-bold", children: [
            dashboard?.health?.profitMargin?.toFixed(1) || 0,
            "%"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-xs text-muted-foreground", children: "Target: 15%" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.CardTitle, { children: "Financial Forecast" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.CardContent, { className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-sm", children: "Best Case" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-sm font-medium", children: [
              "$",
              (dashboard?.forecast?.bestCase / 1e6 || 0).toFixed(1),
              "M"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-sm", children: "Likely" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-sm font-medium", children: [
              "$",
              (dashboard?.forecast?.nextQuarter?.revenue / 1e6 || 0).toFixed(1),
              "M"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-sm", children: "Worst Case" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-sm font-medium", children: [
              "$",
              (dashboard?.forecast?.worstCase / 1e6 || 0).toFixed(1),
              "M"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.CardTitle, { children: "Operational Metrics" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.CardContent, { className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-sm", children: "Delivery Velocity" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-sm font-medium", children: [
              dashboard?.operations?.deliveryVelocity || 0,
              " pts/sprint"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-sm", children: "Customer Satisfaction" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-sm font-medium", children: [
              dashboard?.operations?.customerSatisfaction?.toFixed(1) || 0,
              "/5"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-sm", children: "SLA Compliance" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-sm font-medium", children: [
              dashboard?.operations?.slaCompliance || 0,
              "%"
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    recommendations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.Card, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.DynamicIcon, { name: "activity", className: "h-5 w-5" }),
        "AI Recommendations"
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "space-y-3", children: recommendations.slice(0, 3).map((rec, idx) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: "flex items-start gap-3 p-3 rounded-lg bg-muted/50",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              import_ui4.Badge,
              {
                variant: rec.priority === "high" ? "destructive" : "default",
                children: rec.priority
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "font-medium text-sm", children: rec.title }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-xs text-muted-foreground mt-1", children: rec.action }),
              rec.impact && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-xs text-green-600 mt-1", children: [
                "Impact: ",
                rec.impact
              ] })
            ] })
          ]
        },
        idx
      )) }) })
    ] })
  ] });
}

// src/app/pages/ops/performance/page.tsx
var import_react5 = require("react");
var import_hooks4 = require("@captify-io/platform/hooks");
var import_api5 = require("@captify-io/platform/api");
var import_ui5 = require("@captify-io/platform/ui");
var import_jsx_runtime5 = require("react/jsx-runtime");
function PerformancePage() {
  const { session } = (0, import_hooks4.useCaptify)();
  const [businessHealth, setBusinessHealth] = (0, import_react5.useState)(null);
  const [burnAnalysis, setBurnAnalysis] = (0, import_react5.useState)(null);
  const [loading, setLoading] = (0, import_react5.useState)(true);
  (0, import_react5.useEffect)(() => {
    loadPerformanceData();
  }, []);
  const loadPerformanceData = async () => {
    try {
      const healthResponse = await import_api5.apiClient.run({
        service: "performance",
        operation: "getBusinessHealth",
        data: {}
      });
      setBusinessHealth(healthResponse.data || null);
      const burnResponse = await import_api5.apiClient.run({
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "container mx-auto p-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h1", { className: "text-3xl font-bold mb-6", children: "Performance Analytics" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardTitle, { className: "text-sm", children: "Overall Health" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-2xl font-bold text-green-600", children: loading ? "..." : businessHealth?.overallScore || 0 }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-muted-foreground", children: "Health Score" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardTitle, { className: "text-sm", children: "Monthly Revenue" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-2xl font-bold text-blue-600", children: loading ? "..." : formatCurrency(businessHealth?.financial?.revenue || 0) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-muted-foreground", children: "Current Month" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardTitle, { className: "text-sm", children: "Profit Margin" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-2xl font-bold text-purple-600", children: loading ? "..." : `${Math.round(
            businessHealth?.financial?.profitMargin || 0
          )}%` }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-muted-foreground", children: "Current Margin" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardTitle, { className: "text-sm", children: "Team Utilization" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-2xl font-bold text-orange-600", children: loading ? "..." : `${businessHealth?.employee?.utilization || 0}%` }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-muted-foreground", children: "Current Rate" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardTitle, { children: "Financial Health" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardContent, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "Loading..." }) : businessHealth?.financial ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "Revenue:" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-medium", children: formatCurrency(businessHealth.financial.revenue) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "Costs:" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-medium", children: formatCurrency(businessHealth.financial.costs) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "Profit:" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-medium text-green-600", children: formatCurrency(businessHealth.financial.profit) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "Runway:" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "font-medium", children: [
              Math.round(businessHealth.financial.runway),
              " months"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "Backlog:" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-medium", children: formatCurrency(businessHealth.financial.backlog) })
          ] })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "No financial data available" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardTitle, { children: "Employee Metrics" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardContent, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "Loading..." }) : businessHealth?.employee ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "Headcount:" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-medium", children: businessHealth.employee.headcount })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "Utilization:" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "font-medium", children: [
              businessHealth.employee.utilization,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "Satisfaction:" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "font-medium", children: [
              businessHealth.employee.satisfaction,
              "/5.0"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "Retention:" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "font-medium", children: [
              businessHealth.employee.retention,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "Value/Employee:" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-medium", children: formatCurrency(businessHealth.employee.valuePerEmployee) })
          ] })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "No employee data available" }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Card, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardTitle, { children: "Monthly Burn Analysis" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.CardContent, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "Loading..." }) : burnAnalysis ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { className: "font-semibold mb-2", children: "Revenue" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-2xl font-bold text-green-600", children: formatCurrency(burnAnalysis.revenue) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { className: "font-semibold mb-2", children: "Total Costs" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-2xl font-bold text-red-600", children: formatCurrency(burnAnalysis.totalCosts) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { className: "font-semibold mb-2", children: "Net Profit" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-2xl font-bold text-blue-600", children: formatCurrency(burnAnalysis.profit) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mt-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { className: "font-semibold mb-2", children: "Efficiency" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-lg", children: [
            burnAnalysis.efficiency,
            "% cost efficiency"
          ] })
        ] })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "No burn analysis data available" }) })
    ] })
  ] });
}

// src/app/pages/exe/value-streams/page.tsx
var import_react6 = require("react");
var import_hooks5 = require("@captify-io/platform/hooks");
var import_api6 = require("@captify-io/platform/api");
var import_ui6 = require("@captify-io/platform/ui");
var import_jsx_runtime6 = require("react/jsx-runtime");
function ValueStreamsPage() {
  const { session } = (0, import_hooks5.useCaptify)();
  const [valueStreams, setValueStreams] = (0, import_react6.useState)([]);
  const [loading, setLoading] = (0, import_react6.useState)(true);
  (0, import_react6.useEffect)(() => {
    loadValueStreams();
  }, []);
  const loadValueStreams = async () => {
    try {
      const response = await import_api6.apiClient.run({
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "container mx-auto p-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h1", { className: "text-3xl font-bold mb-6", children: "Value Streams" }),
    loading ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: "Loading value streams..." }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: valueStreams.length > 0 ? valueStreams.map((stream) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui6.Card, { className: "hover:shadow-md transition-shadow", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui6.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui6.CardTitle, { className: "text-lg", children: stream.name }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "span",
          {
            className: `px-2 py-1 text-xs rounded-full border ${getStatusColor(
              stream.status
            )}`,
            children: stream.status
          }
        )
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui6.CardContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-sm text-muted-foreground mb-4", children: stream.description }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "Lead Time:" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "font-medium", children: [
              stream.leadTime,
              "d"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "Throughput:" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "font-medium", children: [
              stream.throughput,
              "/week"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "Efficiency:" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "font-medium", children: [
              stream.efficiency,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mt-4 pt-4 border-t", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "text-xs text-muted-foreground", children: [
          "Owner: ",
          stream.owner,
          " \u2022 Last updated: ",
          new Date(stream.lastUpdated).toLocaleDateString()
        ] }) })
      ] })
    ] }, stream.id)) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "col-span-full text-center py-12", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-muted-foreground", children: "No value streams configured" }) }) })
  ] });
}
var page_default2 = ValueStreamsPage;

// src/app/pages/exe/my-tickets/page.tsx
var import_react7 = require("react");
var import_hooks6 = require("@captify-io/platform/hooks");
var import_api7 = require("@captify-io/platform/api");
var import_ui7 = require("@captify-io/platform/ui");
var import_jsx_runtime7 = require("react/jsx-runtime");
function MyTicketsPage() {
  const { session } = (0, import_hooks6.useCaptify)();
  const [tickets, setTickets] = (0, import_react7.useState)([]);
  const [loading, setLoading] = (0, import_react7.useState)(true);
  const [filter, setFilter] = (0, import_react7.useState)("all");
  (0, import_react7.useEffect)(() => {
    loadMyTickets();
  }, [filter]);
  const loadMyTickets = async () => {
    try {
      const response = await import_api7.apiClient.run({
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "container mx-auto p-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h1", { className: "text-3xl font-bold", children: "My Tickets" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex gap-2", children: ["all", "todo", "in-progress", "review", "done"].map((status) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "button",
        {
          onClick: () => setFilter(status),
          className: `px-3 py-1 text-sm rounded-md border transition-colors ${filter === status ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`,
          children: status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
        },
        status
      )) })
    ] }),
    loading ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: "Loading tickets..." }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "space-y-4", children: filteredTickets.length > 0 ? filteredTickets.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Card, { className: "hover:shadow-md transition-shadow", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex justify-between items-start mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "font-semibold text-lg", children: ticket.title }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "span",
              {
                className: `px-2 py-1 text-xs rounded-full border ${getStatusColor(
                  ticket.status
                )}`,
                children: ticket.status.replace("-", " ")
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-sm text-muted-foreground mb-2", children: ticket.description })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex items-center gap-4 ml-4", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "text-right", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: `text-sm font-medium ${getPriorityColor(ticket.priority)}`, children: [
            ticket.priority,
            " priority"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: "text-xs text-muted-foreground", children: [
            "Due: ",
            new Date(ticket.dueDate).toLocaleDateString()
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex justify-between items-center pt-4 border-t", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex gap-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { children: [
            "ID: ",
            ticket.id
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { children: [
            "Project: ",
            ticket.project
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { children: [
            "Assignee: ",
            ticket.assignee
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { className: "px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700", children: "View" }),
          ticket.status !== "done" && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { className: "px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50", children: "Update" })
        ] })
      ] })
    ] }) }, ticket.id)) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "text-center py-12", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-muted-foreground", children: filter === "all" ? "No tickets assigned to you" : `No ${filter.replace("-", " ")} tickets` }) }) })
  ] });
}
var page_default3 = MyTicketsPage;

// src/app/pages/services/ServicesHub.tsx
var import_react8 = require("react");
var import_hooks7 = require("@captify-io/platform/hooks");
var import_api8 = require("@captify-io/platform/api");
var import_ui8 = require("@captify-io/platform/ui");
var import_jsx_runtime8 = require("react/jsx-runtime");
function ServicesHubPage() {
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
    try {
      const response = await import_api8.apiClient.run({
        service: "service",
        operation: "getMarketplace",
        data: { userId: session?.user?.id }
      });
      setMarketplace(response?.data || []);
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
      setCatalog(response?.data || []);
    } catch (error) {
      console.error("Failed to load catalog:", error);
    }
  };
  const createTicket = async () => {
    try {
      await import_api8.apiClient.run({
        service: "service",
        operation: "createTicket",
        data: {
          ...newTicket,
          requestor: session?.user?.id
        }
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
    try {
      await import_api8.apiClient.run({
        service: "service",
        operation: "claimTicket",
        data: {
          ticketId,
          userId: session?.user?.id
        }
      });
      loadMarketplace();
    } catch (error) {
      console.error("Failed to claim ticket:", error);
    }
  };
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex items-center justify-center h-96", children: "Loading..." });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "container mx-auto p-6 space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h1", { className: "text-3xl font-bold", children: "Services Hub" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-muted-foreground", children: "Internal service marketplace" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Button, { onClick: () => setShowCreateTicket(true), children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.DynamicIcon, { name: "plus", className: "h-4 w-4 mr-2" }),
        "Create Ticket"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardTitle, { className: "text-sm", children: "Available Tickets" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-2xl font-bold", children: marketplace?.available?.urgent?.length + marketplace?.available?.highBounty?.length || 0 }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { className: "text-xs text-muted-foreground", children: [
            "$",
            marketplace?.potentialEarnings || 0,
            " potential"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardTitle, { className: "text-sm", children: "My Active" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-2xl font-bold", children: marketplace?.myTickets?.assigned?.length || 0 }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.DynamicIcon, { name: "clock", className: "h-3 w-3 mr-1" }),
            "In progress"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardTitle, { className: "text-sm", children: "My Requests" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-2xl font-bold", children: marketplace?.myTickets?.requested?.length || 0 }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.DynamicIcon, { name: "ticket", className: "h-3 w-3 mr-1" }),
            "Submitted"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardTitle, { className: "text-sm", children: "Leaderboard Rank" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-2xl font-bold", children: "#5" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.DynamicIcon, { name: "star", className: "h-3 w-3 mr-1" }),
            "Top performer"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Card, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardTitle, { children: "Service Marketplace" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Tabs, { defaultValue: "available", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.TabsList, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.TabsTrigger, { value: "available", children: "Available" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.TabsTrigger, { value: "mytickets", children: "My Tickets" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.TabsTrigger, { value: "catalog", children: "Service Catalog" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.TabsTrigger, { value: "leaderboard", children: "Leaderboard" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.TabsContent, { value: "available", className: "space-y-4", children: [
          marketplace?.available?.urgent?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("h4", { className: "font-medium mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, { variant: "destructive", children: "Urgent" }),
              "High Priority Tickets"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "space-y-3", children: marketplace.available.urgent.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              TicketCard,
              {
                ticket,
                onClaim: claimTicket
              },
              ticket.id
            )) })
          ] }),
          marketplace?.available?.highBounty?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("h4", { className: "font-medium mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.DynamicIcon, { name: "dollar-sign", className: "h-4 w-4" }),
              "High Bounty"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "space-y-3", children: marketplace.available.highBounty.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              TicketCard,
              {
                ticket,
                onClaim: claimTicket
              },
              ticket.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.TabsContent, { value: "mytickets", className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h4", { className: "font-medium mb-3", children: "Assigned to Me" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "space-y-3", children: marketplace?.myTickets?.assigned?.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TicketCard, { ticket, assigned: true }, ticket.id)) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h4", { className: "font-medium mb-3", children: "My Requests" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "space-y-3", children: marketplace?.myTickets?.requested?.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TicketCard, { ticket, requested: true }, ticket.id)) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.TabsContent, { value: "catalog", className: "space-y-3", children: catalog.map((service) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "p-4 rounded-lg border", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h4", { className: "font-medium", children: service.service }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-sm text-muted-foreground mt-1", children: service.description }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex gap-2 mt-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, { variant: "outline", children: service.serviceArea }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, { variant: "outline", children: service.complexity }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Badge, { variant: "outline", children: [
                service.estimatedTime,
                "h"
              ] })
            ] })
          ] }),
          service.selfService && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Button, { size: "sm", children: "Request" })
        ] }) }, service.id)) }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.TabsContent, { value: "leaderboard", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "space-y-3", children: marketplace?.leaderboard?.map((entry, idx) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "div",
          {
            className: "flex items-center justify-between p-4 rounded-lg border",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "text-2xl font-bold", children: [
                  "#",
                  idx + 1
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "font-medium", children: entry.userId }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { className: "text-sm text-muted-foreground", children: [
                    entry.ticketsResolved,
                    " resolved"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "text-right", children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.DynamicIcon, { name: "star", className: "h-4 w-4 text-yellow-500" }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "font-medium", children: [
                    entry.satisfaction,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { className: "text-sm text-muted-foreground", children: [
                  "$",
                  entry.earnings,
                  " earned"
                ] })
              ] })
            ]
          },
          entry.userId
        )) }) })
      ] }) })
    ] }),
    showCreateTicket && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Card, { className: "w-full max-w-lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.CardTitle, { children: "Create Service Ticket" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { className: "text-sm font-medium", children: "Title" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            import_ui8.Input,
            {
              value: newTicket.title,
              onChange: (e) => setNewTicket({ ...newTicket, title: e.target.value }),
              placeholder: "Brief description of what you need"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { className: "text-sm font-medium", children: "Description" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            import_ui8.Textarea,
            {
              value: newTicket.description,
              onChange: (e) => setNewTicket({ ...newTicket, description: e.target.value }),
              placeholder: "Detailed description and acceptance criteria",
              rows: 4
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { className: "text-sm font-medium", children: "Service Area" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
              import_ui8.Select,
              {
                value: newTicket.serviceArea,
                onValueChange: (value) => setNewTicket({ ...newTicket, serviceArea: value }),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectValue, {}) }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.SelectContent, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectItem, { value: "DevOps", children: "DevOps" }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectItem, { value: "DataOps", children: "DataOps" }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectItem, { value: "PlatformOps", children: "PlatformOps" }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectItem, { value: "HelpDesk", children: "Help Desk" }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectItem, { value: "Security", children: "Security" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { className: "text-sm font-medium", children: "Priority" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
              import_ui8.Select,
              {
                value: newTicket.priority,
                onValueChange: (value) => setNewTicket({ ...newTicket, priority: value }),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectValue, {}) }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.SelectContent, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectItem, { value: "low", children: "Low" }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectItem, { value: "medium", children: "Medium" }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectItem, { value: "high", children: "High" }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.SelectItem, { value: "critical", children: "Critical" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { className: "text-sm font-medium", children: "Bounty (optional)" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            import_ui8.Input,
            {
              type: "number",
              value: newTicket.bounty,
              onChange: (e) => setNewTicket({
                ...newTicket,
                bounty: parseInt(e.target.value) || 0
              }),
              placeholder: "Incentive amount for faster completion"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Button, { onClick: createTicket, className: "flex-1", children: "Create Ticket" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            import_ui8.Button,
            {
              onClick: () => setShowCreateTicket(false),
              variant: "outline",
              className: "flex-1",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
function TicketCard({ ticket, onClaim, assigned, requested }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center justify-between p-4 rounded-lg border bg-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h4", { className: "font-medium", children: ticket.title }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          import_ui8.Badge,
          {
            variant: ticket.priority === "critical" ? "destructive" : "default",
            children: ticket.priority
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-sm text-muted-foreground mt-1", children: ticket.description }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-4 mt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, { variant: "outline", children: ticket.serviceArea }),
        ticket.bounty > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.DynamicIcon, { name: "dollar-sign", className: "h-3 w-3" }),
          ticket.bounty
        ] }),
        ticket.sla && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center text-sm text-muted-foreground", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.DynamicIcon, { name: "clock", className: "h-3 w-3 mr-1" }),
          "SLA: ",
          ticket.sla,
          "h"
        ] })
      ] })
    ] }),
    !assigned && !requested && onClaim && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Button, { onClick: () => onClaim(ticket.id), size: "sm", children: "Claim" }),
    assigned && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, { variant: "default", children: "In Progress" }),
    requested && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, { variant: "outline", children: ticket.status })
  ] });
}

// src/app/pages/work/WorkDashboard.tsx
var import_react9 = require("react");
var import_hooks8 = require("@captify-io/platform/hooks");
var import_api9 = require("@captify-io/platform/api");
var import_ui9 = require("@captify-io/platform/ui");
var import_jsx_runtime9 = require("react/jsx-runtime");
function WorkDashboardPage() {
  const { session } = (0, import_hooks8.useCaptify)();
  const [activeWork, setActiveWork] = (0, import_react9.useState)(null);
  const [workQueue, setWorkQueue] = (0, import_react9.useState)(null);
  const [productivity, setProductivity] = (0, import_react9.useState)(null);
  const [loading, setLoading] = (0, import_react9.useState)(true);
  const [timer, setTimer] = (0, import_react9.useState)(0);
  (0, import_react9.useEffect)(() => {
    loadWorkData();
    const interval = setInterval(() => {
      if (activeWork) {
        setTimer((prev) => prev + 1);
      }
    }, 1e3);
    return () => clearInterval(interval);
  }, [activeWork]);
  const loadWorkData = async () => {
    try {
      const [queueData, prodData] = await Promise.all([
        import_api9.apiClient.run({
          service: "work",
          operation: "getWorkQueue",
          data: { userId: session?.user?.id }
        }),
        import_api9.apiClient.run({
          service: "work",
          operation: "calculateProductivity",
          data: { userId: session?.user?.id, period: "daily" }
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
    try {
      const workSession = await import_api9.apiClient.run({
        service: "work",
        operation: "startWork",
        data: {
          userId: session?.user?.id,
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
    try {
      await import_api9.apiClient.run({
        service: "work",
        operation: "stopActiveWork",
        data: { userId: session?.user?.id }
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
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "flex items-center justify-center h-96", children: "Loading..." });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "container mx-auto p-6 space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h1", { className: "text-3xl font-bold", children: "My Work" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-muted-foreground", children: "Focus on value delivery" })
    ] }) }),
    activeWork ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Card, { className: "border-primary", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.CardTitle, { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.DynamicIcon, { name: "play", className: "h-5 w-5 text-green-500" }),
          "Current Focus"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, { variant: "default", children: formatTime(timer) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { className: "font-semibold text-lg", children: activeWork.title }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-sm text-muted-foreground mt-1", children: activeWork.description })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, { children: activeWork.type }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Badge, { variant: "outline", children: [
            "Value: ",
            activeWork.valueScore,
            "/10"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, { variant: "outline", children: activeWork.complexity })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
            import_ui9.Button,
            {
              onClick: stopWork,
              variant: "destructive",
              className: "flex-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.DynamicIcon, { name: "pause", className: "h-4 w-4 mr-2" }),
                "Stop Work"
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
            import_ui9.Button,
            {
              onClick: () => stopWork(),
              variant: "default",
              className: "flex-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.DynamicIcon, { name: "check-circle", className: "h-4 w-4 mr-2" }),
                "Complete"
              ]
            }
          )
        ] })
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Card, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardTitle, { children: "Ready to Work" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-muted-foreground", children: "Select a work item below to start tracking" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardTitle, { className: "text-sm", children: "Today's Progress" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "text-2xl font-bold", children: [
            productivity?.totalHours?.toFixed(1) || 0,
            "h"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            import_ui9.Progress,
            {
              value: productivity?.totalHours / 8 * 100 || 0,
              className: "mt-2"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardTitle, { className: "text-sm", children: "Value Delivered" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "text-2xl font-bold", children: [
            "$",
            (productivity?.totalValue || 0).toLocaleString()
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { className: "text-xs text-muted-foreground", children: [
            "ROI: ",
            productivity?.valuePerHour?.toFixed(0) || 0,
            "/hr"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardTitle, { className: "text-sm", children: "Strategic Alignment" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "text-2xl font-bold", children: [
            productivity?.strategicAlignment?.toFixed(0) || 0,
            "%"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.DynamicIcon, { name: "target", className: "h-3 w-3 mr-1" }),
            "On critical path"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardHeader, { className: "pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardTitle, { className: "text-sm", children: "Focus Time" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "text-2xl font-bold", children: [
            productivity?.focusTime?.toFixed(1) || 0,
            "h"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.DynamicIcon, { name: "zap", className: "h-3 w-3 mr-1" }),
            "Deep work"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Card, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardTitle, { children: "Work Queue" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Tabs, { defaultValue: "recommended", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.TabsList, { className: "grid w-full grid-cols-5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TabsTrigger, { value: "recommended", children: "Recommended" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TabsTrigger, { value: "critical", children: "Critical Path" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TabsTrigger, { value: "quick", children: "Quick Wins" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TabsTrigger, { value: "debt", children: "Tech Debt" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TabsTrigger, { value: "blocked", children: "Blocked" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TabsContent, { value: "recommended", className: "space-y-3", children: workQueue?.recommended?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(WorkItem, { item, onStart: startWork }, item.id)) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TabsContent, { value: "critical", className: "space-y-3", children: workQueue?.criticalPath?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          WorkItem,
          {
            item,
            onStart: startWork,
            critical: true
          },
          item.id
        )) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TabsContent, { value: "quick", className: "space-y-3", children: workQueue?.quickWins?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(WorkItem, { item, onStart: startWork }, item.id)) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TabsContent, { value: "debt", className: "space-y-3", children: workQueue?.techDebt?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(WorkItem, { item, onStart: startWork }, item.id)) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TabsContent, { value: "blocked", className: "space-y-3", children: workQueue?.blocked?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(WorkItem, { item, blocked: true }, item.id)) })
      ] }) })
    ] })
  ] });
}
function WorkItem({ item, onStart, critical, blocked }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center justify-between p-4 rounded-lg border bg-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h4", { className: "font-medium", children: item.title }),
        critical && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.DynamicIcon, { name: "alert-circle", className: "h-4 w-4 text-red-500" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-sm text-muted-foreground mt-1", children: item.description }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex gap-2 mt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, { variant: "outline", children: item.type }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, { variant: "outline", children: item.complexity }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Badge, { variant: "outline", children: [
          item.estimatedHours,
          "h"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Badge, { variant: "default", children: [
          "Value: ",
          item.valueScore
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Button, { onClick: () => onStart(item), disabled: blocked, size: "sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.DynamicIcon, { name: "play", className: "h-4 w-4 mr-1" }),
      "Start"
    ] })
  ] });
}

// src/index.ts
var PAGE_MAPPINGS = {
  // Operations pages
  "/ops/insights": IntelligencePage,
  "/ops/contracts": page_default,
  "/ops/people": CommandCenterPage,
  "/ops/performance": PerformancePage,
  // Execution pages
  "/exe/value-streams": page_default2,
  "/exe/my-tickets": page_default3,
  "/exe/service-hub": ServicesHubPage
};
function generatePageRegistry() {
  const registry = {};
  registry.home = async () => ({ default: CommandCenterPage });
  registry.dashboard = async () => ({ default: CommandCenterPage });
  function processMenuItems(items, parentPath = "") {
    items.forEach((item) => {
      if (item.children) {
        processMenuItems(item.children, parentPath);
      } else if (item.href) {
        const pageComponent = PAGE_MAPPINGS[item.href];
        if (pageComponent) {
          const cleanId = item.id.replace("pmbook-", "").replace(/-/g, "-");
          const hrefKey = item.href.slice(1).replace("/", "-");
          registry[cleanId] = async () => ({ default: pageComponent });
          registry[hrefKey] = async () => ({ default: pageComponent });
          registry[item.id] = async () => ({ default: pageComponent });
        }
      }
    });
  }
  processMenuItems(config_default);
  return registry;
}
function generateComponentRegistry() {
  return {
    // Operations components
    IntelligencePage: async () => ({ default: IntelligencePage }),
    ContractsPage: async () => ({ default: page_default }),
    CommandCenterPage: async () => ({ default: CommandCenterPage }),
    PerformancePage: async () => ({ default: PerformancePage }),
    // Execution components
    ValueStreamsPage: async () => ({ default: page_default2 }),
    MyTicketsPage: async () => ({ default: page_default3 }),
    ServicesHubPage: async () => ({ default: ServicesHubPage }),
    // Legacy compatibility
    WorkDashboardPage: async () => ({ default: WorkDashboardPage })
  };
}
var pageRegistry = generatePageRegistry();
var componentRegistry = generateComponentRegistry();
var menuConfiguration = config_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommandCenterPage,
  ContractsPage,
  IntelligencePage,
  MyTicketsPage,
  PerformancePage,
  ServicesHubPage,
  ValueStreamsPage,
  WorkDashboardPage,
  componentRegistry,
  menuConfiguration,
  pageRegistry
});
//# sourceMappingURL=index.cjs.map