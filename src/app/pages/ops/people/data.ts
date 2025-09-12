import { apiClient } from "@captify-io/platform/lib/api";

export async function getDashboardData(session: any): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "getDashboardData",
    app: "pmbook"
  });

  return response?.data;
}

export async function getSystemHealth(session: any): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "getSystemHealth",
    app: "pmbook"
  });

  return response?.data;
}

export async function getRecommendations(session: any): Promise<any[]> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "getRecommendations",
    app: "pmbook"
  });

  return response?.data || [];
}

export async function getAlerts(session: any): Promise<any[]> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "getAlerts",
    app: "pmbook"
  });

  return response?.data || [];
}