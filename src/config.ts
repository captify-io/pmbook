export const config = {
  // App attributes
  slug: "pmbook",
  appName: "pmbook",
  version: "1.0.37",
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
  requiredGroups: [], // All employees can access base functionality

  // Permission groups for restricted sections
  permissionGroups: {
    operations: ["captify-operations"],
    financials: ["captify-financials"],
  },

  // Menu structure - comprehensive company operations
  menu: [
    {
      id: "insights",
      label: "Insights",
      icon: "bar-chart-3",
      order: 1,
      description:
        "Default start page: org-wide overview of projects, outcomes, announcements",
      isDefault: true,
    },
    {
      id: "tickets",
      label: "Tickets",
      icon: "ticket",
      order: 3,
      description:
        "Central help/support area - filter by team, contract, or status",
    },
    {
      id: "my-work",
      label: "My Work",
      icon: "briefcase",
      order: 5,
      description: "Personal work management",
      children: [
        {
          id: "my-tasks",
          label: "Tasks",
          icon: "list-checks",
          order: 1,
          description:
            "Daily work, issues, tickets assigned - task updates = time reporting",
        },
        {
          id: "my-leave",
          label: "Leave",
          icon: "calendar-days",
          order: 2,
          description: "PTO/leave requests",
        },
      ],
    },
    {
      id: "operations",
      label: "Operations",
      icon: "settings",
      order: 6,
      description: "Operational management and oversight",
      requiredGroups: ["captify-operations"],
      children: [
        {
          id: "ops-contracts",
          label: "Contracts",
          icon: "file-text",
          order: 1,
          description: "Repository of awarded contracts and milestones",
        },
        {
          id: "ops-streams",
          label: "Streams",
          icon: "git-branch",
          order: 2,
          description:
            "Execution map: Contract → CLIN → Outcomes → Tasks → Teams → Individuals",
          usesReactFlow: true,
        },
        {
          id: "ops-people",
          label: "People",
          icon: "users",
          order: 3,
          description: "Team and people management",
          children: [
            {
              id: "ops-people-teams",
              label: "Teams",
              icon: "users-round",
              order: 1,
              description: "Build/manage teams - assign teams to Outcomes",
            },
            {
              id: "ops-people-performance",
              label: "Performance",
              icon: "trending-up",
              order: 2,
              description:
                "Delivery analytics, outcome tracking, workload balance",
            },
          ],
        },
      ],
    },
    {
      id: "financials",
      label: "Financials",
      icon: "dollar-sign",
      order: 7,
      description: "Financial management and insights",
      requiredGroups: ["captify-financials"],
      children: [
        {
          id: "fin-insights",
          label: "Insights",
          icon: "chart-line",
          order: 1,
          description:
            "Burn rates, funding pool usage (overhead, G&A, M&H, profit)",
        },
        {
          id: "fin-clins",
          label: "CLINs",
          icon: "list-ordered",
          order: 2,
          description:
            "CLIN allocations: Contract → CLIN → Outcome → Task → Team → Ticket → Individual",
        },
      ],
    },
  ],

  // Functional areas / teams - ticket queues and team assignments
  functionalAreas: [
    { id: "it", name: "IT", description: "IT support and infrastructure" },
    {
      id: "hr",
      name: "HR",
      description: "Human resources and people operations",
    },
    {
      id: "dataops",
      name: "DataOps",
      description: "Data engineering and analytics",
    },
    {
      id: "devops",
      name: "DevOps",
      description: "CI/CD, infrastructure automation",
    },
    {
      id: "platform",
      name: "Platform",
      description: "Core platform services and APIs",
    },
    {
      id: "helpdesk",
      name: "Help Desk",
      description: "General support and assistance",
    },
    {
      id: "cloudops",
      name: "CloudOps",
      description: "Cloud infrastructure and operations",
    },
    {
      id: "security",
      name: "Security",
      description: "Security and compliance",
    },
  ],

  // CLIN types supported
  clinTypes: [
    { value: "FFP", label: "Firm Fixed Price" },
    { value: "T&M", label: "Time & Materials" },
    { value: "CPFF", label: "Cost Plus Fixed Fee" },
    { value: "CPIF", label: "Cost Plus Incentive Fee" },
    { value: "FPIF", label: "Fixed Price Incentive Fee" },
  ],

  // Outcome success criteria
  outcomeMetrics: {
    primary: "delivered", // Must be delivered
    secondary: ["on-time", "on-budget", "quality"], // Bonus if achieved
  },

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
