import type { WorkItem } from "../../types/work";
export declare function getUserWorkQueue(userId: string, session: any): Promise<WorkItem[]>;
export declare function startWork(userId: string, workItemId: string, session: any): Promise<any>;
export declare function completeWork(workItemId: string, outcome?: any, session?: any): Promise<any>;
export declare function getTeamUtilization(teamId: string, period?: string, session?: any): Promise<any>;
