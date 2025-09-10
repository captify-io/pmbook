import { apiClient } from "@captify-io/platform/api";
import type { WorkItem, WorkSession } from "../../../types/work";

export async function getUserWorkQueue(userId: string, session: any): Promise<WorkItem[]> {
  const response = await apiClient.query({
    service: "pmbook",
    operation: "getUserWorkQueue",
    data: { userId },
    app: "pmbook"
  }, session);

  return response?.data || [];
}

export async function startWork(userId: string, workItemId: string, session: any): Promise<any> {
  const response = await apiClient.execute({
    service: "pmbook",
    operation: "startWork",
    data: { userId, workItemId },
    app: "pmbook"
  }, session);

  return response?.data;
}

export async function completeWork(workItemId: string, outcome?: any, session?: any): Promise<any> {
  const response = await apiClient.execute({
    service: "pmbook",
    operation: "completeWork",
    data: { workItemId, outcome },
    app: "pmbook"
  }, session);

  return response?.data;
}

export async function getTeamUtilization(teamId: string, period: string = "week", session?: any): Promise<any> {
  const response = await apiClient.query({
    service: "pmbook",
    operation: "getTeamUtilization",
    data: { teamId, period },
    app: "pmbook"
  }, session);

  return response?.data;
}