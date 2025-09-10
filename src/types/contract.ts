import { Core } from "@captify-io/platform/types";

/**
 * Contract management types for government contracting
 */

export interface Contract extends Core {
  contractNumber: string;
  name: string; // Contract name/title
  type: "FFP" | "CPFF" | "CPIF" | "T&M" | "IDIQ";
  customer: string;
  agency?: string;
  contractingOfficer?: string;
  contractingOfficerRep?: string;

  // Award Information
  awardAmount: number;
  awardDate: string;

  // Financial
  totalValue: number;
  fundedValue: number;
  burnedValue: number;
  remainingValue: number;
  monthlyBurnRate: number;
  avgMonthlyBurn: number; // Average monthly burn over contract life

  // Cost Breakdown (Budgeted)
  budgetedCosts: {
    direct: number;
    indirect: number;
    materials: number;
    subcontracts: number;
    profit: number;
    total: number;
  };

  // Expended Breakdown (Actual)
  expendedCosts: {
    direct: number;
    indirect: number;
    materials: number;
    subcontracts: number;
    profit: number;
    total: number;
  };

  // Schedule / Period of Performance
  startDate: string;
  endDate: string;
  optionPeriods?: OptionPeriod[];
  popStart: string; // Period of Performance start
  popEnd: string; // Period of Performance end
  popMonths?: number; // Period of Performance in months (calculated field)

  // Proposal
  proposalSubmitted?: boolean;
  proposalDate?: string;
  proposalUrl?: string; // S3 URL for uploaded proposal
  proposalDocuments?: ProposalDocument[];

  // Deliverables
  cdrls: CDRL[];
  milestones: Milestone[];

  // Team
  programManager: string;
  technicalLead?: string;
  teams: string[];
  subcontractors?: Subcontractor[];

  // Rates
  laborCategories: LaborCategory[];
  indirectRate: number;
  feeRate?: number;

  // Strategic Alignment
  strategicGoals?: StrategicGoal[];
  workStreams?: WorkStreamAllocation[];
  capabilities?: string[];

  // Status
  status: "pre-award" | "active" | "option-pending" | "closing" | "closed";
  healthScore: number;
  risks: string[];
  modifications?: ContractMod[];
}

export interface CDRL extends Core {
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

  // Payment Information
  paymentAmount?: number; // Amount to be paid upon delivery/approval
  paymentTerms?: string; // e.g., "Net 30", "Upon approval"
  paymentStatus?: "pending" | "invoiced" | "paid";
  invoiceNumber?: string;
  paidDate?: string;
}

export interface ProposalDocument {
  id: string;
  filename: string;
  type: "technical" | "cost" | "past-performance" | "other";
  uploadDate: string;
  uploadedBy: string;
  s3Url: string;
  size: number;
  version?: string;
}

export interface CDRLSubmission {
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

export interface LaborCategory {
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

export interface Subcontractor extends Core {
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

export interface Invoice extends Core {
  contractId: string;
  invoiceNumber: string;
  period: string;
  periodStart: string;
  periodEnd: string;

  // Line items
  laborCosts: LaborLineItem[];
  odcCosts: ODCLineItem[];
  subcontractorCosts: SubcontractorLineItem[];

  // Totals
  totalLabor: number;
  totalODC: number;
  totalSubs: number;
  totalDirect: number;
  indirectCosts: number;
  fee?: number;
  totalInvoice: number;

  // Status
  status: "draft" | "review" | "submitted" | "approved" | "paid" | "disputed";
  submittedDate?: string;
  approvedDate?: string;
  paidDate?: string;
  paymentAmount?: number;
  notes?: string;
}

export interface LaborLineItem {
  employeeId: string;
  laborCategory: string;
  hours: number;
  rate: number;
  total: number;
  capabilities?: string[];
}

export interface ODCLineItem {
  description: string;
  category: "travel" | "materials" | "equipment" | "other";
  amount: number;
  justification?: string;
  approvedBy?: string;
}

export interface SubcontractorLineItem {
  subcontractorId: string;
  description: string;
  amount: number;
  invoiceRef?: string;
}

export interface Milestone extends Core {
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

export interface ContractMod {
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

export interface OptionPeriod {
  number: number;
  startDate: string;
  endDate: string;
  value: number;
  exercised: boolean;
  exerciseDeadline?: string;
}

export interface ContractMetrics {
  contractValue: number;
  burnRate: number;
  runway: number;
  cdrlCompliance: number;
  milestoneProgress: number;
  profitMargin: number;
  riskScore: number;
  customerSatisfaction: number;
}

export interface StrategicGoal {
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

export interface WorkStreamAllocation {
  workStreamId: string;
  workStreamName: string;
  allocation: number; // percentage of contract value
  lead: string;
  teamMembers: string[];
  deliverables: string[];
  status: "active" | "pending" | "complete";
}
