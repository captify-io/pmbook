export interface CLIN {
  id: string;
  contractId: string;
  clinNumber: string; // e.g., "0001", "0002AA"
  title: string;
  description?: string;

  // Funding
  type: 'FFP' | 'T&M' | 'CPFF' | 'CPIF' | 'FPIF';
  totalValue: number;
  fundedValue: number; // May be incrementally funded
  obligatedValue: number; // Committed to objectives
  burnedValue: number; // Actually spent

  // Schedule
  periodStart: string;
  periodEnd: string;

  // Status
  status: 'active' | 'fully-obligated' | 'closed';

  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface CLINObjective {
  id: string;
  contractId: string;
  clinIds: string[]; // Can pull from multiple CLINs

  title: string;
  description: string;
  sowReference?: string; // Link to SOW section

  // Funding (auto-calculated from allocations)
  totalBudget: number;
  allocatedBudget: number; // Distributed to outcomes
  remainingBudget: number;

  // Ownership
  owner: string; // PM or tech lead
  functionalArea?: string; // DevOps, DataOps, etc.

  // Status
  status: 'planning' | 'active' | 'complete' | 'on-hold';
  priority: 'critical' | 'high' | 'medium' | 'low';

  createdAt: string;
  updatedAt: string;
}

export interface Outcome {
  id: string;
  objectiveId: string;
  contractId: string;

  title: string;
  description: string;

  // Success Criteria (keep simple for now)
  successCriteria?: string; // Free text for now
  targetDate?: string;

  // Funding
  allocatedBudget: number;
  burnedBudget: number;
  forecastBudget?: number; // AI prediction

  // Team Assignment
  ownerTeam: string; // Functional area team
  teamLead: string;

  // Progress (simple for now)
  status: 'not-started' | 'in-progress' | 'blocked' | 'complete' | 'cancelled';
  percentComplete: number;

  // Deliverables (simple checklist)
  deliverables?: string[]; // ["API deployed", "Tests passing"]

  createdAt: string;
  updatedAt: string;
}

export interface CLINTask {
  id: string;
  outcomeId: string;

  title: string;
  description?: string;

  // Assignment
  assignedTo?: string; // Individual or team
  requestedBy?: string; // For inter-team tickets
  functionalArea: string;

  // Effort & Cost
  estimatedHours?: number;
  actualHours?: number;
  estimatedCost?: number;
  actualCost?: number;

  // Status
  status: 'backlog' | 'ready' | 'in-progress' | 'review' | 'done' | 'blocked';
  priority: 'urgent' | 'high' | 'normal' | 'low';
  blockedReason?: string;

  // Dates
  dueDate?: string;
  completedAt?: string;

  createdAt: string;
  updatedAt: string;
}

// For inter-team work requests
export interface TeamTicket extends CLINTask {
  type: 'support-request' | 'feature-request' | 'infrastructure';
  requestingTeam: string;
  fulfillmentTeam: string;
  sla?: string; // "24h", "3 days", etc.
}

// Budget allocation tracking
export interface CLINAllocation {
  id: string;
  clinId: string;
  objectiveId: string;
  amount: number;
  allocatedAt: string;
  allocatedBy: string;
}

// Monthly reporting
export interface MonthlyReport {
  id: string;
  contractId: string;
  clinId?: string; // If CLIN-specific

  reportMonth: string; // "2025-01"

  // Cost Data
  plannedCost: number;
  actualCost: number;
  variance: number;

  // Schedule
  plannedProgress: number;
  actualProgress: number;

  // Performance (outcomes completed)
  outcomesPlanned: number;
  outcomesCompleted: number;

  // Risk & Issues
  risks: Array<{
    description: string;
    impact: 'high' | 'medium' | 'low';
    mitigation?: string;
  }>;

  // Deliverables
  deliverables: Array<{
    title: string;
    status: 'delivered' | 'in-progress' | 'delayed';
  }>;

  // AI Summary
  aiSummary?: string;

  generatedAt: string;
  generatedBy: string;
}
