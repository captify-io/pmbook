"use client";
"use client";
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app/pages/command-center/CommandCenter.tsx
var CommandCenter_exports = {};
__export(CommandCenter_exports, {
  CommandCenterPage: () => CommandCenterPage,
  default: () => CommandCenter_default
});
import { useEffect, useState } from "react";
import { useCaptify } from "@captify-io/core/components";
import { apiClient } from "@captify-io/core/lib";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Progress,
  Alert,
  AlertDescription
} from "@captify-io/core/ui";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  DollarSign,
  Users,
  Target,
  Activity,
  Clock
} from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
function CommandCenterPage() {
  const { session } = useCaptify();
  const [health, setHealth] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadDashboardData();
  }, []);
  const loadDashboardData = /* @__PURE__ */ __name(async () => {
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
  }, "loadDashboardData");
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-96", children: "Loading..." });
  }
  if (!session?.user?.groups?.includes("Operations")) {
    return /* @__PURE__ */ jsx("div", { className: "container mx-auto p-6", children: /* @__PURE__ */ jsxs(Alert, { children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx(AlertDescription, { children: "You need Operations role to view this page." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-6 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Command Center" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Strategic business intelligence" })
      ] }),
      /* @__PURE__ */ jsxs(
        Badge,
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
    dashboard?.health?.alerts?.length > 0 && /* @__PURE__ */ jsxs(Alert, { variant: "destructive", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx(AlertDescription, { children: dashboard.health.alerts[0].description })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Runway" }),
          /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold", children: [
            dashboard?.health?.runway?.toFixed(1) || 0,
            " months"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Cash available" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Monthly Burn" }),
          /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold", children: [
            "$",
            (dashboard?.financial?.monthlyBurn / 1e3 || 0).toFixed(0),
            "k"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs", children: [
            dashboard?.health?.trend === "improving" ? /* @__PURE__ */ jsx(TrendingDown, { className: "h-3 w-3 text-green-500 mr-1" }) : /* @__PURE__ */ jsx(TrendingUp, { className: "h-3 w-3 text-red-500 mr-1" }),
            /* @__PURE__ */ jsx("span", { children: "vs last month" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Utilization" }),
          /* @__PURE__ */ jsx(Users, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold", children: [
            dashboard?.operations?.utilizationRate?.toFixed(0) || 0,
            "%"
          ] }),
          /* @__PURE__ */ jsx(
            Progress,
            {
              value: dashboard?.operations?.utilizationRate || 0,
              className: "mt-2"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Profit Margin" }),
          /* @__PURE__ */ jsx(Target, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold", children: [
            dashboard?.health?.profitMargin?.toFixed(1) || 0,
            "%"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Target: 15%" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Financial Forecast" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Best Case" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
              "$",
              (dashboard?.forecast?.bestCase / 1e6 || 0).toFixed(1),
              "M"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Likely" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
              "$",
              (dashboard?.forecast?.nextQuarter?.revenue / 1e6 || 0).toFixed(1),
              "M"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Worst Case" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
              "$",
              (dashboard?.forecast?.worstCase / 1e6 || 0).toFixed(1),
              "M"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Operational Metrics" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Delivery Velocity" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
              dashboard?.operations?.deliveryVelocity || 0,
              " pts/sprint"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Customer Satisfaction" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
              dashboard?.operations?.customerSatisfaction?.toFixed(1) || 0,
              "/5"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "SLA Compliance" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
              dashboard?.operations?.slaCompliance || 0,
              "%"
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    recommendations.length > 0 && /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Activity, { className: "h-5 w-5" }),
        "AI Recommendations"
      ] }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: recommendations.slice(0, 3).map((rec, idx) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-start gap-3 p-3 rounded-lg bg-muted/50",
          children: [
            /* @__PURE__ */ jsx(
              Badge,
              {
                variant: rec.priority === "high" ? "destructive" : "default",
                children: rec.priority
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-sm", children: rec.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: rec.action }),
              rec.impact && /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-600 mt-1", children: [
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
var CommandCenter_default;
var init_CommandCenter = __esm({
  "src/app/pages/command-center/CommandCenter.tsx"() {
    "use strict";
    "use client";
    __name(CommandCenterPage, "CommandCenterPage");
    CommandCenter_default = CommandCenterPage;
  }
});

// src/app/pages/contracts/ContractForm.tsx
import { useState as useState2, useEffect as useEffect2 } from "react";
import { apiClient as apiClient2 } from "@captify-io/core/lib";
import { cn } from "@captify-io/core/lib";
import {
  Button as Button2,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card as Card2,
  CardContent as CardContent2,
  CardHeader as CardHeader2,
  CardTitle as CardTitle2,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@captify-io/core/ui";
import { Upload, Plus, Check, ChevronsUpDown } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function ContractForm({
  contract,
  isOpen,
  onClose,
  onSave
}) {
  const getInitialFormData = /* @__PURE__ */ __name(() => {
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
  }, "getInitialFormData");
  const [formData, setFormData] = useState2(getInitialFormData());
  const [loading, setLoading] = useState2(false);
  const [activeTab, setActiveTab] = useState2("info");
  const [customers, setCustomers] = useState2(["Department of Defense", "Department of State", "DHS", "NASA", "EPA"]);
  const [agencies, setAgencies] = useState2(["DISA", "USCIS", "CBP", "CISA", "SPAWAR"]);
  const [users, setUsers] = useState2([]);
  const [customerOpen, setCustomerOpen] = useState2(false);
  const [agencyOpen, setAgencyOpen] = useState2(false);
  const [newCustomer, setNewCustomer] = useState2("");
  const [newAgency, setNewAgency] = useState2("");
  useEffect2(() => {
    loadDropdownData();
  }, []);
  const loadDropdownData = /* @__PURE__ */ __name(async () => {
    try {
      const usersRes = await apiClient2.run({
        service: "user",
        operation: "listUsers"
      });
      setUsers(usersRes?.data || []);
    } catch (error) {
      console.log("Error loading dropdown data:", error);
    }
  }, "loadDropdownData");
  const handleInputChange = /* @__PURE__ */ __name((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  }, "handleInputChange");
  const handleCostChange = /* @__PURE__ */ __name((costType, field, value) => {
    setFormData((prev) => {
      const costs = { ...prev[costType] };
      costs[field] = value;
      costs.total = costs.direct + costs.indirect + costs.materials + costs.subcontracts + costs.profit;
      return {
        ...prev,
        [costType]: costs
      };
    });
  }, "handleCostChange");
  const handleSubmit = /* @__PURE__ */ __name(async () => {
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
  }, "handleSubmit");
  return /* @__PURE__ */ jsxs2("div", { className: "max-w-6xl", children: [
    /* @__PURE__ */ jsx2("div", { className: "flex justify-between items-center mb-6", children: /* @__PURE__ */ jsx2("h2", { className: "text-2xl font-bold", children: contract?.id && contract?.name ? "Edit Contract" : "New Contract" }) }),
    /* @__PURE__ */ jsxs2(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ jsxs2(TabsList, { className: "grid w-full grid-cols-5", children: [
        /* @__PURE__ */ jsx2(TabsTrigger, { value: "info", children: "Info" }),
        /* @__PURE__ */ jsx2(TabsTrigger, { value: "financial", children: "Financial" }),
        /* @__PURE__ */ jsx2(TabsTrigger, { value: "costs", children: "Cost Breakdown" }),
        /* @__PURE__ */ jsx2(TabsTrigger, { value: "team", children: "Team" }),
        /* @__PURE__ */ jsx2(TabsTrigger, { value: "documents", children: "Documents" })
      ] }),
      /* @__PURE__ */ jsx2(TabsContent, { value: "info", className: "space-y-4", children: /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "contractNumber", children: "Contract Number*" }),
          /* @__PURE__ */ jsx2(
            Input,
            {
              id: "contractNumber",
              value: formData.contractNumber || "",
              onChange: (e) => handleInputChange("contractNumber", e.target.value),
              placeholder: "e.g., W15P7T-20-C-0001",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "name", children: "Contract Name*" }),
          /* @__PURE__ */ jsx2(
            Input,
            {
              id: "name",
              value: formData.name || "",
              onChange: (e) => handleInputChange("name", e.target.value),
              placeholder: "e.g., IT Support Services",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "type", children: "Contract Type*" }),
          /* @__PURE__ */ jsxs2(
            Select,
            {
              value: formData.type || "FFP",
              onValueChange: (value) => handleInputChange("type", value),
              children: [
                /* @__PURE__ */ jsx2(SelectTrigger, { children: /* @__PURE__ */ jsx2(SelectValue, { placeholder: "Select type" }) }),
                /* @__PURE__ */ jsxs2(SelectContent, { children: [
                  /* @__PURE__ */ jsx2(SelectItem, { value: "FFP", children: "FFP - Firm Fixed Price" }),
                  /* @__PURE__ */ jsx2(SelectItem, { value: "CPFF", children: "CPFF - Cost Plus Fixed Fee" }),
                  /* @__PURE__ */ jsx2(SelectItem, { value: "CPIF", children: "CPIF - Cost Plus Incentive Fee" }),
                  /* @__PURE__ */ jsx2(SelectItem, { value: "T&M", children: "T&M - Time & Materials" }),
                  /* @__PURE__ */ jsx2(SelectItem, { value: "IDIQ", children: "IDIQ - Indefinite Delivery/Quantity" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "status", children: "Status*" }),
          /* @__PURE__ */ jsxs2(
            Select,
            {
              value: formData.status || "pre-award",
              onValueChange: (value) => handleInputChange("status", value),
              children: [
                /* @__PURE__ */ jsx2(SelectTrigger, { children: /* @__PURE__ */ jsx2(SelectValue, { placeholder: "Select status" }) }),
                /* @__PURE__ */ jsxs2(SelectContent, { children: [
                  /* @__PURE__ */ jsx2(SelectItem, { value: "pre-award", children: "Pre-Award" }),
                  /* @__PURE__ */ jsx2(SelectItem, { value: "active", children: "Active" }),
                  /* @__PURE__ */ jsx2(SelectItem, { value: "option-pending", children: "Option Pending" }),
                  /* @__PURE__ */ jsx2(SelectItem, { value: "closing", children: "Closing" }),
                  /* @__PURE__ */ jsx2(SelectItem, { value: "closed", children: "Closed" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "customer", children: "Customer*" }),
          /* @__PURE__ */ jsxs2(Popover, { open: customerOpen, onOpenChange: setCustomerOpen, children: [
            /* @__PURE__ */ jsx2(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs2(
              Button2,
              {
                variant: "outline",
                role: "combobox",
                "aria-expanded": customerOpen,
                className: "w-full justify-between",
                children: [
                  formData.customer || "Select customer...",
                  /* @__PURE__ */ jsx2(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx2(PopoverContent, { className: "w-full p-0", children: /* @__PURE__ */ jsxs2(Command, { children: [
              /* @__PURE__ */ jsx2(
                CommandInput,
                {
                  placeholder: "Search or add customer...",
                  value: newCustomer,
                  onValueChange: setNewCustomer
                }
              ),
              /* @__PURE__ */ jsxs2(CommandList, { children: [
                /* @__PURE__ */ jsx2(CommandEmpty, { children: /* @__PURE__ */ jsxs2(
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
                    },
                    children: [
                      /* @__PURE__ */ jsx2(Plus, { className: "mr-2 h-4 w-4" }),
                      'Add "',
                      newCustomer,
                      '"'
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx2(CommandGroup, { children: customers.map((customer) => /* @__PURE__ */ jsxs2(
                  CommandItem,
                  {
                    onSelect: () => {
                      handleInputChange("customer", customer);
                      setCustomerOpen(false);
                    },
                    children: [
                      /* @__PURE__ */ jsx2(
                        Check,
                        {
                          className: cn(
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
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "agency", children: "Agency" }),
          /* @__PURE__ */ jsxs2(Popover, { open: agencyOpen, onOpenChange: setAgencyOpen, children: [
            /* @__PURE__ */ jsx2(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs2(
              Button2,
              {
                variant: "outline",
                role: "combobox",
                "aria-expanded": agencyOpen,
                className: "w-full justify-between",
                children: [
                  formData.agency || "Select agency...",
                  /* @__PURE__ */ jsx2(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx2(PopoverContent, { className: "w-full p-0", children: /* @__PURE__ */ jsxs2(Command, { children: [
              /* @__PURE__ */ jsx2(
                CommandInput,
                {
                  placeholder: "Search or add agency...",
                  value: newAgency,
                  onValueChange: setNewAgency
                }
              ),
              /* @__PURE__ */ jsxs2(CommandList, { children: [
                /* @__PURE__ */ jsx2(CommandEmpty, { children: /* @__PURE__ */ jsxs2(
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
                    },
                    children: [
                      /* @__PURE__ */ jsx2(Plus, { className: "mr-2 h-4 w-4" }),
                      'Add "',
                      newAgency,
                      '"'
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx2(CommandGroup, { children: agencies.map((agency) => /* @__PURE__ */ jsxs2(
                  CommandItem,
                  {
                    onSelect: () => {
                      handleInputChange("agency", agency);
                      setAgencyOpen(false);
                    },
                    children: [
                      /* @__PURE__ */ jsx2(
                        Check,
                        {
                          className: cn(
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
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "startDate", children: "Start Date*" }),
          /* @__PURE__ */ jsx2(
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
                handleInputChange("endDate", endDate.toISOString().split("T")[0]);
                handleInputChange("popEnd", endDate.toISOString().split("T")[0]);
              },
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "popMonths", children: "POP (months)*" }),
          /* @__PURE__ */ jsx2(
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
                  handleInputChange("endDate", endDate.toISOString().split("T")[0]);
                  handleInputChange("popEnd", endDate.toISOString().split("T")[0]);
                }
              },
              placeholder: "12",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "awardAmount", children: "Award Amount*" }),
          /* @__PURE__ */ jsx2(
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
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx2(TabsContent, { value: "financial", className: "space-y-4", children: /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "totalValue", children: "Total Contract Value" }),
          /* @__PURE__ */ jsx2(
            Input,
            {
              id: "totalValue",
              type: "number",
              value: formData.totalValue || "",
              onChange: (e) => handleInputChange("totalValue", parseFloat(e.target.value)),
              placeholder: "0.00"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "fundedValue", children: "Funded Value" }),
          /* @__PURE__ */ jsx2(
            Input,
            {
              id: "fundedValue",
              type: "number",
              value: formData.fundedValue || "",
              onChange: (e) => handleInputChange("fundedValue", parseFloat(e.target.value)),
              placeholder: "0.00"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "avgMonthlyBurn", children: "Average Monthly Burn" }),
          /* @__PURE__ */ jsx2(
            Input,
            {
              id: "avgMonthlyBurn",
              type: "number",
              value: formData.avgMonthlyBurn || "",
              onChange: (e) => handleInputChange("avgMonthlyBurn", parseFloat(e.target.value)),
              placeholder: "0.00"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "indirectRate", children: "Indirect Rate (%)" }),
          /* @__PURE__ */ jsx2(
            Input,
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
      /* @__PURE__ */ jsxs2(TabsContent, { value: "costs", className: "space-y-6", children: [
        /* @__PURE__ */ jsxs2(Card2, { children: [
          /* @__PURE__ */ jsx2(CardHeader2, { children: /* @__PURE__ */ jsx2(CardTitle2, { children: "Budgeted Costs" }) }),
          /* @__PURE__ */ jsx2(CardContent2, { children: /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx2(Label, { children: "Direct Costs" }),
              /* @__PURE__ */ jsx2(
                Input,
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
            /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx2(Label, { children: "Indirect Costs" }),
              /* @__PURE__ */ jsx2(
                Input,
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
            /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx2(Label, { children: "Materials" }),
              /* @__PURE__ */ jsx2(
                Input,
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
            /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx2(Label, { children: "Subcontracts" }),
              /* @__PURE__ */ jsx2(
                Input,
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
            /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx2(Label, { children: "Profit/Fee" }),
              /* @__PURE__ */ jsx2(
                Input,
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
            /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx2(Label, { children: "Total Budgeted" }),
              /* @__PURE__ */ jsx2(
                Input,
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
        /* @__PURE__ */ jsxs2(Card2, { children: [
          /* @__PURE__ */ jsx2(CardHeader2, { children: /* @__PURE__ */ jsx2(CardTitle2, { children: "Expended Costs" }) }),
          /* @__PURE__ */ jsx2(CardContent2, { children: /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx2(Label, { children: "Direct Costs" }),
              /* @__PURE__ */ jsx2(
                Input,
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
            /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx2(Label, { children: "Indirect Costs" }),
              /* @__PURE__ */ jsx2(
                Input,
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
            /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx2(Label, { children: "Materials" }),
              /* @__PURE__ */ jsx2(
                Input,
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
            /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx2(Label, { children: "Subcontracts" }),
              /* @__PURE__ */ jsx2(
                Input,
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
            /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx2(Label, { children: "Profit/Fee" }),
              /* @__PURE__ */ jsx2(
                Input,
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
            /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx2(Label, { children: "Total Expended" }),
              /* @__PURE__ */ jsx2(
                Input,
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
      /* @__PURE__ */ jsx2(TabsContent, { value: "team", className: "space-y-4", children: /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "programManager", children: "Program Manager*" }),
          /* @__PURE__ */ jsxs2(
            Select,
            {
              value: formData.programManager || "",
              onValueChange: (value) => handleInputChange("programManager", value),
              children: [
                /* @__PURE__ */ jsx2(SelectTrigger, { children: /* @__PURE__ */ jsx2(SelectValue, { placeholder: "Select Program Manager" }) }),
                /* @__PURE__ */ jsx2(SelectContent, { children: users.length > 0 ? users.map((user) => /* @__PURE__ */ jsx2(SelectItem, { value: user.email, children: user.name || user.email }, user.id || user.email)) : /* @__PURE__ */ jsx2(SelectItem, { value: "john.doe@example.com", children: "John Doe" }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "technicalLead", children: "Technical Lead" }),
          /* @__PURE__ */ jsxs2(
            Select,
            {
              value: formData.technicalLead || "",
              onValueChange: (value) => handleInputChange("technicalLead", value),
              children: [
                /* @__PURE__ */ jsx2(SelectTrigger, { children: /* @__PURE__ */ jsx2(SelectValue, { placeholder: "Select Technical Lead" }) }),
                /* @__PURE__ */ jsx2(SelectContent, { children: users.length > 0 ? users.map((user) => /* @__PURE__ */ jsx2(SelectItem, { value: user.email, children: user.name || user.email }, user.id || user.email)) : /* @__PURE__ */ jsx2(SelectItem, { value: "jane.smith@example.com", children: "Jane Smith" }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "contractingOfficer", children: "Contracting Officer" }),
          /* @__PURE__ */ jsxs2(
            Select,
            {
              value: formData.contractingOfficer || "",
              onValueChange: (value) => handleInputChange("contractingOfficer", value),
              children: [
                /* @__PURE__ */ jsx2(SelectTrigger, { children: /* @__PURE__ */ jsx2(SelectValue, { placeholder: "Select Contracting Officer" }) }),
                /* @__PURE__ */ jsx2(SelectContent, { children: users.length > 0 ? users.map((user) => /* @__PURE__ */ jsx2(SelectItem, { value: user.email, children: user.name || user.email }, user.id || user.email)) : /* @__PURE__ */ jsx2(SelectItem, { value: "co@agency.gov", children: "CO Name" }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx2(Label, { htmlFor: "contractingOfficerRep", children: "Contracting Officer Representative (COR)" }),
          /* @__PURE__ */ jsxs2(
            Select,
            {
              value: formData.contractingOfficerRep || "",
              onValueChange: (value) => handleInputChange("contractingOfficerRep", value),
              children: [
                /* @__PURE__ */ jsx2(SelectTrigger, { children: /* @__PURE__ */ jsx2(SelectValue, { placeholder: "Select COR" }) }),
                /* @__PURE__ */ jsx2(SelectContent, { children: users.length > 0 ? users.map((user) => /* @__PURE__ */ jsx2(SelectItem, { value: user.email, children: user.name || user.email }, user.id || user.email)) : /* @__PURE__ */ jsx2(SelectItem, { value: "cor@agency.gov", children: "COR Name" }) })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx2(TabsContent, { value: "documents", className: "space-y-4", children: /* @__PURE__ */ jsxs2(Card2, { children: [
        /* @__PURE__ */ jsx2(CardHeader2, { children: /* @__PURE__ */ jsx2(CardTitle2, { children: "Contract Documents" }) }),
        /* @__PURE__ */ jsx2(CardContent2, { className: "space-y-4", children: /* @__PURE__ */ jsxs2("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center", children: [
          /* @__PURE__ */ jsx2(Upload, { className: "mx-auto h-12 w-12 text-gray-400" }),
          /* @__PURE__ */ jsx2("p", { className: "mt-2 text-sm text-gray-600 font-semibold", children: "Document Upload Coming Soon" }),
          /* @__PURE__ */ jsx2("p", { className: "mt-1 text-xs text-gray-500", children: "Documents will be stored in S3 and accessible to the AI agent" }),
          /* @__PURE__ */ jsx2("p", { className: "mt-3 text-xs text-gray-400", children: "Supported formats: PDF, Word, Excel, PowerPoint" })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "flex justify-end gap-2 mt-6", children: [
      /* @__PURE__ */ jsx2(Button2, { variant: "outline", onClick: onClose, disabled: loading, children: "Cancel" }),
      /* @__PURE__ */ jsx2(Button2, { onClick: handleSubmit, disabled: loading, children: loading ? "Saving..." : "Save Contract" })
    ] })
  ] });
}
var init_ContractForm = __esm({
  "src/app/pages/contracts/ContractForm.tsx"() {
    "use strict";
    "use client";
    __name(ContractForm, "ContractForm");
  }
});

// src/app/pages/contracts/ContractsPage.tsx
var ContractsPage_exports = {};
__export(ContractsPage_exports, {
  ContractsPage: () => ContractsPage,
  default: () => ContractsPage_default
});
import { useEffect as useEffect3, useState as useState3 } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCaptify as useCaptify2 } from "@captify-io/core/components";
import { apiClient as apiClient3 } from "@captify-io/core/lib";
import {
  Card as Card3,
  CardContent as CardContent3,
  CardHeader as CardHeader3,
  CardTitle as CardTitle3,
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
} from "@captify-io/core/ui";
import {
  AlertCircle as AlertCircle2,
  TrendingUp as TrendingUp2,
  Plus as Plus2,
  Edit,
  Archive,
  MoreVertical,
  Download
} from "lucide-react";
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function ContractsPage() {
  const { session } = useCaptify2();
  const [contracts, setContracts] = useState3([]);
  const [selectedContract, setSelectedContract] = useState3(null);
  const [contractDetails, setContractDetails] = useState3(null);
  const [loading, setLoading] = useState3(true);
  const [isFormOpen, setIsFormOpen] = useState3(false);
  const [editingContract, setEditingContract] = useState3(null);
  const [filter, setFilter] = useState3("active");
  const [viewMode, setViewMode] = useState3("list");
  useEffect3(() => {
    loadContracts();
  }, []);
  useEffect3(() => {
    if (selectedContract) {
      loadContractDetails(selectedContract.id);
    }
  }, [selectedContract]);
  const loadContracts = /* @__PURE__ */ __name(async () => {
    try {
      const response = await apiClient3.run({
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
  }, "loadContracts");
  const loadContractDetails = /* @__PURE__ */ __name(async (contractId) => {
    try {
      const [burn, cdrls, milestones, profitability] = await Promise.all([
        apiClient3.run({
          service: "contract",
          operation: "getContractBurn",
          data: { contractId },
          app: "pmbook"
        }),
        apiClient3.run({
          service: "contract",
          operation: "getCDRLStatus",
          data: { contractId },
          app: "pmbook"
        }),
        apiClient3.run({
          service: "contract",
          operation: "getMilestoneProgress",
          data: { contractId },
          app: "pmbook"
        }),
        apiClient3.run({
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
  }, "loadContractDetails");
  const handleAddContract = /* @__PURE__ */ __name(() => {
    const newContract = {
      id: uuidv4(),
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
  }, "handleAddContract");
  const handleEditContract = /* @__PURE__ */ __name((contract) => {
    setEditingContract(contract);
    setSelectedContract(null);
    setViewMode("form");
  }, "handleEditContract");
  const handleArchiveContract = /* @__PURE__ */ __name(async (contractId) => {
    try {
      await apiClient3.run({
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
  }, "handleArchiveContract");
  const handleSaveContract = /* @__PURE__ */ __name(async (contractData) => {
    try {
      if (editingContract) {
        await apiClient3.run({
          service: "contract",
          operation: "updateContract",
          data: {
            ...contractData,
            contractId: editingContract.id
          },
          app: "pmbook"
        });
      } else {
        await apiClient3.run({
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
  }, "handleSaveContract");
  const filteredContracts = (contracts || []).filter((contract) => {
    if (filter === "all") return true;
    if (filter === "active") return contract.status !== "closed";
    if (filter === "archived") return contract.status === "closed";
    return true;
  });
  const handleCancelEdit = /* @__PURE__ */ __name(() => {
    setViewMode("list");
    setEditingContract(null);
    setIsFormOpen(false);
    if (contracts.length > 0) {
      setSelectedContract(contracts[0]);
    }
  }, "handleCancelEdit");
  const Breadcrumbs = /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxs3("div", { className: "flex items-center space-x-2 text-sm text-muted-foreground mb-4", children: [
    /* @__PURE__ */ jsx3(
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
    /* @__PURE__ */ jsx3("span", { children: "/" }),
    /* @__PURE__ */ jsx3("span", { className: "text-foreground", children: editingContract && contracts.some((c) => c.id === editingContract.id) ? editingContract.name || editingContract.contractNumber || "Edit Contract" : "New Contract" })
  ] }), "Breadcrumbs");
  if (loading) {
    return /* @__PURE__ */ jsx3("div", { className: "flex items-center justify-center h-96", children: "Loading..." });
  }
  if (viewMode === "form" && editingContract) {
    return /* @__PURE__ */ jsxs3("div", { className: "container mx-auto p-6 space-y-6", children: [
      /* @__PURE__ */ jsx3(Breadcrumbs, {}),
      /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsxs3("div", { className: "container mx-auto p-6 space-y-6", children: [
    /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-start", children: [
      /* @__PURE__ */ jsxs3("div", { children: [
        /* @__PURE__ */ jsx3("h1", { className: "text-3xl font-bold", children: "Contract Management" }),
        /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground", children: "Monitor contracts, deliverables, and financial performance" })
      ] }),
      /* @__PURE__ */ jsx3("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxs3(Button3, { onClick: handleAddContract, children: [
        /* @__PURE__ */ jsx3(Plus2, { className: "mr-2 h-4 w-4" }),
        "Add Contract"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxs3(
        Button3,
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
      /* @__PURE__ */ jsxs3(
        Button3,
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
      /* @__PURE__ */ jsxs3(
        Button3,
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
    /* @__PURE__ */ jsx3("div", { className: "flex gap-2 overflow-x-auto pb-2", children: filteredContracts.map((contract) => /* @__PURE__ */ jsx3(
      Button3,
      {
        variant: selectedContract?.id === contract.id ? "default" : "outline",
        onClick: () => setSelectedContract(contract),
        className: "flex-shrink-0",
        children: /* @__PURE__ */ jsxs3("div", { className: "text-left", children: [
          /* @__PURE__ */ jsx3("div", { className: "font-medium", children: contract.contractNumber }),
          /* @__PURE__ */ jsxs3("div", { className: "text-xs text-muted-foreground", children: [
            "$",
            (contract.totalValue / 1e6).toFixed(1),
            "M"
          ] })
        ] })
      },
      contract.id
    )) }),
    selectedContract && /* @__PURE__ */ jsxs3(Fragment, { children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx3("h2", { className: "text-2xl font-semibold", children: selectedContract.name || selectedContract.contractNumber }),
        /* @__PURE__ */ jsxs3(DropdownMenu, { children: [
          /* @__PURE__ */ jsx3(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx3(Button3, { variant: "outline", size: "sm", children: /* @__PURE__ */ jsx3(MoreVertical, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxs3(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsxs3(DropdownMenuItem, { onClick: () => handleEditContract(selectedContract), children: [
              /* @__PURE__ */ jsx3(Edit, { className: "mr-2 h-4 w-4" }),
              "Edit Contract"
            ] }),
            /* @__PURE__ */ jsxs3(DropdownMenuItem, { onClick: () => handleArchiveContract(selectedContract.id), children: [
              /* @__PURE__ */ jsx3(Archive, { className: "mr-2 h-4 w-4" }),
              "Archive Contract"
            ] }),
            /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx3(Download, { className: "mr-2 h-4 w-4" }),
              "Export Data"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxs3(Card3, { children: [
          /* @__PURE__ */ jsx3(CardHeader3, { className: "pb-2", children: /* @__PURE__ */ jsx3(CardTitle3, { className: "text-sm", children: "Total Value" }) }),
          /* @__PURE__ */ jsxs3(CardContent3, { children: [
            /* @__PURE__ */ jsxs3("div", { className: "text-2xl font-bold", children: [
              "$",
              (selectedContract.totalValue / 1e6).toFixed(1),
              "M"
            ] }),
            /* @__PURE__ */ jsx3(
              Progress2,
              {
                value: selectedContract.burnedValue / selectedContract.totalValue * 100,
                className: "mt-2"
              }
            ),
            /* @__PURE__ */ jsxs3("p", { className: "text-xs text-muted-foreground mt-1", children: [
              (selectedContract.burnedValue / selectedContract.totalValue * 100).toFixed(0),
              "% burned"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3(Card3, { children: [
          /* @__PURE__ */ jsx3(CardHeader3, { className: "pb-2", children: /* @__PURE__ */ jsx3(CardTitle3, { className: "text-sm", children: "Monthly Burn" }) }),
          /* @__PURE__ */ jsxs3(CardContent3, { children: [
            /* @__PURE__ */ jsxs3("div", { className: "text-2xl font-bold", children: [
              "$",
              (contractDetails?.burn?.currentMonthBurn / 1e3 || 0).toFixed(0),
              "k"
            ] }),
            /* @__PURE__ */ jsxs3("div", { className: "flex items-center text-xs text-muted-foreground mt-1", children: [
              /* @__PURE__ */ jsx3(TrendingUp2, { className: "h-3 w-3 mr-1" }),
              contractDetails?.burn?.trend || "stable"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3(Card3, { children: [
          /* @__PURE__ */ jsx3(CardHeader3, { className: "pb-2", children: /* @__PURE__ */ jsx3(CardTitle3, { className: "text-sm", children: "Health Score" }) }),
          /* @__PURE__ */ jsxs3(CardContent3, { children: [
            /* @__PURE__ */ jsxs3("div", { className: "text-2xl font-bold", children: [
              selectedContract.healthScore,
              "%"
            ] }),
            /* @__PURE__ */ jsx3(
              Badge2,
              {
                variant: selectedContract.healthScore > 80 ? "default" : "destructive",
                className: "mt-2",
                children: selectedContract.healthScore > 80 ? "Healthy" : "At Risk"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs3(Card3, { children: [
          /* @__PURE__ */ jsx3(CardHeader3, { className: "pb-2", children: /* @__PURE__ */ jsx3(CardTitle3, { className: "text-sm", children: "Time Remaining" }) }),
          /* @__PURE__ */ jsxs3(CardContent3, { children: [
            /* @__PURE__ */ jsxs3("div", { className: "text-2xl font-bold", children: [
              Math.floor(
                (new Date(selectedContract.endDate).getTime() - Date.now()) / (1e3 * 60 * 60 * 24)
              ),
              " ",
              "days"
            ] }),
            /* @__PURE__ */ jsxs3("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "Ends ",
              new Date(selectedContract.endDate).toLocaleDateString()
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx3(Card3, { children: /* @__PURE__ */ jsx3(CardContent3, { className: "p-0", children: /* @__PURE__ */ jsxs3(Tabs2, { defaultValue: "cdrls", children: [
        /* @__PURE__ */ jsxs3(TabsList2, { className: "w-full justify-start rounded-none border-b", children: [
          /* @__PURE__ */ jsx3(TabsTrigger2, { value: "cdrls", children: "CDRLs" }),
          /* @__PURE__ */ jsx3(TabsTrigger2, { value: "milestones", children: "Milestones" }),
          /* @__PURE__ */ jsx3(TabsTrigger2, { value: "financial", children: "Financial" }),
          /* @__PURE__ */ jsx3(TabsTrigger2, { value: "team", children: "Team" }),
          /* @__PURE__ */ jsx3(TabsTrigger2, { value: "strategic", children: "Strategic Goals" }),
          /* @__PURE__ */ jsx3(TabsTrigger2, { value: "workstreams", children: "Work Streams" })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxs3(TabsContent2, { value: "cdrls", className: "space-y-4", children: [
            /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-4 gap-4", children: [
              /* @__PURE__ */ jsxs3("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx3("div", { className: "text-2xl font-bold", children: contractDetails?.cdrls?.summary?.total || 0 }),
                /* @__PURE__ */ jsx3("p", { className: "text-xs text-muted-foreground", children: "Total CDRLs" })
              ] }),
              /* @__PURE__ */ jsxs3("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx3("div", { className: "text-2xl font-bold text-green-600", children: contractDetails?.cdrls?.summary?.completed || 0 }),
                /* @__PURE__ */ jsx3("p", { className: "text-xs text-muted-foreground", children: "Completed" })
              ] }),
              /* @__PURE__ */ jsxs3("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx3("div", { className: "text-2xl font-bold text-yellow-600", children: contractDetails?.cdrls?.summary?.pending || 0 }),
                /* @__PURE__ */ jsx3("p", { className: "text-xs text-muted-foreground", children: "Pending" })
              ] }),
              /* @__PURE__ */ jsxs3("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx3("div", { className: "text-2xl font-bold text-red-600", children: contractDetails?.cdrls?.summary?.overdue || 0 }),
                /* @__PURE__ */ jsx3("p", { className: "text-xs text-muted-foreground", children: "Overdue" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs3("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx3("h4", { className: "font-medium", children: "Upcoming Deadlines" }),
              contractDetails?.cdrls?.upcoming?.map((cdrl) => /* @__PURE__ */ jsxs3(
                "div",
                {
                  className: "flex items-center justify-between p-3 rounded-lg border",
                  children: [
                    /* @__PURE__ */ jsxs3("div", { children: [
                      /* @__PURE__ */ jsxs3("p", { className: "font-medium", children: [
                        cdrl.number,
                        ": ",
                        cdrl.title
                      ] }),
                      /* @__PURE__ */ jsx3("p", { className: "text-sm text-muted-foreground", children: cdrl.type })
                    ] }),
                    /* @__PURE__ */ jsxs3("div", { className: "text-right", children: [
                      /* @__PURE__ */ jsx3(
                        Badge2,
                        {
                          variant: cdrl.status === "overdue" ? "destructive" : "default",
                          children: cdrl.status
                        }
                      ),
                      /* @__PURE__ */ jsxs3("p", { className: "text-xs text-muted-foreground mt-1", children: [
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
          /* @__PURE__ */ jsx3(TabsContent2, { value: "milestones", className: "space-y-4", children: /* @__PURE__ */ jsx3("div", { className: "space-y-3", children: contractDetails?.milestones?.milestones?.map(
            (milestone) => /* @__PURE__ */ jsxs3(
              "div",
              {
                className: "p-4 rounded-lg border",
                children: [
                  /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsxs3("div", { children: [
                      /* @__PURE__ */ jsx3("p", { className: "font-medium", children: milestone.title }),
                      /* @__PURE__ */ jsxs3("p", { className: "text-sm text-muted-foreground mt-1", children: [
                        "$",
                        (milestone.value / 1e3).toFixed(0),
                        "k value"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx3(
                      Badge2,
                      {
                        variant: milestone.status === "complete" ? "default" : "secondary",
                        children: milestone.status
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx3(
                    Progress2,
                    {
                      value: milestone.progress || 0,
                      className: "mt-3"
                    }
                  ),
                  /* @__PURE__ */ jsxs3("p", { className: "text-xs text-muted-foreground mt-1", children: [
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
          /* @__PURE__ */ jsxs3(TabsContent2, { value: "financial", className: "space-y-4", children: [
            /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs3(Card3, { children: [
                /* @__PURE__ */ jsx3(CardHeader3, { className: "pb-2", children: /* @__PURE__ */ jsx3(CardTitle3, { className: "text-sm", children: "Profit Margin" }) }),
                /* @__PURE__ */ jsxs3(CardContent3, { children: [
                  /* @__PURE__ */ jsxs3("div", { className: "text-2xl font-bold", children: [
                    contractDetails?.profitability?.margin?.toFixed(
                      1
                    ) || 0,
                    "%"
                  ] }),
                  /* @__PURE__ */ jsx3("p", { className: "text-xs text-muted-foreground", children: "Target: 15%" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs3(Card3, { children: [
                /* @__PURE__ */ jsx3(CardHeader3, { className: "pb-2", children: /* @__PURE__ */ jsx3(CardTitle3, { className: "text-sm", children: "Revenue" }) }),
                /* @__PURE__ */ jsx3(CardContent3, { children: /* @__PURE__ */ jsxs3("div", { className: "text-2xl font-bold", children: [
                  "$",
                  (contractDetails?.profitability?.revenue / 1e6 || 0).toFixed(1),
                  "M"
                ] }) })
              ] }),
              /* @__PURE__ */ jsxs3(Card3, { children: [
                /* @__PURE__ */ jsx3(CardHeader3, { className: "pb-2", children: /* @__PURE__ */ jsx3(CardTitle3, { className: "text-sm", children: "Profit" }) }),
                /* @__PURE__ */ jsx3(CardContent3, { children: /* @__PURE__ */ jsxs3("div", { className: "text-2xl font-bold", children: [
                  "$",
                  (contractDetails?.profitability?.profit / 1e3 || 0).toFixed(0),
                  "k"
                ] }) })
              ] })
            ] }),
            contractDetails?.burn?.recommendations?.map(
              (rec, idx) => /* @__PURE__ */ jsxs3(Alert2, { children: [
                /* @__PURE__ */ jsx3(AlertCircle2, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxs3(AlertDescription2, { children: [
                  /* @__PURE__ */ jsx3("strong", { children: rec.message }),
                  /* @__PURE__ */ jsx3("br", {}),
                  rec.action
                ] })
              ] }, idx)
            )
          ] }),
          /* @__PURE__ */ jsx3(TabsContent2, { value: "team", children: /* @__PURE__ */ jsxs3("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("p", { className: "text-sm font-medium", children: "Program Manager" }),
              /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground", children: selectedContract.programManager })
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("p", { className: "text-sm font-medium", children: "Technical Lead" }),
              /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground", children: selectedContract.technicalLead || "Not assigned" })
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("p", { className: "text-sm font-medium", children: "Teams" }),
              /* @__PURE__ */ jsx3("div", { className: "flex gap-2 mt-1", children: selectedContract.teams?.map((team) => /* @__PURE__ */ jsx3(Badge2, { variant: "outline", children: team }, team)) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx3(TabsContent2, { value: "strategic", className: "space-y-4", children: /* @__PURE__ */ jsxs3("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx3("h4", { className: "font-medium", children: "Strategic Goals" }),
            selectedContract.strategicGoals?.length > 0 ? selectedContract.strategicGoals.map((goal) => /* @__PURE__ */ jsxs3(
              "div",
              {
                className: "p-4 rounded-lg border space-y-2",
                children: [
                  /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsxs3("div", { children: [
                      /* @__PURE__ */ jsx3("p", { className: "font-medium", children: goal.title }),
                      /* @__PURE__ */ jsx3("p", { className: "text-sm text-muted-foreground", children: goal.description })
                    ] }),
                    /* @__PURE__ */ jsx3(
                      Badge2,
                      {
                        variant: goal.priority === "critical" ? "destructive" : goal.priority === "high" ? "default" : "secondary",
                        children: goal.priority
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx3(Progress2, { value: goal.progress || 0, className: "mt-2" }),
                  /* @__PURE__ */ jsxs3("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsx3("span", { children: goal.status }),
                    /* @__PURE__ */ jsxs3("span", { children: [
                      "Target: ",
                      new Date(goal.targetDate).toLocaleDateString()
                    ] })
                  ] })
                ]
              },
              goal.id
            )) : /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground", children: "No strategic goals defined" })
          ] }) }),
          /* @__PURE__ */ jsx3(TabsContent2, { value: "workstreams", className: "space-y-4", children: /* @__PURE__ */ jsxs3("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx3("h4", { className: "font-medium", children: "Work Stream Allocations" }),
            selectedContract.workStreams?.length > 0 ? /* @__PURE__ */ jsx3("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: selectedContract.workStreams.map((ws) => /* @__PURE__ */ jsxs3(Card3, { children: [
              /* @__PURE__ */ jsx3(CardHeader3, { className: "pb-2", children: /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsx3(CardTitle3, { className: "text-sm", children: ws.workStreamName }),
                /* @__PURE__ */ jsxs3(Badge2, { variant: "outline", children: [
                  ws.allocation,
                  "%"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs3(CardContent3, { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs3("div", { children: [
                  /* @__PURE__ */ jsx3("p", { className: "text-xs font-medium", children: "Lead" }),
                  /* @__PURE__ */ jsx3("p", { className: "text-sm text-muted-foreground", children: ws.lead })
                ] }),
                /* @__PURE__ */ jsxs3("div", { children: [
                  /* @__PURE__ */ jsx3("p", { className: "text-xs font-medium", children: "Team Size" }),
                  /* @__PURE__ */ jsxs3("p", { className: "text-sm text-muted-foreground", children: [
                    ws.teamMembers?.length || 0,
                    " members"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs3("div", { children: [
                  /* @__PURE__ */ jsx3("p", { className: "text-xs font-medium", children: "Status" }),
                  /* @__PURE__ */ jsx3(
                    Badge2,
                    {
                      variant: ws.status === "active" ? "default" : "secondary",
                      className: "mt-1",
                      children: ws.status
                    }
                  )
                ] })
              ] })
            ] }, ws.workStreamId)) }) : /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground", children: "No work stream allocations defined" })
          ] }) })
        ] })
      ] }) }) })
    ] })
  ] });
}
var ContractsPage_default;
var init_ContractsPage = __esm({
  "src/app/pages/contracts/ContractsPage.tsx"() {
    "use strict";
    "use client";
    init_ContractForm();
    __name(ContractsPage, "ContractsPage");
    ContractsPage_default = ContractsPage;
  }
});

// src/app/pages/performance/PerformancePage.tsx
var PerformancePage_exports = {};
__export(PerformancePage_exports, {
  PerformancePage: () => PerformancePage,
  default: () => PerformancePage_default
});
import { useEffect as useEffect4, useState as useState4 } from "react";
import { useCaptify as useCaptify3 } from "@captify-io/core/components";
import { apiClient as apiClient4 } from "@captify-io/core/lib";
import {
  Card as Card4,
  CardContent as CardContent4,
  CardHeader as CardHeader4,
  CardTitle as CardTitle4
} from "@captify-io/core/ui";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function PerformancePage() {
  const { session } = useCaptify3();
  const [businessHealth, setBusinessHealth] = useState4(null);
  const [burnAnalysis, setBurnAnalysis] = useState4(null);
  const [loading, setLoading] = useState4(true);
  useEffect4(() => {
    loadPerformanceData();
  }, []);
  const loadPerformanceData = /* @__PURE__ */ __name(async () => {
    try {
      const healthResponse = await apiClient4.run({
        service: "performance",
        operation: "getBusinessHealth",
        data: {}
      });
      setBusinessHealth(healthResponse.data || null);
      const burnResponse = await apiClient4.run({
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
  }, "loadPerformanceData");
  const formatCurrency = /* @__PURE__ */ __name((amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  }, "formatCurrency");
  return /* @__PURE__ */ jsxs4("div", { className: "container mx-auto p-6", children: [
    /* @__PURE__ */ jsx4("h1", { className: "text-3xl font-bold mb-6", children: "Performance Analytics" }),
    /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6", children: [
      /* @__PURE__ */ jsxs4(Card4, { children: [
        /* @__PURE__ */ jsx4(CardHeader4, { children: /* @__PURE__ */ jsx4(CardTitle4, { className: "text-sm", children: "Overall Health" }) }),
        /* @__PURE__ */ jsxs4(CardContent4, { children: [
          /* @__PURE__ */ jsx4("div", { className: "text-2xl font-bold text-green-600", children: loading ? "..." : businessHealth?.overallScore || 0 }),
          /* @__PURE__ */ jsx4("p", { className: "text-xs text-muted-foreground", children: "Health Score" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs4(Card4, { children: [
        /* @__PURE__ */ jsx4(CardHeader4, { children: /* @__PURE__ */ jsx4(CardTitle4, { className: "text-sm", children: "Monthly Revenue" }) }),
        /* @__PURE__ */ jsxs4(CardContent4, { children: [
          /* @__PURE__ */ jsx4("div", { className: "text-2xl font-bold text-blue-600", children: loading ? "..." : formatCurrency(businessHealth?.financial?.revenue || 0) }),
          /* @__PURE__ */ jsx4("p", { className: "text-xs text-muted-foreground", children: "Current Month" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs4(Card4, { children: [
        /* @__PURE__ */ jsx4(CardHeader4, { children: /* @__PURE__ */ jsx4(CardTitle4, { className: "text-sm", children: "Profit Margin" }) }),
        /* @__PURE__ */ jsxs4(CardContent4, { children: [
          /* @__PURE__ */ jsx4("div", { className: "text-2xl font-bold text-purple-600", children: loading ? "..." : `${Math.round(
            businessHealth?.financial?.profitMargin || 0
          )}%` }),
          /* @__PURE__ */ jsx4("p", { className: "text-xs text-muted-foreground", children: "Current Margin" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs4(Card4, { children: [
        /* @__PURE__ */ jsx4(CardHeader4, { children: /* @__PURE__ */ jsx4(CardTitle4, { className: "text-sm", children: "Team Utilization" }) }),
        /* @__PURE__ */ jsxs4(CardContent4, { children: [
          /* @__PURE__ */ jsx4("div", { className: "text-2xl font-bold text-orange-600", children: loading ? "..." : `${businessHealth?.employee?.utilization || 0}%` }),
          /* @__PURE__ */ jsx4("p", { className: "text-xs text-muted-foreground", children: "Current Rate" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
      /* @__PURE__ */ jsxs4(Card4, { children: [
        /* @__PURE__ */ jsx4(CardHeader4, { children: /* @__PURE__ */ jsx4(CardTitle4, { children: "Financial Health" }) }),
        /* @__PURE__ */ jsx4(CardContent4, { children: loading ? /* @__PURE__ */ jsx4("p", { children: "Loading..." }) : businessHealth?.financial ? /* @__PURE__ */ jsxs4("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs4("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx4("span", { children: "Revenue:" }),
            /* @__PURE__ */ jsx4("span", { className: "font-medium", children: formatCurrency(businessHealth.financial.revenue) })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx4("span", { children: "Costs:" }),
            /* @__PURE__ */ jsx4("span", { className: "font-medium", children: formatCurrency(businessHealth.financial.costs) })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx4("span", { children: "Profit:" }),
            /* @__PURE__ */ jsx4("span", { className: "font-medium text-green-600", children: formatCurrency(businessHealth.financial.profit) })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx4("span", { children: "Runway:" }),
            /* @__PURE__ */ jsxs4("span", { className: "font-medium", children: [
              Math.round(businessHealth.financial.runway),
              " months"
            ] })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx4("span", { children: "Backlog:" }),
            /* @__PURE__ */ jsx4("span", { className: "font-medium", children: formatCurrency(businessHealth.financial.backlog) })
          ] })
        ] }) : /* @__PURE__ */ jsx4("p", { children: "No financial data available" }) })
      ] }),
      /* @__PURE__ */ jsxs4(Card4, { children: [
        /* @__PURE__ */ jsx4(CardHeader4, { children: /* @__PURE__ */ jsx4(CardTitle4, { children: "Employee Metrics" }) }),
        /* @__PURE__ */ jsx4(CardContent4, { children: loading ? /* @__PURE__ */ jsx4("p", { children: "Loading..." }) : businessHealth?.employee ? /* @__PURE__ */ jsxs4("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs4("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx4("span", { children: "Headcount:" }),
            /* @__PURE__ */ jsx4("span", { className: "font-medium", children: businessHealth.employee.headcount })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx4("span", { children: "Utilization:" }),
            /* @__PURE__ */ jsxs4("span", { className: "font-medium", children: [
              businessHealth.employee.utilization,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx4("span", { children: "Satisfaction:" }),
            /* @__PURE__ */ jsxs4("span", { className: "font-medium", children: [
              businessHealth.employee.satisfaction,
              "/5.0"
            ] })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx4("span", { children: "Retention:" }),
            /* @__PURE__ */ jsxs4("span", { className: "font-medium", children: [
              businessHealth.employee.retention,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx4("span", { children: "Value/Employee:" }),
            /* @__PURE__ */ jsx4("span", { className: "font-medium", children: formatCurrency(businessHealth.employee.valuePerEmployee) })
          ] })
        ] }) : /* @__PURE__ */ jsx4("p", { children: "No employee data available" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4(Card4, { children: [
      /* @__PURE__ */ jsx4(CardHeader4, { children: /* @__PURE__ */ jsx4(CardTitle4, { children: "Monthly Burn Analysis" }) }),
      /* @__PURE__ */ jsx4(CardContent4, { children: loading ? /* @__PURE__ */ jsx4("p", { children: "Loading..." }) : burnAnalysis ? /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx4("h4", { className: "font-semibold mb-2", children: "Revenue" }),
          /* @__PURE__ */ jsx4("p", { className: "text-2xl font-bold text-green-600", children: formatCurrency(burnAnalysis.revenue) })
        ] }),
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx4("h4", { className: "font-semibold mb-2", children: "Total Costs" }),
          /* @__PURE__ */ jsx4("p", { className: "text-2xl font-bold text-red-600", children: formatCurrency(burnAnalysis.totalCosts) })
        ] }),
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx4("h4", { className: "font-semibold mb-2", children: "Net Profit" }),
          /* @__PURE__ */ jsx4("p", { className: "text-2xl font-bold text-blue-600", children: formatCurrency(burnAnalysis.profit) })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx4("h4", { className: "font-semibold mb-2", children: "Efficiency" }),
          /* @__PURE__ */ jsxs4("p", { className: "text-lg", children: [
            burnAnalysis.efficiency,
            "% cost efficiency"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsx4("p", { children: "No burn analysis data available" }) })
    ] })
  ] });
}
var PerformancePage_default;
var init_PerformancePage = __esm({
  "src/app/pages/performance/PerformancePage.tsx"() {
    "use strict";
    "use client";
    __name(PerformancePage, "PerformancePage");
    PerformancePage_default = PerformancePage;
  }
});

// src/app/pages/roadmaps/RoadmapsPage.tsx
var RoadmapsPage_exports = {};
__export(RoadmapsPage_exports, {
  RoadmapsPage: () => RoadmapsPage,
  default: () => RoadmapsPage_default
});
import { useState as useState5 } from "react";
import { useCaptify as useCaptify4 } from "@captify-io/core/hooks";
import {
  Card as Card5,
  CardContent as CardContent5,
  CardHeader as CardHeader5,
  CardTitle as CardTitle5,
  Badge as Badge3,
  Button as Button4,
  Progress as Progress3,
  Tabs as Tabs3,
  TabsContent as TabsContent3,
  TabsList as TabsList3,
  TabsTrigger as TabsTrigger3
} from "@captify-io/core/ui";
import {
  GitBranch,
  Users as Users2,
  Clock as Clock3,
  Activity as Activity2
} from "lucide-react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function RoadmapsPage() {
  const { session } = useCaptify4();
  const [selectedView, setSelectedView] = useState5("timeline");
  const roadmapData = {
    objectives: [
      {
        id: "1",
        title: "Modernize Data Infrastructure",
        quarter: "Q1 2024",
        progress: 65,
        status: "in-progress",
        keyResults: [
          { metric: "Data Pipeline Efficiency", current: 75, target: 95 },
          { metric: "Processing Time Reduction", current: 40, target: 60 }
        ]
      },
      {
        id: "2",
        title: "Enhance Customer Analytics",
        quarter: "Q2 2024",
        progress: 30,
        status: "planned",
        keyResults: [
          { metric: "Dashboard Adoption", current: 20, target: 80 },
          { metric: "Report Automation", current: 25, target: 90 }
        ]
      }
    ],
    initiatives: [
      {
        id: "1",
        title: "Cloud Migration Phase 2",
        status: "active",
        progress: 45,
        workStreams: ["DevOps", "DataOps", "Security"],
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        healthScore: 85
      },
      {
        id: "2",
        title: "AI/ML Platform Implementation",
        status: "active",
        progress: 20,
        workStreams: ["AIops", "Engineering", "DataOps"],
        startDate: "2024-02-01",
        endDate: "2024-09-30",
        healthScore: 75
      }
    ],
    workStreams: [
      {
        id: "dataops",
        name: "DataOps",
        lead: "Sarah Chen",
        capacity: 160,
        utilization: 85,
        activeInitiatives: 3
      },
      {
        id: "devops",
        name: "DevOps",
        lead: "Mike Johnson",
        capacity: 120,
        utilization: 90,
        activeInitiatives: 2
      },
      {
        id: "aiops",
        name: "AIops",
        lead: "Dr. Emily Watson",
        capacity: 80,
        utilization: 70,
        activeInitiatives: 2
      },
      {
        id: "engineering",
        name: "Engineering",
        lead: "Tom Rodriguez",
        capacity: 200,
        utilization: 80,
        activeInitiatives: 4
      }
    ]
  };
  return /* @__PURE__ */ jsxs5("div", { className: "container mx-auto p-6 space-y-6", children: [
    /* @__PURE__ */ jsxs5("div", { children: [
      /* @__PURE__ */ jsx5("h1", { className: "text-3xl font-bold", children: "Strategic Roadmaps" }),
      /* @__PURE__ */ jsx5("p", { className: "text-muted-foreground", children: "Align contract goals with work stream execution" })
    ] }),
    /* @__PURE__ */ jsxs5(Tabs3, { value: selectedView, onValueChange: setSelectedView, children: [
      /* @__PURE__ */ jsxs5(TabsList3, { className: "grid w-full grid-cols-4", children: [
        /* @__PURE__ */ jsx5(TabsTrigger3, { value: "timeline", children: "Timeline View" }),
        /* @__PURE__ */ jsx5(TabsTrigger3, { value: "objectives", children: "Objectives" }),
        /* @__PURE__ */ jsx5(TabsTrigger3, { value: "initiatives", children: "Initiatives" }),
        /* @__PURE__ */ jsx5(TabsTrigger3, { value: "workstreams", children: "Work Streams" })
      ] }),
      /* @__PURE__ */ jsx5(TabsContent3, { value: "timeline", className: "space-y-6", children: /* @__PURE__ */ jsxs5(Card5, { children: [
        /* @__PURE__ */ jsx5(CardHeader5, { children: /* @__PURE__ */ jsx5(CardTitle5, { children: "Strategic Timeline" }) }),
        /* @__PURE__ */ jsx5(CardContent5, { children: /* @__PURE__ */ jsxs5("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs5("div", { className: "grid grid-cols-4 gap-4 mb-4", children: [
            /* @__PURE__ */ jsx5("div", { className: "text-center font-medium", children: "Q1 2024" }),
            /* @__PURE__ */ jsx5("div", { className: "text-center font-medium", children: "Q2 2024" }),
            /* @__PURE__ */ jsx5("div", { className: "text-center font-medium", children: "Q3 2024" }),
            /* @__PURE__ */ jsx5("div", { className: "text-center font-medium", children: "Q4 2024" })
          ] }),
          roadmapData.initiatives.map((initiative) => /* @__PURE__ */ jsxs5("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs5("div", { children: [
                /* @__PURE__ */ jsx5("p", { className: "font-medium", children: initiative.title }),
                /* @__PURE__ */ jsx5("div", { className: "flex gap-2 mt-1", children: initiative.workStreams.map((ws) => /* @__PURE__ */ jsx5(Badge3, { variant: "outline", className: "text-xs", children: ws }, ws)) })
              ] }),
              /* @__PURE__ */ jsxs5(
                Badge3,
                {
                  variant: initiative.healthScore > 80 ? "default" : "destructive",
                  children: [
                    initiative.progress,
                    "%"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx5(Progress3, { value: initiative.progress, className: "h-6" })
          ] }, initiative.id))
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx5(TabsContent3, { value: "objectives", className: "space-y-4", children: /* @__PURE__ */ jsx5("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: roadmapData.objectives.map((objective) => /* @__PURE__ */ jsxs5(Card5, { children: [
        /* @__PURE__ */ jsx5(CardHeader5, { children: /* @__PURE__ */ jsxs5("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsxs5("div", { children: [
            /* @__PURE__ */ jsx5(CardTitle5, { className: "text-lg", children: objective.title }),
            /* @__PURE__ */ jsx5("p", { className: "text-sm text-muted-foreground", children: objective.quarter })
          ] }),
          /* @__PURE__ */ jsx5(
            Badge3,
            {
              variant: objective.status === "in-progress" ? "default" : "secondary",
              children: objective.status
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs5(CardContent5, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs5("div", { children: [
            /* @__PURE__ */ jsxs5("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsx5("span", { children: "Overall Progress" }),
              /* @__PURE__ */ jsxs5("span", { children: [
                objective.progress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx5(Progress3, { value: objective.progress })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx5("p", { className: "text-sm font-medium", children: "Key Results" }),
            objective.keyResults.map((kr, idx) => /* @__PURE__ */ jsxs5("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs5("div", { className: "flex justify-between text-xs", children: [
                /* @__PURE__ */ jsx5("span", { children: kr.metric }),
                /* @__PURE__ */ jsxs5("span", { children: [
                  kr.current,
                  "/",
                  kr.target
                ] })
              ] }),
              /* @__PURE__ */ jsx5(
                Progress3,
                {
                  value: kr.current / kr.target * 100,
                  className: "h-2"
                }
              )
            ] }, idx))
          ] })
        ] })
      ] }, objective.id)) }) }),
      /* @__PURE__ */ jsx5(TabsContent3, { value: "initiatives", className: "space-y-4", children: /* @__PURE__ */ jsx5("div", { className: "space-y-4", children: roadmapData.initiatives.map((initiative) => /* @__PURE__ */ jsxs5(Card5, { children: [
        /* @__PURE__ */ jsx5(CardHeader5, { children: /* @__PURE__ */ jsxs5("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsxs5("div", { children: [
            /* @__PURE__ */ jsx5(CardTitle5, { className: "text-lg", children: initiative.title }),
            /* @__PURE__ */ jsxs5("p", { className: "text-sm text-muted-foreground", children: [
              initiative.startDate,
              " - ",
              initiative.endDate
            ] })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs5(
              Badge3,
              {
                variant: initiative.healthScore > 80 ? "default" : initiative.healthScore > 60 ? "secondary" : "destructive",
                children: [
                  "Health: ",
                  initiative.healthScore
                ]
              }
            ),
            /* @__PURE__ */ jsx5(Badge3, { variant: "outline", children: initiative.status })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs5(CardContent5, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs5("div", { children: [
            /* @__PURE__ */ jsxs5("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsx5("span", { children: "Progress" }),
              /* @__PURE__ */ jsxs5("span", { children: [
                initiative.progress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx5(Progress3, { value: initiative.progress })
          ] }),
          /* @__PURE__ */ jsxs5("div", { children: [
            /* @__PURE__ */ jsx5("p", { className: "text-sm font-medium mb-2", children: "Assigned Work Streams" }),
            /* @__PURE__ */ jsx5("div", { className: "flex flex-wrap gap-2", children: initiative.workStreams.map((ws) => /* @__PURE__ */ jsxs5(
              "div",
              {
                className: "flex items-center gap-1 px-2 py-1 rounded-md bg-muted",
                children: [
                  /* @__PURE__ */ jsx5(Users2, { className: "h-3 w-3" }),
                  /* @__PURE__ */ jsx5("span", { className: "text-sm", children: ws })
                ]
              },
              ws
            )) })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "grid grid-cols-3 gap-4 pt-2", children: [
            /* @__PURE__ */ jsxs5("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx5(GitBranch, { className: "h-4 w-4 mx-auto mb-1 text-muted-foreground" }),
              /* @__PURE__ */ jsx5("p", { className: "text-xs text-muted-foreground", children: "Epics" }),
              /* @__PURE__ */ jsx5("p", { className: "text-sm font-medium", children: "8" })
            ] }),
            /* @__PURE__ */ jsxs5("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx5(Activity2, { className: "h-4 w-4 mx-auto mb-1 text-muted-foreground" }),
              /* @__PURE__ */ jsx5("p", { className: "text-xs text-muted-foreground", children: "Features" }),
              /* @__PURE__ */ jsx5("p", { className: "text-sm font-medium", children: "24" })
            ] }),
            /* @__PURE__ */ jsxs5("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx5(Clock3, { className: "h-4 w-4 mx-auto mb-1 text-muted-foreground" }),
              /* @__PURE__ */ jsx5("p", { className: "text-xs text-muted-foreground", children: "Days Left" }),
              /* @__PURE__ */ jsx5("p", { className: "text-sm font-medium", children: Math.floor(
                (new Date(initiative.endDate).getTime() - Date.now()) / (1e3 * 60 * 60 * 24)
              ) })
            ] })
          ] })
        ] })
      ] }, initiative.id)) }) }),
      /* @__PURE__ */ jsxs5(TabsContent3, { value: "workstreams", className: "space-y-4", children: [
        /* @__PURE__ */ jsx5("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: roadmapData.workStreams.map((ws) => /* @__PURE__ */ jsxs5(Card5, { children: [
          /* @__PURE__ */ jsxs5(CardHeader5, { className: "pb-3", children: [
            /* @__PURE__ */ jsx5(CardTitle5, { className: "text-base", children: ws.name }),
            /* @__PURE__ */ jsxs5("p", { className: "text-xs text-muted-foreground", children: [
              "Lead: ",
              ws.lead
            ] })
          ] }),
          /* @__PURE__ */ jsxs5(CardContent5, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs5("div", { children: [
              /* @__PURE__ */ jsxs5("div", { className: "flex justify-between text-xs mb-1", children: [
                /* @__PURE__ */ jsx5("span", { children: "Capacity" }),
                /* @__PURE__ */ jsxs5("span", { children: [
                  ws.capacity,
                  " hrs/wk"
                ] })
              ] }),
              /* @__PURE__ */ jsx5(Progress3, { value: ws.utilization, className: "h-2" }),
              /* @__PURE__ */ jsxs5("p", { className: "text-xs text-muted-foreground mt-1", children: [
                ws.utilization,
                "% utilized"
              ] })
            ] }),
            /* @__PURE__ */ jsx5("div", { className: "pt-2 border-t", children: /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx5("span", { className: "text-xs text-muted-foreground", children: "Active Initiatives" }),
              /* @__PURE__ */ jsx5(Badge3, { variant: "secondary", children: ws.activeInitiatives })
            ] }) }),
            /* @__PURE__ */ jsx5(Button4, { variant: "outline", size: "sm", className: "w-full", children: "View Service Catalog" })
          ] })
        ] }, ws.id)) }),
        /* @__PURE__ */ jsxs5(Card5, { children: [
          /* @__PURE__ */ jsx5(CardHeader5, { children: /* @__PURE__ */ jsx5(CardTitle5, { children: "Work Stream Alignment Matrix" }) }),
          /* @__PURE__ */ jsx5(CardContent5, { children: /* @__PURE__ */ jsx5("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs5("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsx5("thead", { children: /* @__PURE__ */ jsxs5("tr", { className: "border-b", children: [
              /* @__PURE__ */ jsx5("th", { className: "text-left p-2", children: "Work Stream" }),
              /* @__PURE__ */ jsx5("th", { className: "text-center p-2", children: "Contract 1" }),
              /* @__PURE__ */ jsx5("th", { className: "text-center p-2", children: "Contract 2" }),
              /* @__PURE__ */ jsx5("th", { className: "text-center p-2", children: "Contract 3" }),
              /* @__PURE__ */ jsx5("th", { className: "text-center p-2", children: "Total %" })
            ] }) }),
            /* @__PURE__ */ jsx5("tbody", { children: roadmapData.workStreams.map((ws) => /* @__PURE__ */ jsxs5("tr", { className: "border-b", children: [
              /* @__PURE__ */ jsx5("td", { className: "p-2 font-medium", children: ws.name }),
              /* @__PURE__ */ jsx5("td", { className: "text-center p-2", children: "30%" }),
              /* @__PURE__ */ jsx5("td", { className: "text-center p-2", children: "45%" }),
              /* @__PURE__ */ jsx5("td", { className: "text-center p-2", children: "25%" }),
              /* @__PURE__ */ jsx5("td", { className: "text-center p-2", children: /* @__PURE__ */ jsx5(Badge3, { variant: "outline", children: "100%" }) })
            ] }, ws.id)) })
          ] }) }) })
        ] })
      ] })
    ] })
  ] });
}
var RoadmapsPage_default;
var init_RoadmapsPage = __esm({
  "src/app/pages/roadmaps/RoadmapsPage.tsx"() {
    "use strict";
    "use client";
    __name(RoadmapsPage, "RoadmapsPage");
    RoadmapsPage_default = RoadmapsPage;
  }
});

// src/app/pages/work/WorkDashboard.tsx
var WorkDashboard_exports = {};
__export(WorkDashboard_exports, {
  WorkDashboardPage: () => WorkDashboardPage,
  default: () => WorkDashboard_default
});
import { useEffect as useEffect5, useState as useState6 } from "react";
import { useCaptify as useCaptify5 } from "@captify-io/core/components";
import { apiClient as apiClient5 } from "@captify-io/core/lib";
import {
  Card as Card6,
  CardContent as CardContent6,
  CardHeader as CardHeader6,
  CardTitle as CardTitle6,
  Button as Button5,
  Badge as Badge4,
  Progress as Progress4,
  Tabs as Tabs4,
  TabsContent as TabsContent4,
  TabsList as TabsList4,
  TabsTrigger as TabsTrigger4
} from "@captify-io/core/ui";
import {
  Play,
  Pause,
  CheckCircle as CheckCircle3,
  Target as Target3,
  Zap,
  AlertCircle as AlertCircle4
} from "lucide-react";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function WorkDashboardPage() {
  const { session } = useCaptify5();
  const [activeWork, setActiveWork] = useState6(null);
  const [workQueue, setWorkQueue] = useState6(null);
  const [productivity, setProductivity] = useState6(null);
  const [loading, setLoading] = useState6(true);
  const [timer, setTimer] = useState6(0);
  useEffect5(() => {
    loadWorkData();
    const interval = setInterval(() => {
      if (activeWork) {
        setTimer((prev) => prev + 1);
      }
    }, 1e3);
    return () => clearInterval(interval);
  }, [activeWork]);
  const loadWorkData = /* @__PURE__ */ __name(async () => {
    try {
      const [queueData, prodData] = await Promise.all([
        apiClient5.run({
          service: "work",
          operation: "getWorkQueue",
          data: { userId: session?.user?.id }
        }),
        apiClient5.run({
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
  }, "loadWorkData");
  const startWork = /* @__PURE__ */ __name(async (workItem) => {
    try {
      const workSession = await apiClient5.run({
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
  }, "startWork");
  const stopWork = /* @__PURE__ */ __name(async () => {
    try {
      await apiClient5.run({
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
  }, "stopWork");
  const formatTime = /* @__PURE__ */ __name((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  }, "formatTime");
  if (loading) {
    return /* @__PURE__ */ jsx6("div", { className: "flex items-center justify-center h-96", children: "Loading..." });
  }
  return /* @__PURE__ */ jsxs6("div", { className: "container mx-auto p-6 space-y-6", children: [
    /* @__PURE__ */ jsx6("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxs6("div", { children: [
      /* @__PURE__ */ jsx6("h1", { className: "text-3xl font-bold", children: "My Work" }),
      /* @__PURE__ */ jsx6("p", { className: "text-muted-foreground", children: "Focus on value delivery" })
    ] }) }),
    activeWork ? /* @__PURE__ */ jsxs6(Card6, { className: "border-primary", children: [
      /* @__PURE__ */ jsx6(CardHeader6, { children: /* @__PURE__ */ jsxs6(CardTitle6, { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs6("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx6(Play, { className: "h-5 w-5 text-green-500" }),
          "Current Focus"
        ] }),
        /* @__PURE__ */ jsx6(Badge4, { variant: "default", children: formatTime(timer) })
      ] }) }),
      /* @__PURE__ */ jsxs6(CardContent6, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx6("h3", { className: "font-semibold text-lg", children: activeWork.title }),
          /* @__PURE__ */ jsx6("p", { className: "text-sm text-muted-foreground mt-1", children: activeWork.description })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx6(Badge4, { children: activeWork.type }),
          /* @__PURE__ */ jsxs6(Badge4, { variant: "outline", children: [
            "Value: ",
            activeWork.valueScore,
            "/10"
          ] }),
          /* @__PURE__ */ jsx6(Badge4, { variant: "outline", children: activeWork.complexity })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs6(
            Button5,
            {
              onClick: stopWork,
              variant: "destructive",
              className: "flex-1",
              children: [
                /* @__PURE__ */ jsx6(Pause, { className: "h-4 w-4 mr-2" }),
                "Stop Work"
              ]
            }
          ),
          /* @__PURE__ */ jsxs6(
            Button5,
            {
              onClick: () => stopWork(),
              variant: "default",
              className: "flex-1",
              children: [
                /* @__PURE__ */ jsx6(CheckCircle3, { className: "h-4 w-4 mr-2" }),
                "Complete"
              ]
            }
          )
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxs6(Card6, { children: [
      /* @__PURE__ */ jsx6(CardHeader6, { children: /* @__PURE__ */ jsx6(CardTitle6, { children: "Ready to Work" }) }),
      /* @__PURE__ */ jsx6(CardContent6, { children: /* @__PURE__ */ jsx6("p", { className: "text-muted-foreground", children: "Select a work item below to start tracking" }) })
    ] }),
    /* @__PURE__ */ jsxs6("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs6(Card6, { children: [
        /* @__PURE__ */ jsx6(CardHeader6, { className: "pb-2", children: /* @__PURE__ */ jsx6(CardTitle6, { className: "text-sm", children: "Today's Progress" }) }),
        /* @__PURE__ */ jsxs6(CardContent6, { children: [
          /* @__PURE__ */ jsxs6("div", { className: "text-2xl font-bold", children: [
            productivity?.totalHours?.toFixed(1) || 0,
            "h"
          ] }),
          /* @__PURE__ */ jsx6(
            Progress4,
            {
              value: productivity?.totalHours / 8 * 100 || 0,
              className: "mt-2"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs6(Card6, { children: [
        /* @__PURE__ */ jsx6(CardHeader6, { className: "pb-2", children: /* @__PURE__ */ jsx6(CardTitle6, { className: "text-sm", children: "Value Delivered" }) }),
        /* @__PURE__ */ jsxs6(CardContent6, { children: [
          /* @__PURE__ */ jsxs6("div", { className: "text-2xl font-bold", children: [
            "$",
            (productivity?.totalValue || 0).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxs6("p", { className: "text-xs text-muted-foreground", children: [
            "ROI: ",
            productivity?.valuePerHour?.toFixed(0) || 0,
            "/hr"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs6(Card6, { children: [
        /* @__PURE__ */ jsx6(CardHeader6, { className: "pb-2", children: /* @__PURE__ */ jsx6(CardTitle6, { className: "text-sm", children: "Strategic Alignment" }) }),
        /* @__PURE__ */ jsxs6(CardContent6, { children: [
          /* @__PURE__ */ jsxs6("div", { className: "text-2xl font-bold", children: [
            productivity?.strategicAlignment?.toFixed(0) || 0,
            "%"
          ] }),
          /* @__PURE__ */ jsxs6("div", { className: "flex items-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx6(Target3, { className: "h-3 w-3 mr-1" }),
            "On critical path"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs6(Card6, { children: [
        /* @__PURE__ */ jsx6(CardHeader6, { className: "pb-2", children: /* @__PURE__ */ jsx6(CardTitle6, { className: "text-sm", children: "Focus Time" }) }),
        /* @__PURE__ */ jsxs6(CardContent6, { children: [
          /* @__PURE__ */ jsxs6("div", { className: "text-2xl font-bold", children: [
            productivity?.focusTime?.toFixed(1) || 0,
            "h"
          ] }),
          /* @__PURE__ */ jsxs6("div", { className: "flex items-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx6(Zap, { className: "h-3 w-3 mr-1" }),
            "Deep work"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs6(Card6, { children: [
      /* @__PURE__ */ jsx6(CardHeader6, { children: /* @__PURE__ */ jsx6(CardTitle6, { children: "Work Queue" }) }),
      /* @__PURE__ */ jsx6(CardContent6, { children: /* @__PURE__ */ jsxs6(Tabs4, { defaultValue: "recommended", children: [
        /* @__PURE__ */ jsxs6(TabsList4, { className: "grid w-full grid-cols-5", children: [
          /* @__PURE__ */ jsx6(TabsTrigger4, { value: "recommended", children: "Recommended" }),
          /* @__PURE__ */ jsx6(TabsTrigger4, { value: "critical", children: "Critical Path" }),
          /* @__PURE__ */ jsx6(TabsTrigger4, { value: "quick", children: "Quick Wins" }),
          /* @__PURE__ */ jsx6(TabsTrigger4, { value: "debt", children: "Tech Debt" }),
          /* @__PURE__ */ jsx6(TabsTrigger4, { value: "blocked", children: "Blocked" })
        ] }),
        /* @__PURE__ */ jsx6(TabsContent4, { value: "recommended", className: "space-y-3", children: workQueue?.recommended?.map((item) => /* @__PURE__ */ jsx6(WorkItem, { item, onStart: startWork }, item.id)) }),
        /* @__PURE__ */ jsx6(TabsContent4, { value: "critical", className: "space-y-3", children: workQueue?.criticalPath?.map((item) => /* @__PURE__ */ jsx6(
          WorkItem,
          {
            item,
            onStart: startWork,
            critical: true
          },
          item.id
        )) }),
        /* @__PURE__ */ jsx6(TabsContent4, { value: "quick", className: "space-y-3", children: workQueue?.quickWins?.map((item) => /* @__PURE__ */ jsx6(WorkItem, { item, onStart: startWork }, item.id)) }),
        /* @__PURE__ */ jsx6(TabsContent4, { value: "debt", className: "space-y-3", children: workQueue?.techDebt?.map((item) => /* @__PURE__ */ jsx6(WorkItem, { item, onStart: startWork }, item.id)) }),
        /* @__PURE__ */ jsx6(TabsContent4, { value: "blocked", className: "space-y-3", children: workQueue?.blocked?.map((item) => /* @__PURE__ */ jsx6(WorkItem, { item, blocked: true }, item.id)) })
      ] }) })
    ] })
  ] });
}
function WorkItem({ item, onStart, critical, blocked }) {
  return /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-between p-4 rounded-lg border bg-card", children: [
    /* @__PURE__ */ jsxs6("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx6("h4", { className: "font-medium", children: item.title }),
        critical && /* @__PURE__ */ jsx6(AlertCircle4, { className: "h-4 w-4 text-red-500" })
      ] }),
      /* @__PURE__ */ jsx6("p", { className: "text-sm text-muted-foreground mt-1", children: item.description }),
      /* @__PURE__ */ jsxs6("div", { className: "flex gap-2 mt-2", children: [
        /* @__PURE__ */ jsx6(Badge4, { variant: "outline", children: item.type }),
        /* @__PURE__ */ jsx6(Badge4, { variant: "outline", children: item.complexity }),
        /* @__PURE__ */ jsxs6(Badge4, { variant: "outline", children: [
          item.estimatedHours,
          "h"
        ] }),
        /* @__PURE__ */ jsxs6(Badge4, { variant: "default", children: [
          "Value: ",
          item.valueScore
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs6(Button5, { onClick: () => onStart(item), disabled: blocked, size: "sm", children: [
      /* @__PURE__ */ jsx6(Play, { className: "h-4 w-4 mr-1" }),
      "Start"
    ] })
  ] });
}
var WorkDashboard_default;
var init_WorkDashboard = __esm({
  "src/app/pages/work/WorkDashboard.tsx"() {
    "use strict";
    "use client";
    __name(WorkDashboardPage, "WorkDashboardPage");
    __name(WorkItem, "WorkItem");
    WorkDashboard_default = WorkDashboardPage;
  }
});

// src/app/pages/services/ServicesHub.tsx
var ServicesHub_exports = {};
__export(ServicesHub_exports, {
  ServicesHubPage: () => ServicesHubPage,
  default: () => ServicesHub_default
});
import { useEffect as useEffect6, useState as useState7 } from "react";
import { useCaptify as useCaptify6 } from "@captify-io/core/components";
import { apiClient as apiClient6 } from "@captify-io/core/lib";
import {
  Card as Card7,
  CardContent as CardContent7,
  CardHeader as CardHeader7,
  CardTitle as CardTitle7,
  Badge as Badge5,
  Button as Button6,
  Input as Input2,
  Textarea as Textarea2,
  Select as Select2,
  SelectContent as SelectContent2,
  SelectItem as SelectItem2,
  SelectTrigger as SelectTrigger2,
  SelectValue as SelectValue2,
  Tabs as Tabs5,
  TabsContent as TabsContent5,
  TabsList as TabsList5,
  TabsTrigger as TabsTrigger5
} from "@captify-io/core/ui";
import {
  Plus as Plus3,
  Ticket,
  Clock as Clock5,
  DollarSign as DollarSign3,
  Star
} from "lucide-react";
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
function ServicesHubPage() {
  const { session } = useCaptify6();
  const [marketplace, setMarketplace] = useState7(null);
  const [catalog, setCatalog] = useState7([]);
  const [loading, setLoading] = useState7(true);
  const [showCreateTicket, setShowCreateTicket] = useState7(false);
  const [newTicket, setNewTicket] = useState7({
    title: "",
    description: "",
    serviceArea: "DevOps",
    type: "request",
    priority: "medium",
    bounty: 0
  });
  useEffect6(() => {
    loadMarketplace();
    loadCatalog();
  }, []);
  const loadMarketplace = /* @__PURE__ */ __name(async () => {
    try {
      const response = await apiClient6.run({
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
  }, "loadMarketplace");
  const loadCatalog = /* @__PURE__ */ __name(async () => {
    try {
      const response = await apiClient6.run({
        service: "service",
        operation: "getServiceCatalog"
      });
      setCatalog(response?.data || []);
    } catch (error) {
      console.error("Failed to load catalog:", error);
    }
  }, "loadCatalog");
  const createTicket = /* @__PURE__ */ __name(async () => {
    try {
      await apiClient6.run({
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
  }, "createTicket");
  const claimTicket = /* @__PURE__ */ __name(async (ticketId) => {
    try {
      await apiClient6.run({
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
  }, "claimTicket");
  if (loading) {
    return /* @__PURE__ */ jsx7("div", { className: "flex items-center justify-center h-96", children: "Loading..." });
  }
  return /* @__PURE__ */ jsxs7("div", { className: "container mx-auto p-6 space-y-6", children: [
    /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs7("div", { children: [
        /* @__PURE__ */ jsx7("h1", { className: "text-3xl font-bold", children: "Services Hub" }),
        /* @__PURE__ */ jsx7("p", { className: "text-muted-foreground", children: "Internal service marketplace" })
      ] }),
      /* @__PURE__ */ jsxs7(Button6, { onClick: () => setShowCreateTicket(true), children: [
        /* @__PURE__ */ jsx7(Plus3, { className: "h-4 w-4 mr-2" }),
        "Create Ticket"
      ] })
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs7(Card7, { children: [
        /* @__PURE__ */ jsx7(CardHeader7, { className: "pb-2", children: /* @__PURE__ */ jsx7(CardTitle7, { className: "text-sm", children: "Available Tickets" }) }),
        /* @__PURE__ */ jsxs7(CardContent7, { children: [
          /* @__PURE__ */ jsx7("div", { className: "text-2xl font-bold", children: marketplace?.available?.urgent?.length + marketplace?.available?.highBounty?.length || 0 }),
          /* @__PURE__ */ jsxs7("p", { className: "text-xs text-muted-foreground", children: [
            "$",
            marketplace?.potentialEarnings || 0,
            " potential"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs7(Card7, { children: [
        /* @__PURE__ */ jsx7(CardHeader7, { className: "pb-2", children: /* @__PURE__ */ jsx7(CardTitle7, { className: "text-sm", children: "My Active" }) }),
        /* @__PURE__ */ jsxs7(CardContent7, { children: [
          /* @__PURE__ */ jsx7("div", { className: "text-2xl font-bold", children: marketplace?.myTickets?.assigned?.length || 0 }),
          /* @__PURE__ */ jsxs7("div", { className: "flex items-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx7(Clock5, { className: "h-3 w-3 mr-1" }),
            "In progress"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs7(Card7, { children: [
        /* @__PURE__ */ jsx7(CardHeader7, { className: "pb-2", children: /* @__PURE__ */ jsx7(CardTitle7, { className: "text-sm", children: "My Requests" }) }),
        /* @__PURE__ */ jsxs7(CardContent7, { children: [
          /* @__PURE__ */ jsx7("div", { className: "text-2xl font-bold", children: marketplace?.myTickets?.requested?.length || 0 }),
          /* @__PURE__ */ jsxs7("div", { className: "flex items-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx7(Ticket, { className: "h-3 w-3 mr-1" }),
            "Submitted"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs7(Card7, { children: [
        /* @__PURE__ */ jsx7(CardHeader7, { className: "pb-2", children: /* @__PURE__ */ jsx7(CardTitle7, { className: "text-sm", children: "Leaderboard Rank" }) }),
        /* @__PURE__ */ jsxs7(CardContent7, { children: [
          /* @__PURE__ */ jsx7("div", { className: "text-2xl font-bold", children: "#5" }),
          /* @__PURE__ */ jsxs7("div", { className: "flex items-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx7(Star, { className: "h-3 w-3 mr-1" }),
            "Top performer"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs7(Card7, { children: [
      /* @__PURE__ */ jsx7(CardHeader7, { children: /* @__PURE__ */ jsx7(CardTitle7, { children: "Service Marketplace" }) }),
      /* @__PURE__ */ jsx7(CardContent7, { children: /* @__PURE__ */ jsxs7(Tabs5, { defaultValue: "available", children: [
        /* @__PURE__ */ jsxs7(TabsList5, { children: [
          /* @__PURE__ */ jsx7(TabsTrigger5, { value: "available", children: "Available" }),
          /* @__PURE__ */ jsx7(TabsTrigger5, { value: "mytickets", children: "My Tickets" }),
          /* @__PURE__ */ jsx7(TabsTrigger5, { value: "catalog", children: "Service Catalog" }),
          /* @__PURE__ */ jsx7(TabsTrigger5, { value: "leaderboard", children: "Leaderboard" })
        ] }),
        /* @__PURE__ */ jsxs7(TabsContent5, { value: "available", className: "space-y-4", children: [
          marketplace?.available?.urgent?.length > 0 && /* @__PURE__ */ jsxs7("div", { children: [
            /* @__PURE__ */ jsxs7("h4", { className: "font-medium mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx7(Badge5, { variant: "destructive", children: "Urgent" }),
              "High Priority Tickets"
            ] }),
            /* @__PURE__ */ jsx7("div", { className: "space-y-3", children: marketplace.available.urgent.map((ticket) => /* @__PURE__ */ jsx7(
              TicketCard,
              {
                ticket,
                onClaim: claimTicket
              },
              ticket.id
            )) })
          ] }),
          marketplace?.available?.highBounty?.length > 0 && /* @__PURE__ */ jsxs7("div", { children: [
            /* @__PURE__ */ jsxs7("h4", { className: "font-medium mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx7(DollarSign3, { className: "h-4 w-4" }),
              "High Bounty"
            ] }),
            /* @__PURE__ */ jsx7("div", { className: "space-y-3", children: marketplace.available.highBounty.map((ticket) => /* @__PURE__ */ jsx7(
              TicketCard,
              {
                ticket,
                onClaim: claimTicket
              },
              ticket.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs7(TabsContent5, { value: "mytickets", className: "space-y-4", children: [
          /* @__PURE__ */ jsxs7("div", { children: [
            /* @__PURE__ */ jsx7("h4", { className: "font-medium mb-3", children: "Assigned to Me" }),
            /* @__PURE__ */ jsx7("div", { className: "space-y-3", children: marketplace?.myTickets?.assigned?.map((ticket) => /* @__PURE__ */ jsx7(TicketCard, { ticket, assigned: true }, ticket.id)) })
          ] }),
          /* @__PURE__ */ jsxs7("div", { children: [
            /* @__PURE__ */ jsx7("h4", { className: "font-medium mb-3", children: "My Requests" }),
            /* @__PURE__ */ jsx7("div", { className: "space-y-3", children: marketplace?.myTickets?.requested?.map((ticket) => /* @__PURE__ */ jsx7(TicketCard, { ticket, requested: true }, ticket.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsx7(TabsContent5, { value: "catalog", className: "space-y-3", children: catalog.map((service) => /* @__PURE__ */ jsx7("div", { className: "p-4 rounded-lg border", children: /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsxs7("div", { children: [
            /* @__PURE__ */ jsx7("h4", { className: "font-medium", children: service.service }),
            /* @__PURE__ */ jsx7("p", { className: "text-sm text-muted-foreground mt-1", children: service.description }),
            /* @__PURE__ */ jsxs7("div", { className: "flex gap-2 mt-2", children: [
              /* @__PURE__ */ jsx7(Badge5, { variant: "outline", children: service.serviceArea }),
              /* @__PURE__ */ jsx7(Badge5, { variant: "outline", children: service.complexity }),
              /* @__PURE__ */ jsxs7(Badge5, { variant: "outline", children: [
                service.estimatedTime,
                "h"
              ] })
            ] })
          ] }),
          service.selfService && /* @__PURE__ */ jsx7(Button6, { size: "sm", children: "Request" })
        ] }) }, service.id)) }),
        /* @__PURE__ */ jsx7(TabsContent5, { value: "leaderboard", children: /* @__PURE__ */ jsx7("div", { className: "space-y-3", children: marketplace?.leaderboard?.map((entry, idx) => /* @__PURE__ */ jsxs7(
          "div",
          {
            className: "flex items-center justify-between p-4 rounded-lg border",
            children: [
              /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxs7("div", { className: "text-2xl font-bold", children: [
                  "#",
                  idx + 1
                ] }),
                /* @__PURE__ */ jsxs7("div", { children: [
                  /* @__PURE__ */ jsx7("p", { className: "font-medium", children: entry.userId }),
                  /* @__PURE__ */ jsxs7("p", { className: "text-sm text-muted-foreground", children: [
                    entry.ticketsResolved,
                    " resolved"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs7("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx7(Star, { className: "h-4 w-4 text-yellow-500" }),
                  /* @__PURE__ */ jsxs7("span", { className: "font-medium", children: [
                    entry.satisfaction,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs7("p", { className: "text-sm text-muted-foreground", children: [
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
    showCreateTicket && /* @__PURE__ */ jsx7("div", { className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs7(Card7, { className: "w-full max-w-lg", children: [
      /* @__PURE__ */ jsx7(CardHeader7, { children: /* @__PURE__ */ jsx7(CardTitle7, { children: "Create Service Ticket" }) }),
      /* @__PURE__ */ jsxs7(CardContent7, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx7("label", { className: "text-sm font-medium", children: "Title" }),
          /* @__PURE__ */ jsx7(
            Input2,
            {
              value: newTicket.title,
              onChange: (e) => setNewTicket({ ...newTicket, title: e.target.value }),
              placeholder: "Brief description of what you need"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx7("label", { className: "text-sm font-medium", children: "Description" }),
          /* @__PURE__ */ jsx7(
            Textarea2,
            {
              value: newTicket.description,
              onChange: (e) => setNewTicket({ ...newTicket, description: e.target.value }),
              placeholder: "Detailed description and acceptance criteria",
              rows: 4
            }
          )
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs7("div", { children: [
            /* @__PURE__ */ jsx7("label", { className: "text-sm font-medium", children: "Service Area" }),
            /* @__PURE__ */ jsxs7(
              Select2,
              {
                value: newTicket.serviceArea,
                onValueChange: (value) => setNewTicket({ ...newTicket, serviceArea: value }),
                children: [
                  /* @__PURE__ */ jsx7(SelectTrigger2, { children: /* @__PURE__ */ jsx7(SelectValue2, {}) }),
                  /* @__PURE__ */ jsxs7(SelectContent2, { children: [
                    /* @__PURE__ */ jsx7(SelectItem2, { value: "DevOps", children: "DevOps" }),
                    /* @__PURE__ */ jsx7(SelectItem2, { value: "DataOps", children: "DataOps" }),
                    /* @__PURE__ */ jsx7(SelectItem2, { value: "PlatformOps", children: "PlatformOps" }),
                    /* @__PURE__ */ jsx7(SelectItem2, { value: "HelpDesk", children: "Help Desk" }),
                    /* @__PURE__ */ jsx7(SelectItem2, { value: "Security", children: "Security" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs7("div", { children: [
            /* @__PURE__ */ jsx7("label", { className: "text-sm font-medium", children: "Priority" }),
            /* @__PURE__ */ jsxs7(
              Select2,
              {
                value: newTicket.priority,
                onValueChange: (value) => setNewTicket({ ...newTicket, priority: value }),
                children: [
                  /* @__PURE__ */ jsx7(SelectTrigger2, { children: /* @__PURE__ */ jsx7(SelectValue2, {}) }),
                  /* @__PURE__ */ jsxs7(SelectContent2, { children: [
                    /* @__PURE__ */ jsx7(SelectItem2, { value: "low", children: "Low" }),
                    /* @__PURE__ */ jsx7(SelectItem2, { value: "medium", children: "Medium" }),
                    /* @__PURE__ */ jsx7(SelectItem2, { value: "high", children: "High" }),
                    /* @__PURE__ */ jsx7(SelectItem2, { value: "critical", children: "Critical" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx7("label", { className: "text-sm font-medium", children: "Bounty (optional)" }),
          /* @__PURE__ */ jsx7(
            Input2,
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
        /* @__PURE__ */ jsxs7("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx7(Button6, { onClick: createTicket, className: "flex-1", children: "Create Ticket" }),
          /* @__PURE__ */ jsx7(
            Button6,
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
  return /* @__PURE__ */ jsxs7("div", { className: "flex items-center justify-between p-4 rounded-lg border bg-card", children: [
    /* @__PURE__ */ jsxs7("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx7("h4", { className: "font-medium", children: ticket.title }),
        /* @__PURE__ */ jsx7(
          Badge5,
          {
            variant: ticket.priority === "critical" ? "destructive" : "default",
            children: ticket.priority
          }
        )
      ] }),
      /* @__PURE__ */ jsx7("p", { className: "text-sm text-muted-foreground mt-1", children: ticket.description }),
      /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-4 mt-2", children: [
        /* @__PURE__ */ jsx7(Badge5, { variant: "outline", children: ticket.serviceArea }),
        ticket.bounty > 0 && /* @__PURE__ */ jsxs7("div", { className: "flex items-center text-sm", children: [
          /* @__PURE__ */ jsx7(DollarSign3, { className: "h-3 w-3" }),
          ticket.bounty
        ] }),
        ticket.sla && /* @__PURE__ */ jsxs7("div", { className: "flex items-center text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx7(Clock5, { className: "h-3 w-3 mr-1" }),
          "SLA: ",
          ticket.sla,
          "h"
        ] })
      ] })
    ] }),
    !assigned && !requested && onClaim && /* @__PURE__ */ jsx7(Button6, { onClick: () => onClaim(ticket.id), size: "sm", children: "Claim" }),
    assigned && /* @__PURE__ */ jsx7(Badge5, { variant: "default", children: "In Progress" }),
    requested && /* @__PURE__ */ jsx7(Badge5, { variant: "outline", children: ticket.status })
  ] });
}
var ServicesHub_default;
var init_ServicesHub = __esm({
  "src/app/pages/services/ServicesHub.tsx"() {
    "use strict";
    "use client";
    __name(ServicesHubPage, "ServicesHubPage");
    __name(TicketCard, "TicketCard");
    ServicesHub_default = ServicesHubPage;
  }
});

// src/app/pages/index.ts
init_CommandCenter();
init_ContractsPage();
init_PerformancePage();
init_RoadmapsPage();
init_WorkDashboard();
init_ServicesHub();

// src/app/index.ts
var pageRegistry = {
  // Main dashboard/home (default landing)
  home: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_CommandCenter(), CommandCenter_exports)), "home"),
  dashboard: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_CommandCenter(), CommandCenter_exports)), "dashboard"),
  // Command Center section (Operations only)
  "command-center": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_CommandCenter(), CommandCenter_exports)), "command-center"),
  "command-center-insights": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_CommandCenter(), CommandCenter_exports)), "command-center-insights"),
  "command-center-contracts": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_ContractsPage(), ContractsPage_exports)), "command-center-contracts"),
  "command-center-performance": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_PerformancePage(), PerformancePage_exports)), "command-center-performance"),
  // Roadmaps section (Strategic alignment)
  roadmaps: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_RoadmapsPage(), RoadmapsPage_exports)), "roadmaps"),
  // Work Streams section
  "work-streams": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_WorkDashboard(), WorkDashboard_exports)), "work-streams"),
  "work-streams-my-tickets": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_WorkDashboard(), WorkDashboard_exports)), "work-streams-my-tickets"),
  "work-streams-service-hub": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_ServicesHub(), ServicesHub_exports)), "work-streams-service-hub")
};
var componentRegistry = {
  CommandCenterPage: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_CommandCenter(), CommandCenter_exports)), "CommandCenterPage"),
  ContractsPage: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_ContractsPage(), ContractsPage_exports)), "ContractsPage"),
  PerformancePage: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_PerformancePage(), PerformancePage_exports)), "PerformancePage"),
  RoadmapsPage: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_RoadmapsPage(), RoadmapsPage_exports)), "RoadmapsPage"),
  WorkDashboardPage: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_WorkDashboard(), WorkDashboard_exports)), "WorkDashboardPage"),
  ServicesHubPage: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_ServicesHub(), ServicesHub_exports)), "ServicesHubPage")
};
export {
  CommandCenterPage,
  ContractsPage,
  PerformancePage,
  RoadmapsPage,
  ServicesHubPage,
  WorkDashboardPage,
  componentRegistry,
  pageRegistry
};
//# sourceMappingURL=app.mjs.map