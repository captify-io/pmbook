import { AwsCredentials, ApiUserSession, Core } from '@captify-io/core/types';

interface WorkServiceRequest {
    service: string;
    operation: string;
    data?: any;
    schema?: string;
    app?: string;
}
declare function execute$5(request: WorkServiceRequest, credentials?: AwsCredentials, session?: ApiUserSession): Promise<any>;
declare const workService: {
    execute: typeof execute$5;
};

interface StrategicServiceRequest {
    service: string;
    operation: string;
    data?: any;
    schema?: string;
    app?: string;
}
/**
 * Execute strategic management operations
 */
declare function execute$4(request: StrategicServiceRequest, credentials?: AwsCredentials, session?: ApiUserSession): Promise<any>;
declare const strategicService: {
    execute: typeof execute$4;
};

interface ServiceMarketplaceRequest {
    service: string;
    operation: string;
    data?: any;
    schema?: string;
    app?: string;
}
declare function execute$3(request: ServiceMarketplaceRequest, credentials?: AwsCredentials, session?: ApiUserSession): Promise<any>;
declare const serviceMarketplaceService: {
    execute: typeof execute$3;
};

interface PerformanceServiceRequest {
    service: string;
    operation: string;
    data?: any;
    schema?: string;
    app?: string;
}
declare function execute$2(request: PerformanceServiceRequest, credentials?: AwsCredentials, session?: ApiUserSession): Promise<any>;
declare const performanceService: {
    execute: typeof execute$2;
};

interface IntelligenceServiceRequest {
    service: string;
    operation: string;
    data?: any;
    schema?: string;
    app?: string;
}
declare function execute$1(request: IntelligenceServiceRequest, credentials?: AwsCredentials, session?: ApiUserSession): Promise<any>;
declare const intelligenceService: {
    execute: typeof execute$1;
};

interface ContractServiceRequest {
    service: string;
    operation: string;
    data?: any;
    schema?: string;
    app?: string;
}
/**
 * Execute contract management operations
 */
declare function execute(request: ContractServiceRequest, credentials?: AwsCredentials, session?: ApiUserSession): Promise<any>;
declare const contractService: {
    execute: typeof execute;
};

/**
 * Strategic alignment types for connecting vision to daily work
 */
interface StrategicObjective extends Core {
    level: "company" | "contract" | "program";
    statement: string;
    vision: string;
    keyResults: KeyResult[];
    owner: string;
    stakeholders: string[];
    deadline: string;
    status: "planning" | "active" | "at-risk" | "completed" | "cancelled";
    valueAtRisk: number;
    contractIds?: string[];
    parentObjective?: string;
    childObjectives?: string[];
    metrics: ObjectiveMetrics;
}
interface KeyResult extends Core {
    objectiveId: string;
    metric: string;
    target: number;
    current: number;
    unit: string;
    deadline: string;
    status: "on-track" | "at-risk" | "behind" | "completed";
    owner: string;
    updateFrequency: "daily" | "weekly" | "monthly";
    lastUpdated: string;
    evidence?: string[];
}
interface Capability extends Core {
    objectives: string[];
    strategicWeight: number;
    customerValue: string;
    acceptanceCriteria: string[];
    dependencies: string[];
    contractCDRLs: string[];
    estimatedHours: number;
    actualHours: number;
    status: "planning" | "in-progress" | "testing" | "delivered" | "accepted";
    teamId: string;
    techStack?: string[];
    risks?: Risk[];
    valueScore?: number;
}
interface Risk extends Core {
    type: "technical" | "schedule" | "resource" | "dependency" | "external";
    probability: "low" | "medium" | "high";
    impact: "low" | "medium" | "high" | "critical";
    mitigation: string;
    owner: string;
    status: "identified" | "mitigating" | "accepted" | "resolved";
    escalated: boolean;
    affectedObjectives: string[];
    affectedCapabilities: string[];
}
interface GroundTruth extends Core {
    type: "blocker" | "risk" | "opportunity" | "insight" | "feedback";
    source: string;
    sourceRole?: string;
    impact: "tactical" | "operational" | "strategic";
    affectedObjectives: string[];
    affectedCapabilities: string[];
    suggestedAction: string;
    escalationNeeded: boolean;
    escalationLevel?: "team" | "program" | "executive";
    decisionDeadline?: string;
    resolution?: string;
    resolvedBy?: string;
    resolvedAt?: string;
}
interface ObjectiveMetrics {
    alignment: number;
    completion: number;
    velocity: number;
    burnRate: number;
    teamFocus: number;
    valueDelivered: number;
    risksIdentified: number;
    blockers: number;
}

/**
 * Work management types with automatic time tracking
 */
interface WorkItem extends Core {
    capability: string;
    type: "feature" | "bug" | "debt" | "research" | "review" | "meeting" | "support";
    status: "backlog" | "ready" | "in-progress" | "review" | "testing" | "done" | "blocked";
    priority: "critical" | "high" | "medium" | "low";
    complexity: "trivial" | "simple" | "moderate" | "complex" | "epic";
    assignee?: string;
    team?: string;
    estimatedHours: number;
    actualHours: number;
    sessions: WorkSession[];
    valueScore: number;
    strategicWeight: number;
    customerImpact: number;
    technicalDebt?: number;
    blockedBy?: string[];
    blocking?: string[];
    relatedItems?: string[];
    acceptanceCriteria?: string[];
    deliverables?: string[];
    pullRequests?: string[];
    commits?: string[];
    reviewComments?: Comment[];
    customerFeedback?: string;
    completionQuality?: number;
}
interface WorkSession extends Core {
    workItemId: string;
    userId: string;
    startTime: string;
    endTime?: string;
    duration?: number;
    automatic: boolean;
    activity?: string;
    interrupted?: boolean;
    productivity?: number;
    commits?: string[];
    filesModified?: string[];
}
interface WorkQueue {
    userId: string;
    recommended: WorkItem[];
    criticalPath: WorkItem[];
    quickWins: WorkItem[];
    techDebt: WorkItem[];
    exploration: WorkItem[];
    blocked: WorkItem[];
    inReview: WorkItem[];
    lastUpdated: string;
}
interface ProductivityMetrics extends Core {
    userId: string;
    period: "daily" | "weekly" | "monthly" | "quarterly";
    periodStart: string;
    periodEnd: string;
    totalHours: number;
    productiveHours: number;
    meetingHours: number;
    focusTime: number;
    contextSwitches: number;
    totalValue: number;
    valuePerHour: number;
    capabilitiesDelivered: number;
    featuresCompleted: number;
    bugsFixed: number;
    codeQuality: number;
    reviewScore: number;
    customerSatisfaction: number;
    reworkRate: number;
    strategicAlignment: number;
    criticalPathWork: number;
    plannedVsActual: number;
}
interface Team extends Core {
    members: TeamMember[];
    lead: string;
    capabilities: string[];
    contracts: string[];
    velocity: number;
    capacity: number;
    utilization: number;
    skills: string[];
    tools: string[];
    currentSprint?: Sprint;
}
interface TeamMember {
    userId: string;
    role: "lead" | "senior" | "mid" | "junior" | "contractor";
    allocation: number;
    skills: string[];
    clearance?: "none" | "public-trust" | "secret" | "top-secret";
    rate: number;
    availability: "available" | "busy" | "ooo" | "unavailable";
    currentWork?: string[];
}
interface Sprint extends Core {
    team: string;
    number: number;
    startDate: string;
    endDate: string;
    goals: string[];
    capabilities: string[];
    workItems: string[];
    velocity: number;
    plannedHours: number;
    actualHours: number;
    completionRate: number;
    retrospective?: string;
}
interface Comment {
    id: string;
    author: string;
    content: string;
    timestamp: string;
    type: "review" | "feedback" | "question" | "suggestion";
    resolved?: boolean;
}

/**
 * Contract management types for government contracting
 */
interface Contract extends Core {
    contractNumber: string;
    name: string;
    type: "FFP" | "CPFF" | "CPIF" | "T&M" | "IDIQ";
    customer: string;
    agency?: string;
    contractingOfficer?: string;
    contractingOfficerRep?: string;
    awardAmount: number;
    awardDate: string;
    totalValue: number;
    fundedValue: number;
    burnedValue: number;
    remainingValue: number;
    monthlyBurnRate: number;
    avgMonthlyBurn: number;
    budgetedCosts: {
        direct: number;
        indirect: number;
        materials: number;
        subcontracts: number;
        profit: number;
        total: number;
    };
    expendedCosts: {
        direct: number;
        indirect: number;
        materials: number;
        subcontracts: number;
        profit: number;
        total: number;
    };
    startDate: string;
    endDate: string;
    optionPeriods?: OptionPeriod[];
    popStart: string;
    popEnd: string;
    proposalSubmitted?: boolean;
    proposalDate?: string;
    proposalUrl?: string;
    proposalDocuments?: ProposalDocument[];
    cdrls: CDRL[];
    milestones: Milestone[];
    programManager: string;
    technicalLead?: string;
    teams: string[];
    subcontractors?: Subcontractor[];
    laborCategories: LaborCategory[];
    indirectRate: number;
    feeRate?: number;
    strategicGoals?: StrategicGoal[];
    workStreams?: WorkStreamAllocation[];
    capabilities?: string[];
    status: "pre-award" | "active" | "option-pending" | "closing" | "closed";
    healthScore: number;
    risks: string[];
    modifications?: ContractMod[];
}
interface CDRL extends Core {
    contractId: string;
    number: string;
    title: string;
    did?: string;
    type: "document" | "software" | "hardware" | "data" | "report";
    frequency?: "one-time" | "monthly" | "quarterly" | "annual" | "as-required";
    dueDate?: string;
    submittalDates?: string[];
    format?: string;
    distribution?: string[];
    capabilities: string[];
    status: "pending" | "in-progress" | "submitted" | "approved" | "rejected";
    currentVersion?: string;
    submissions?: CDRLSubmission[];
    paymentAmount?: number;
    paymentTerms?: string;
    paymentStatus?: "pending" | "invoiced" | "paid";
    invoiceNumber?: string;
    paidDate?: string;
}
interface ProposalDocument {
    id: string;
    filename: string;
    type: "technical" | "cost" | "past-performance" | "other";
    uploadDate: string;
    uploadedBy: string;
    s3Url: string;
    size: number;
    version?: string;
}
interface CDRLSubmission {
    id: string;
    cdrlId: string;
    version: string;
    submittedDate: string;
    submittedBy: string;
    status: "draft" | "submitted" | "under-review" | "approved" | "rejected";
    reviewComments?: string;
    approvedBy?: string;
    approvalDate?: string;
    fileUrl?: string;
}
interface LaborCategory {
    id: string;
    title: string;
    level: "junior" | "mid" | "senior" | "expert" | "sme";
    rate: number;
    escalation?: number;
    minimumEducation?: string;
    minimumExperience?: number;
    requiredSkills?: string[];
    clearanceRequired?: string;
}
interface Subcontractor extends Core {
    contractId: string;
    company: string;
    type: "fsp" | "material" | "odc";
    value: number;
    startDate: string;
    endDate: string;
    pointOfContact: string;
    email: string;
    phone?: string;
    deliverables: string[];
    invoiceFrequency: "monthly" | "quarterly" | "milestone";
    status: "active" | "pending" | "complete" | "terminated";
}
interface Invoice extends Core {
    contractId: string;
    invoiceNumber: string;
    period: string;
    periodStart: string;
    periodEnd: string;
    laborCosts: LaborLineItem[];
    odcCosts: ODCLineItem[];
    subcontractorCosts: SubcontractorLineItem[];
    totalLabor: number;
    totalODC: number;
    totalSubs: number;
    totalDirect: number;
    indirectCosts: number;
    fee?: number;
    totalInvoice: number;
    status: "draft" | "review" | "submitted" | "approved" | "paid" | "disputed";
    submittedDate?: string;
    approvedDate?: string;
    paidDate?: string;
    paymentAmount?: number;
    notes?: string;
}
interface LaborLineItem {
    employeeId: string;
    laborCategory: string;
    hours: number;
    rate: number;
    total: number;
    capabilities?: string[];
}
interface ODCLineItem {
    description: string;
    category: "travel" | "materials" | "equipment" | "other";
    amount: number;
    justification?: string;
    approvedBy?: string;
}
interface SubcontractorLineItem {
    subcontractorId: string;
    description: string;
    amount: number;
    invoiceRef?: string;
}
interface Milestone extends Core {
    contractId: string;
    number: number;
    title: string;
    value: number;
    dueDate: string;
    completionCriteria: string[];
    capabilities: string[];
    dependencies?: string[];
    status: "pending" | "in-progress" | "complete" | "accepted" | "missed";
    completedDate?: string;
    acceptedDate?: string;
    evidence?: string[];
}
interface ContractMod {
    id: string;
    modNumber: string;
    type: "scope" | "schedule" | "cost" | "terms";
    description: string;
    valueChange?: number;
    scheduleChange?: number;
    effectiveDate: string;
    approvedBy: string;
    documentation?: string[];
}
interface OptionPeriod {
    number: number;
    startDate: string;
    endDate: string;
    value: number;
    exercised: boolean;
    exerciseDeadline?: string;
}
interface ContractMetrics {
    contractValue: number;
    burnRate: number;
    runway: number;
    cdrlCompliance: number;
    milestoneProgress: number;
    profitMargin: number;
    riskScore: number;
    customerSatisfaction: number;
}
interface StrategicGoal {
    id: string;
    title: string;
    description: string;
    targetDate: string;
    priority: "critical" | "high" | "medium" | "low";
    measurableOutcomes: string[];
    status: "planned" | "in-progress" | "at-risk" | "completed";
    progress: number;
    dependencies?: string[];
    risks?: string[];
}
interface WorkStreamAllocation {
    workStreamId: string;
    workStreamName: string;
    allocation: number;
    lead: string;
    teamMembers: string[];
    deliverables: string[];
    status: "active" | "pending" | "complete";
}

/**
 * AI Intelligence and Analytics types
 */
interface IntelligenceAlert extends Core {
    type: "anomaly" | "trend" | "risk" | "opportunity" | "performance";
    severity: "info" | "warning" | "critical";
    title: string;
    description: string;
    metric?: string;
    threshold?: number;
    value?: number;
    confidence: number;
    status: "active" | "acknowledged" | "resolved";
    acknowledged: boolean;
    acknowledgedBy?: string;
    acknowledgedAt?: string;
    resolvedAt?: string;
}
interface Prediction extends Core {
    type: "revenue" | "utilization" | "risk" | "satisfaction" | "performance";
    metric: string;
    currentValue: number;
    predictedValue: number;
    confidence: number;
    horizon: number;
    factors: string[];
    methodology?: string;
    accuracy?: number;
    generatedAt: string;
    validUntil?: string;
}
interface Insight extends Core {
    category: "performance" | "risk" | "opportunity" | "pattern" | "anomaly";
    type: "positive" | "negative" | "warning" | "informational";
    title: string;
    description: string;
    confidence: number;
    impact: "low" | "medium" | "high";
    evidence?: any[];
    recommendations?: string[];
    generatedAt: string;
    actedUpon?: boolean;
}
interface Recommendation extends Core {
    category: "resource" | "contract" | "strategic" | "financial" | "operational" | "predictive";
    priority: "low" | "medium" | "high" | "critical";
    title: string;
    description: string;
    action: string;
    impact: string;
    effort: "low" | "medium" | "high";
    confidence: number;
    timeline?: string;
    resources?: string[];
    dependencies?: string[];
    implemented?: boolean;
    implementedAt?: string;
}
interface AnalyticsQuery {
    id: string;
    query: string;
    intent: "status" | "prediction" | "recommendation" | "analysis" | "general";
    entities: any;
    response: string;
    confidence: number;
    timestamp: string;
    userId?: string;
}
interface TrendAnalysis {
    metric: string;
    direction: "up" | "down" | "stable";
    change: number;
    significance: number;
    period: string;
    dataPoints: number;
}

/**
 * Internal service marketplace and ticketing system
 */
interface ServiceArea extends Core {
    area: "DataOps" | "DevOps" | "PlatformOps" | "HelpDesk" | "Programmatic" | "Operations" | "Security" | "QA";
    lead: string;
    team: string[];
    slas: SLA[];
    capabilities: string[];
    tools: string[];
    metrics: ServiceMetrics;
}
interface ServiceTicket extends Core {
    requestor: string;
    requestorTeam?: string;
    serviceArea: string;
    assignee?: string;
    type: "request" | "incident" | "change" | "problem" | "access";
    priority: "critical" | "high" | "medium" | "low";
    title: string;
    description: string;
    acceptanceCriteria?: string[];
    bounty?: number;
    bonusPool?: number;
    expedited: boolean;
    sla?: string;
    dueDate?: string;
    responseDeadline?: string;
    resolutionDeadline?: string;
    status: "open" | "assigned" | "in-progress" | "pending-customer" | "resolved" | "closed" | "cancelled";
    workLog: WorkLog[];
    totalHours: number;
    resolution?: string;
    resolvedBy?: string;
    resolvedAt?: string;
    customerSatisfaction?: number;
    feedback?: string;
    relatedTickets?: string[];
    capabilities?: string[];
    contracts?: string[];
    blockedWork?: string[];
}
interface SLA extends Core {
    serviceArea: string;
    type: string;
    priority: string;
    responseTime: number;
    resolutionTime: number;
    unit: "minutes" | "hours" | "days";
    escalationPath: string[];
    penalties?: string;
    contractRequired?: string[];
}
interface WorkLog {
    id: string;
    ticketId: string;
    userId: string;
    timestamp: string;
    action: "created" | "assigned" | "updated" | "commented" | "resolved" | "reopened" | "escalated";
    description: string;
    hoursSpent?: number;
    visibility: "internal" | "customer";
}
interface ServiceMetrics extends Core {
    serviceArea: string;
    period: string;
    ticketsCreated: number;
    ticketsResolved: number;
    ticketsClosed: number;
    ticketsEscalated: number;
    avgResponseTime: number;
    avgResolutionTime: number;
    firstContactResolution: number;
    slaCompliance: number;
    customerSatisfaction: number;
    reworkRate: number;
    knowledgeArticlesCreated: number;
    utilizationRate: number;
    costPerTicket: number;
    automationRate: number;
    teamCapacity: number;
    teamVelocity: number;
    backlogSize: number;
}
interface ServiceCatalog extends Core {
    serviceArea: string;
    category: string;
    service: string;
    description: string;
    selfService: boolean;
    automationAvailable: boolean;
    formTemplate?: string;
    estimatedTime: number;
    complexity: "simple" | "moderate" | "complex";
    requiredInfo: string[];
    deliverables: string[];
    baseCost?: number;
    rushCost?: number;
    approvalRequired?: boolean;
    approvers?: string[];
    prerequisites?: string[];
}
interface ServiceRequest {
    ticketId: string;
    catalogItem: string;
    requestedBy: string;
    requestedFor?: string;
    parameters: Record<string, any>;
    justification?: string;
    businessCase?: string;
    neededBy?: string;
    preferredSchedule?: string;
    approvalStatus?: "pending" | "approved" | "rejected";
    approvers?: ApprovalRecord[];
    fulfillmentMethod?: "manual" | "automated" | "hybrid";
    automationJobId?: string;
}
interface ApprovalRecord {
    approver: string;
    decision: "approved" | "rejected" | "delegated";
    timestamp: string;
    comments?: string;
    delegatedTo?: string;
}
interface ServiceLevelObjective extends Core {
    serviceArea: string;
    objective: string;
    target: number;
    current: number;
    unit: string;
    period: "daily" | "weekly" | "monthly" | "quarterly";
    status: "meeting" | "at-risk" | "breached";
    impactedContracts?: string[];
    improvementPlan?: string;
}

/**
 * Business performance and health metrics
 */
interface CompanyHealth extends Core {
    period: string;
    periodStart: string;
    periodEnd: string;
    runway: number;
    runwayMonths: number;
    cashBalance: number;
    monthlyBurn: number;
    monthlyRevenue: number;
    profitMargin: number;
    contractedRevenue: number;
    recognizedRevenue: number;
    deferredRevenue: number;
    pipeline: number;
    winRate: number;
    laborCosts: number;
    subcontractorCosts: number;
    odcCosts: number;
    indirectCosts: number;
    totalCosts: number;
    costPerEmployee: number;
    revenuePerEmployee: number;
    utilizationRate: number;
    billableHours: number;
    nonBillableHours: number;
    headcount: number;
    headcountGrowth: number;
    revenueGrowth: number;
    contractGrowth: number;
    customerConcentration: number;
    contractDiversification: number;
    cashFlowRisk: "low" | "medium" | "high";
    score: number;
    trend: "improving" | "stable" | "declining";
    alerts: HealthAlert[];
}
interface HealthAlert {
    id: string;
    type: "financial" | "operational" | "compliance" | "strategic";
    severity: "info" | "warning" | "critical";
    title: string;
    description: string;
    metric?: string;
    threshold?: number;
    current?: number;
    recommendations: string[];
    relatedContracts?: string[];
    owner?: string;
}
interface BurnAnalysis extends Core {
    period: string;
    laborHours: number;
    laborCost: number;
    overtimeCost: number;
    contractorCost: number;
    directLabor: number;
    indirectLabor: number;
    overhead: number;
    ga: number;
    bid: number;
    ir: number;
    capabilityHours: Record<string, number>;
    capabilityCost: Record<string, number>;
    capabilityROI: Record<string, number>;
    contractBurn: Record<string, ContractBurn>;
    projectedMonthlyBurn: number;
    burnTrend: number;
    burnVariance: number;
    optimizations: string[];
    risks: string[];
}
interface ContractBurn {
    contractId: string;
    periodBurn: number;
    totalBurn: number;
    remaining: number;
    burnRate: number;
    projectedCompletion: string;
    profitability: number;
    onBudget: boolean;
    variance: number;
}
interface EmployeeValue extends Core {
    userId: string;
    period: string;
    valueDelivered: number;
    costIncurred: number;
    roi: number;
    ranking?: number;
    percentile?: number;
    capabilitiesDelivered: number;
    featuresCompleted: number;
    bugsFixed: number;
    ticketsResolved: number;
    billableHours: number;
    nonBillableHours: number;
    utilizationRate: number;
    overtimeHours: number;
    qualityScore: number;
    reworkRate: number;
    customerSatisfaction: number;
    peerReview: number;
    strategicWork: number;
    criticalPathWork: number;
    innovationWork: number;
    mentorshipHours: number;
    knowledgeSharing: number;
    processImprovement: number;
    trend: "improving" | "stable" | "declining";
}
interface TeamPerformance extends Core {
    teamId: string;
    period: string;
    velocity: number;
    velocityTrend: number;
    completionRate: number;
    onTimeDelivery: number;
    teamBurn: number;
    teamRevenue: number;
    teamROI: number;
    costPerPoint: number;
    defectRate: number;
    customerSatisfaction: number;
    technicalDebtRatio: number;
    codeQuality: number;
    utilization: number;
    capacity: number;
    attrition: number;
    satisfaction: number;
    collaboration: number;
    capabilitiesDelivered: string[];
    capabilityVelocity: Record<string, number>;
    topPerformers: string[];
    improvementAreas: string[];
}
interface FinancialForecast extends Core {
    forecastDate: string;
    horizon: "monthly" | "quarterly" | "annual";
    periods: ForecastPeriod[];
    assumptions: {
        winRate: number;
        attritionRate: number;
        growthRate: number;
        utilizationTarget: number;
    };
    scenarios: {
        best: ForecastScenario;
        likely: ForecastScenario;
        worst: ForecastScenario;
    };
    risks: string[];
    opportunities: string[];
}
interface ForecastPeriod {
    period: string;
    revenue: number;
    costs: number;
    profit: number;
    cashFlow: number;
    headcount: number;
    contracts: number;
    confidence: number;
}
interface ForecastScenario {
    name: string;
    probability: number;
    revenue: number;
    costs: number;
    profit: number;
    runway: number;
    breakeven?: string;
    assumptions: string[];
}

/**
 * Work Stream management types for functional areas
 */
type WorkStreamType = "dataops" | "operations" | "performance" | "devops" | "aiops" | "apps" | "security" | "infrastructure" | "analytics" | "engineering";
interface WorkStream extends Core {
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
interface WorkStreamTeamMember {
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
interface ServiceOffering {
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
interface ServiceLevelAgreement {
    responseTime: number;
    resolutionTime: number;
    availability: number;
    escalationPath: string[];
    maintenanceWindows?: string[];
}
interface WorkStreamRisk {
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
interface Ticket {
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
interface TicketComment {
    id: string;
    ticketId: string;
    author: string;
    content: string;
    timestamp: string;
    type: "comment" | "status-change" | "assignment" | "escalation";
    internal: boolean;
}
interface WorkStreamMetrics {
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
interface WorkStreamServiceCatalog {
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

/**
 * Roadmap types for strategic alignment from goals to execution
 */
interface Roadmap extends Core {
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
interface Objective {
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
interface ObjectiveKeyResult {
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
interface Initiative {
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
interface InitiativeWorkStreamAllocation {
    workStreamId: string;
    workStreamName: string;
    hoursAllocated: number;
    startDate: string;
    endDate: string;
    teamMembers: string[];
    deliverables: string[];
}
interface InitiativeMilestone {
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
interface Epic {
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
interface Feature {
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
interface UserStory {
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
interface Task {
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
interface Dependency {
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
interface InitiativeRisk {
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
interface RoadmapView {
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

/**
 * @captify/pmbook/services - Server-side exports
 *
 * Contains all server-side functionality for the program management and business operations package.
 */
declare const services: {
    use: (serviceName: string) => {
        execute: typeof execute;
    };
    contract: {
        execute: typeof execute;
    };
    intelligence: {
        execute: typeof execute$1;
    };
    performance: {
        execute: typeof execute$2;
    };
    serviceMarketplace: {
        execute: typeof execute$3;
    };
    strategic: {
        execute: typeof execute$4;
    };
    work: {
        execute: typeof execute$5;
    };
};

export { type AnalyticsQuery, type ApprovalRecord, type BurnAnalysis, type CDRL, type CDRLSubmission, type Capability, type Comment, type CompanyHealth, type Contract, type ContractBurn, type ContractMetrics, type ContractMod, type Dependency, type EmployeeValue, type Epic, type Feature, type FinancialForecast, type ForecastPeriod, type ForecastScenario, type GroundTruth, type HealthAlert, type Initiative, type InitiativeMilestone, type InitiativeRisk, type InitiativeWorkStreamAllocation, type Insight, type IntelligenceAlert, type Invoice, type KeyResult, type LaborCategory, type LaborLineItem, type Milestone, type ODCLineItem, type Objective, type ObjectiveKeyResult, type ObjectiveMetrics, type OptionPeriod, type Prediction, type ProductivityMetrics, type ProposalDocument, type Recommendation, type Risk, type Roadmap, type RoadmapView, type SLA, type ServiceArea, type ServiceCatalog, type ServiceLevelAgreement, type ServiceLevelObjective, type ServiceMetrics, type ServiceOffering, type ServiceRequest, type ServiceTicket, type Sprint, type StrategicGoal, type StrategicObjective, type Subcontractor, type SubcontractorLineItem, type Task, type Team, type TeamMember, type TeamPerformance, type Ticket, type TicketComment, type TrendAnalysis, type UserStory, type WorkItem, type WorkLog, type WorkQueue, type WorkSession, type WorkStream, type WorkStreamAllocation, type WorkStreamMetrics, type WorkStreamRisk, type WorkStreamServiceCatalog, type WorkStreamTeamMember, type WorkStreamType, execute as contractExecute, contractService, execute$1 as intelligenceExecute, intelligenceService, execute$2 as performanceExecute, performanceService, execute$3 as serviceExecute, serviceMarketplaceService, services, execute$4 as strategicExecute, strategicService, execute$5 as workExecute, workService };
