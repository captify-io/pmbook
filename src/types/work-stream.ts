import { Core } from "@captify-io/platform/types";

/**
 * Work Stream management types for functional areas
 */

export type WorkStreamType =
  | "dataops"
  | "operations"
  | "performance"
  | "devops"
  | "aiops"
  | "apps"
  | "security"
  | "infrastructure"
  | "analytics"
  | "engineering";

export interface WorkStream extends Core {
  type: WorkStreamType;
  name: string;
  description: string;
  lead: string;
  leadEmail: string;
  deputy?: string;

  // Team
  teamMembers: WorkStreamTeamMember[];
  capacity: number; // total hours per week
  utilization: number; // percentage utilized

  // Service Catalog
  services: ServiceOffering[];

  // Work Items
  activeTickets: number;
  backlogSize: number;
  averageResolutionTime: number; // in hours

  // Performance
  slaCompliance: number; // percentage
  customerSatisfaction: number; // 1-5 rating
  velocity: number; // story points per sprint

  // Alignment
  contractIds: string[];
  strategicGoals: string[];
  capabilities: string[];

  // Status
  status: "active" | "forming" | "reorganizing" | "dissolved";
  healthScore: number;
  risks: WorkStreamRisk[];
}

export interface WorkStreamTeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  allocation: number; // percentage of time
  skills: string[];
  certifications?: string[];
  clearanceLevel?: string;
  startDate: string;
  endDate?: string;
}

export interface ServiceOffering {
  id: string;
  workStreamId: string;
  name: string;
  description: string;
  category:
    | "development"
    | "operations"
    | "support"
    | "consulting"
    | "analysis";

  // Service Details
  deliverables: string[];
  sla: ServiceLevelAgreement;
  prerequisites?: string[];
  dependencies?: string[];

  // Pricing/Effort
  estimatedHours?: number;
  complexity: "low" | "medium" | "high" | "expert";
  priority: "critical" | "high" | "medium" | "low";

  // Request Process
  requestType: "ticket" | "project" | "consultation";
  approvalRequired: boolean;
  approvers?: string[];

  // Metrics
  requestsPerMonth: number;
  averageCompletionTime: number;
  satisfaction: number;

  status: "available" | "beta" | "deprecated" | "unavailable";
}

export interface ServiceLevelAgreement {
  responseTime: number; // hours
  resolutionTime: number; // hours
  availability: number; // percentage
  escalationPath: string[];
  maintenanceWindows?: string[];
}

export interface WorkStreamRisk {
  id: string;
  title: string;
  description: string;
  impact: "low" | "medium" | "high" | "critical";
  probability: "unlikely" | "possible" | "likely" | "certain";
  mitigation: string;
  owner: string;
  status: "identified" | "mitigating" | "resolved" | "accepted";
  dueDate?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;

  // Assignment
  workStreamId: string;
  assignedTo?: string;
  requestedBy: string;
  requestedDate: string;

  // Classification
  type: "bug" | "feature" | "task" | "support" | "investigation";
  priority: "critical" | "high" | "medium" | "low";
  serviceId?: string;
  contractId?: string;

  // Work Tracking
  status:
    | "new"
    | "assigned"
    | "in-progress"
    | "blocked"
    | "review"
    | "done"
    | "cancelled";
  estimatedHours?: number;
  actualHours?: number;
  blockers?: string[];
  dependencies?: string[];

  // Dates
  dueDate?: string;
  startedDate?: string;
  completedDate?: string;

  // Communication
  comments: TicketComment[];
  attachments?: string[];
  watchers: string[];

  // Metrics
  reopenCount: number;
  escalated: boolean;
  satisfaction?: number;
}

export interface TicketComment {
  id: string;
  ticketId: string;
  author: string;
  content: string;
  timestamp: string;
  type: "comment" | "status-change" | "assignment" | "escalation";
  internal: boolean;
}

export interface WorkStreamMetrics {
  workStreamId: string;
  period: string;

  // Productivity
  ticketsCompleted: number;
  ticketsCreated: number;
  averageResolutionTime: number;
  firstResponseTime: number;

  // Quality
  bugRate: number;
  reworkRate: number;
  escapedDefects: number;

  // Efficiency
  utilization: number;
  velocity: number;
  throughput: number;
  cycleTime: number;

  // Satisfaction
  customerSatisfaction: number;
  teamSatisfaction: number;
  npsScore: number;

  // Financial
  budgetUtilization: number;
  costPerTicket: number;
  valueDelivered: number;
}

export interface WorkStreamServiceCatalog {
  workStreamId: string;
  services: ServiceOffering[];
  lastUpdated: string;
  approvedBy: string;
  version: string;

  // Catalog Metrics
  totalServices: number;
  activeServices: number;
  monthlyRequests: number;
  averageSatisfaction: number;
}
