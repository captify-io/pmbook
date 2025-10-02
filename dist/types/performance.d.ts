import { Core } from "@captify-io/platform/types";
/**
 * Business performance and health metrics
 */
export interface CompanyHealth extends Core {
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
export interface HealthAlert {
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
export interface BurnAnalysis extends Core {
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
export interface ContractBurn {
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
export interface EmployeeValue extends Core {
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
export interface TeamPerformance extends Core {
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
export interface FinancialForecast extends Core {
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
export interface ForecastPeriod {
    period: string;
    revenue: number;
    costs: number;
    profit: number;
    cashFlow: number;
    headcount: number;
    contracts: number;
    confidence: number;
}
export interface ForecastScenario {
    name: string;
    probability: number;
    revenue: number;
    costs: number;
    profit: number;
    runway: number;
    breakeven?: string;
    assumptions: string[];
}
