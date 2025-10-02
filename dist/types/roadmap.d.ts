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
    vision: string;
    objectives: Objective[];
    initiatives: Initiative[];
    epics: Epic[];
    contractIds: string[];
    workStreamIds: string[];
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
    strategicGoalId?: string;
    contractGoals: string[];
    keyResults: ObjectiveKeyResult[];
    successCriteria: string[];
    quarter: string;
    targetDate: string;
    status: "planned" | "in-progress" | "at-risk" | "achieved" | "missed";
    progress: number;
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
    scope: string[];
    deliverables: string[];
    outOfScope?: string[];
    estimatedCost: number;
    requiredCapabilities: string[];
    workStreamAllocations: InitiativeWorkStreamAllocation[];
    startDate: string;
    endDate: string;
    milestones: InitiativeMilestone[];
    dependencies: Dependency[];
    risks: InitiativeRisk[];
    status: "proposed" | "approved" | "active" | "paused" | "completed" | "cancelled";
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
    features: Feature[];
    estimatedStoryPoints?: number;
    actualStoryPoints?: number;
    workStreamId: string;
    techLead: string;
    productOwner: string;
    plannedStart: string;
    plannedEnd: string;
    actualStart?: string;
    actualEnd?: string;
    status: "backlog" | "planning" | "in-progress" | "testing" | "done" | "cancelled";
    progress: number;
    velocity?: number;
}
export interface Feature {
    id: string;
    epicId: string;
    title: string;
    description: string;
    acceptanceCriteria: string[];
    stories: UserStory[];
    tasks: Task[];
    estimatedHours: number;
    actualHours?: number;
    complexity: "low" | "medium" | "high" | "very-high";
    status: "todo" | "in-progress" | "review" | "done" | "blocked";
    progress: number;
    assignedTo?: string;
    blockers?: string[];
}
export interface UserStory {
    id: string;
    featureId: string;
    title: string;
    asA: string;
    iWant: string;
    soThat: string;
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
    riskScore: number;
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
