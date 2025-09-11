export { AnalyticsQuery, ApprovalRecord, BurnAnalysis, CDRL, CDRLSubmission, Capability, Comment, CompanyHealth, Contract, ContractBurn, ContractMetrics, ContractMod, Dependency, EmployeeValue, Epic, Feature, FinancialForecast, ForecastPeriod, ForecastScenario, GroundTruth, HealthAlert, Initiative, InitiativeMilestone, InitiativeRisk, InitiativeWorkStreamAllocation, Insight, IntelligenceAlert, Invoice, KeyResult, LaborCategory, LaborLineItem, Milestone, ODCLineItem, Objective, ObjectiveKeyResult, ObjectiveMetrics, OptionPeriod, Prediction, ProductivityMetrics, ProposalDocument, Recommendation, Risk, Roadmap, RoadmapView, SLA, ServiceArea, ServiceCatalog, ServiceLevelAgreement, ServiceLevelObjective, ServiceMetrics, ServiceOffering, ServiceRequest, ServiceTicket, Sprint, StrategicGoal, StrategicObjective, Subcontractor, SubcontractorLineItem, Task, Team, TeamMember, TeamPerformance, Ticket, TicketComment, TrendAnalysis, UserStory, WorkItem, WorkLog, WorkQueue, WorkSession, WorkStream, WorkStreamAllocation, WorkStreamMetrics, WorkStreamRisk, WorkStreamServiceCatalog, WorkStreamTeamMember, WorkStreamType } from '../types/index.cjs';
import '@captify-io/platform/types';

/**
 * @captify/pmbook/services/config - Application configuration
 *
 * Contains configuration data that the platform needs to pick up
 */
declare const config: {
    appName: string;
    version: string;
    identityPoolId: string;
    agentId: string;
    agentAliasId: string;
    description: string;
    menu: ({
        id: string;
        label: string;
        icon: string;
        order: number;
        description: string;
        group: string;
        role: string;
        children: {
            id: string;
            label: string;
            href: string;
            icon: string;
            description: string;
        }[];
    } | {
        id: string;
        label: string;
        icon: string;
        order: number;
        description: string;
        children: {
            id: string;
            label: string;
            href: string;
            icon: string;
            description: string;
        }[];
        group?: undefined;
        role?: undefined;
    })[];
    platform: {
        deployment: {
            dev: string;
            staging: string;
            production: string;
        };
    };
};

export { config };
