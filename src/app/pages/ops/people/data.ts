import { apiClient } from "@captify-io/platform/api";

export async function getDashboardData(session: any): Promise<any> {
  const response = await apiClient.query({
    service: "pmbook",
    operation: "getDashboardData",
    app: "pmbook"
  }, session);

  return response?.data;
}

export async function getSystemHealth(session: any): Promise<any> {
  const response = await apiClient.query({
    service: "pmbook",
    operation: "getSystemHealth",
    app: "pmbook"
  }, session);

  return response?.data;
}

export async function getRecommendations(session: any): Promise<any[]> {
  const response = await apiClient.query({
    service: "pmbook",
    operation: "getRecommendations",
    app: "pmbook"
  }, session);

  return response?.data || [];
}

export async function getAlerts(session: any): Promise<any[]> {
  const response = await apiClient.query({
    service: "pmbook",
    operation: "getAlerts",
    app: "pmbook"
  }, session);

  return response?.data || [];
}