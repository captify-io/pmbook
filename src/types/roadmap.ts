import { Core } from "@captify-io/platform/types";

/**
 * Roadmap types for strategic alignment from goals to execution
 */

export interface Roadmap extends Core {
  title: string;
  description: string;
  owner: string;
  timeHorizon: "quarterly" | "annual" | "multi-year";
  startDate: string;
  endDate: string;

  // Strategic Elements
  vision: string;
  objectives: Objective[];
  initiatives: Initiative[];
  epics: Epic[];

  // Alignment
  contractIds: string[];
  workStreamIds: string[];

  // Status
  status: "draft" | "approved" | "active" | "completed" | "cancelled";
  approvedBy?: string;
  approvalDate?: string;
  lastReviewDate: string;
  nextReviewDate: string;
}

export interface Objective {
  id: string;
  roadmapId: string;
  title: string;
  description: string;

  // Alignment
  strategicGoalId?: string;
  contractGoals: string[]; // links to contract strategic goals

  // Measurement
  keyResults: ObjectiveKeyResult[];
  successCriteria: string[];

  // Timeline
  quarter: string; // e.g., "Q1 2024"
  targetDate: string;

  // Status
  status: "planned" | "in-progress" | "at-risk" | "achieved" | "missed";
  progress: number; // percentage
  owner: string;
  stakeholders: string[];
}

export interface ObjectiveKeyResult {
  id: string;
  objectiveId: string;
  description: string;
  metric: string;
  baseline: number;
  target: number;
  current: number;
  unit: string;
  measurementFrequency: "weekly" | "monthly" | "quarterly";
  lastMeasured: string;
  status: "on-track" | "at-risk" | "off-track";
}

export interface Initiative {
  id: string;
  roadmapId: string;
  objectiveIds: string[];

  title: string;
  description: string;
  businessCase: string;

  // Scope
  scope: string[];
  deliverables: string[];
  outOfScope?: string[];

  // Resources
  estimatedCost: number;
  requiredCapabilities: string[];
  workStreamAllocations: InitiativeWorkStreamAllocation[];

  // Timeline
  startDate: string;
  endDate: string;
  milestones: InitiativeMilestone[];

  // Dependencies
  dependencies: Dependency[];
  risks: InitiativeRisk[];

  // Status
  status:
    | "proposed"
    | "approved"
    | "active"
    | "paused"
    | "completed"
    | "cancelled";
  healthScore: number;
  progress: number;
  owner: string;
  sponsor: string;
}

export interface InitiativeWorkStreamAllocation {
  workStreamId: string;
  workStreamName: string;
  hoursAllocated: number;
  startDate: string;
  endDate: string;
  teamMembers: string[];
  deliverables: string[];
}

export interface InitiativeMilestone {
  id: string;
  initiativeId: string;
  name: string;
  description: string;
  deliverables: string[];
  dueDate: string;
  completedDate?: string;
  status: "pending" | "in-progress" | "completed" | "missed";
  blockers?: string[];
}

export interface Epic {
  id: string;
  initiativeId: string;
  title: string;
  description: string;

  // Work Breakdown
  features: Feature[];
  estimatedStoryPoints?: number;
  actualStoryPoints?: number;

  // Assignment
  workStreamId: string;
  techLead: string;
  productOwner: string;

  // Timeline
  plannedStart: string;
  plannedEnd: string;
  actualStart?: string;
  actualEnd?: string;

  // Status
  status:
    | "backlog"
    | "planning"
    | "in-progress"
    | "testing"
    | "done"
    | "cancelled";
  progress: number;
  velocity?: number;
}

export interface Feature {
  id: string;
  epicId: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];

  // Work Items
  stories: UserStory[];
  tasks: Task[];

  // Estimation
  estimatedHours: number;
  actualHours?: number;
  complexity: "low" | "medium" | "high" | "very-high";

  // Status
  status: "todo" | "in-progress" | "review" | "done" | "blocked";
  progress: number;
  assignedTo?: string;
  blockers?: string[];
}

export interface UserStory {
  id: string;
  featureId: string;
  title: string;
  asA: string; // user role
  iWant: string; // functionality
  soThat: string; // business value
  acceptanceCriteria: string[];
  storyPoints: number;
  priority: "must-have" | "should-have" | "nice-to-have";
  sprint?: string;
  assignedTo?: string;
  status: "todo" | "in-progress" | "review" | "done" | "blocked";
}

export interface Task {
  id: string;
  featureId: string;
  storyId?: string;
  title: string;
  description: string;
  estimatedHours: number;
  actualHours?: number;
  assignedTo?: string;
  status: "todo" | "in-progress" | "done" | "blocked";
  blockers?: string[];
  completedDate?: string;
}

export interface Dependency {
  id: string;
  type: "internal" | "external" | "technical" | "resource";
  description: string;
  source: string;
  target: string;
  status: "identified" | "resolved" | "blocked";
  resolution?: string;
  owner: string;
  dueDate?: string;
}

export interface InitiativeRisk {
  id: string;
  category: "technical" | "resource" | "schedule" | "budget" | "scope";
  description: string;
  impact: "low" | "medium" | "high" | "critical";
  probability: "unlikely" | "possible" | "likely" | "certain";
  riskScore: number; // impact * probability
  mitigation: string;
  contingency?: string;
  owner: string;
  status: "identified" | "mitigating" | "resolved" | "accepted" | "realized";
  reviewDate: string;
}

export interface RoadmapView {
  type: "timeline" | "kanban" | "gantt" | "objectives" | "initiatives";
  filters: {
    workStreams?: string[];
    contracts?: string[];
    quarters?: string[];
    status?: string[];
    owners?: string[];
  };
  groupBy?: "objective" | "initiative" | "workstream" | "quarter";
  showDependencies: boolean;
  showMilestones: boolean;
  showMetrics: boolean;
}
