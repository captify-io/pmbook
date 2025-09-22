import { Core } from "@captify-io/platform/types";
/**
 * Work Stream management types for functional areas
 */
export type WorkStreamType = "dataops" | "operations" | "performance" | "devops" | "aiops" | "apps" | "security" | "infrastructure" | "analytics" | "engineering";
export interface WorkStream extends Core {
    type: WorkStreamType;
    name: string;
    description: string;
    lead: string;
    leadEmail: string;
    deputy?: string;
    teamMembers: WorkStreamTeamMember[];
    capacity: number;
    utilization: number;
    services: ServiceOffering[];
    activeTickets: number;
    backlogSize: number;
    averageResolutionTime: number;
    slaCompliance: number;
    customerSatisfaction: number;
    velocity: number;
    contractIds: string[];
    strategicGoals: string[];
    capabilities: string[];
    status: "active" | "forming" | "reorganizing" | "dissolved";
    healthScore: number;
    risks: WorkStreamRisk[];
}
export interface WorkStreamTeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
    allocation: number;
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
    category: "development" | "operations" | "support" | "consulting" | "analysis";
    deliverables: string[];
    sla: ServiceLevelAgreement;
    prerequisites?: string[];
    dependencies?: string[];
    estimatedHours?: number;
    complexity: "low" | "medium" | "high" | "expert";
    priority: "critical" | "high" | "medium" | "low";
    requestType: "ticket" | "project" | "consultation";
    approvalRequired: boolean;
    approvers?: string[];
    requestsPerMonth: number;
    averageCompletionTime: number;
    satisfaction: number;
    status: "available" | "beta" | "deprecated" | "unavailable";
}
export interface ServiceLevelAgreement {
    responseTime: number;
    resolutionTime: number;
    availability: number;
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
    workStreamId: string;
    assignedTo?: string;
    requestedBy: string;
    requestedDate: string;
    type: "bug" | "feature" | "task" | "support" | "investigation";
    priority: "critical" | "high" | "medium" | "low";
    serviceId?: string;
    contractId?: string;
    status: "new" | "assigned" | "in-progress" | "blocked" | "review" | "done" | "cancelled";
    estimatedHours?: number;
    actualHours?: number;
    blockers?: string[];
    dependencies?: string[];
    dueDate?: string;
    startedDate?: string;
    completedDate?: string;
    comments: TicketComment[];
    attachments?: string[];
    watchers: string[];
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
    ticketsCompleted: number;
    ticketsCreated: number;
    averageResolutionTime: number;
    firstResponseTime: number;
    bugRate: number;
    reworkRate: number;
    escapedDefects: number;
    utilization: number;
    velocity: number;
    throughput: number;
    cycleTime: number;
    customerSatisfaction: number;
    teamSatisfaction: number;
    npsScore: number;
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
    totalServices: number;
    activeServices: number;
    monthlyRequests: number;
    averageSatisfaction: number;
}
