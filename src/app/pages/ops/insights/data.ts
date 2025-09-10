import { apiClient } from "@captify-io/platform/api";

export async function getIntelligenceInsights(session: any): Promise<any[]> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "getIntelligenceInsights",
    app: "pmbook"
  });

  return response?.data || [];
}

export async function getMarketAnalysis(sector?: string, session?: any): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "getMarketAnalysis",
    data: { sector },
    app: "pmbook"
  });

  return response?.data;
}

export async function getCompetitorAnalysis(session: any): Promise<any[]> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "getCompetitorAnalysis",
    app: "pmbook"
  });

  return response?.data || [];
}

export async function generateIntelligenceReport(criteria: any, session: any): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "generateIntelligenceReport",
    data: criteria,
    app: "pmbook"
  });

  return response?.data;
}