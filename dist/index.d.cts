import React, { ComponentType } from 'react';
export { ComponentType } from 'react';
export { AnalyticsQuery, ApprovalRecord, BurnAnalysis, CDRL, CDRLSubmission, Capability, Comment, CompanyHealth, Contract, ContractBurn, ContractMetrics, ContractMod, Dependency, EmployeeValue, Epic, Feature, FinancialForecast, ForecastPeriod, ForecastScenario, GroundTruth, HealthAlert, Initiative, InitiativeMilestone, InitiativeRisk, InitiativeWorkStreamAllocation, Insight, IntelligenceAlert, Invoice, KeyResult, LaborCategory, LaborLineItem, Milestone, ODCLineItem, Objective, ObjectiveKeyResult, ObjectiveMetrics, OptionPeriod, Prediction, ProductivityMetrics, ProposalDocument, Recommendation, Risk, Roadmap, RoadmapView, SLA, ServiceArea, ServiceCatalog, ServiceLevelAgreement, ServiceLevelObjective, ServiceMetrics, ServiceOffering, ServiceRequest, ServiceTicket, Sprint, StrategicGoal, StrategicObjective, Subcontractor, SubcontractorLineItem, Task, Team, TeamMember, TeamPerformance, Ticket, TicketComment, TrendAnalysis, UserStory, WorkItem, WorkLog, WorkQueue, WorkSession, WorkStream, WorkStreamAllocation, WorkStreamMetrics, WorkStreamRisk, WorkStreamServiceCatalog, WorkStreamTeamMember, WorkStreamType } from './types/index.cjs';
import '@captify-io/platform/types';

declare function IntelligencePage(): React.JSX.Element;

declare function ContractsPage(): React.JSX.Element;

declare function CommandCenterPage(): React.JSX.Element;

declare function PerformancePage(): React.JSX.Element;

declare function ValueStreamsPage(): React.JSX.Element;

declare function MyTicketsPage(): React.JSX.Element;

declare function ServicesHubPage(): React.JSX.Element;

declare function WorkDashboardPage(): React.JSX.Element;

/**
 * @captify/pmbook - PMBook App Entry Point
 *
 * This module dynamically generates page registry from config.json menu structure
 * for automatic discovery by the Captify platform.
 */

type NextPageComponent = ComponentType<any>;
type PageImport = () => Promise<{
    default: NextPageComponent;
}>;
type PageRegistry = Record<string, PageImport>;
type ComponentRegistry = Record<string, PageImport>;

declare const pageRegistry: PageRegistry;
declare const componentRegistry: ComponentRegistry;
declare const menuConfiguration: ({
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

export { CommandCenterPage, type ComponentRegistry, ContractsPage, IntelligencePage, MyTicketsPage, type NextPageComponent, type PageImport, type PageRegistry, PerformancePage, ServicesHubPage, ValueStreamsPage, WorkDashboardPage, componentRegistry, menuConfiguration, pageRegistry };
