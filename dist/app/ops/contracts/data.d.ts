import type { Contract, Invoice } from "../../../types";
export declare function getActiveContracts(session: any): Promise<Contract[]>;
export declare function getContractDetails(contractId: string, session: any): Promise<any>;
export declare function getContractMetrics(contractId: string, session: any): Promise<any>;
export declare function calculateBurnRate(contractId: string, period: string | undefined, session: any): Promise<any>;
export declare function generateInvoice(contractId: string, period: string, session: any): Promise<Invoice>;
export declare function submitCDRL(cdrlId: string, submission: any, session: any): Promise<any>;
export declare function updateMilestoneProgress(milestoneId: string, progress: number, evidence?: any, session?: any): Promise<any>;
