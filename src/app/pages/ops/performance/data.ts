import { apiClient } from "@captify-io/platform/api";

export async function getPerformanceMetrics(period: string = "month", session?: any): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "getPerformanceMetrics",
    data: { period },
    app: "pmbook"
  });

  return response?.data;
}

export async function getTeamPerformance(teamId: string, session: any): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "getTeamPerformance",
    data: { teamId },
    app: "pmbook"
  });

  return response?.data;
}

export async function getIndividualPerformance(userId: string, session: any): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "getIndividualPerformance",
    data: { userId },
    app: "pmbook"
  });

  return response?.data;
}

export async function generatePerformanceReport(criteria: any, session: any): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "generatePerformanceReport",
    data: criteria,
    app: "pmbook"
  });

  return response?.data;
}