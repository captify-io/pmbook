import { apiClient } from "@captify-io/platform/api";

export async function getIntelligenceInsights(session: any): Promise<any[]> {
  const response = await apiClient.query({
    service: "pmbook",
    operation: "getIntelligenceInsights",
    app: "pmbook"
  }, session);

  return response?.data || [];
}

export async function getMarketAnalysis(sector?: string, session?: any): Promise<any> {
  const response = await apiClient.query({
    service: "pmbook",
    operation: "getMarketAnalysis",
    data: { sector },
    app: "pmbook"
  }, session);

  return response?.data;
}

export async function getCompetitorAnalysis(session: any): Promise<any[]> {
  const response = await apiClient.query({
    service: "pmbook",
    operation: "getCompetitorAnalysis",
    app: "pmbook"
  }, session);

  return response?.data || [];
}

export async function generateIntelligenceReport(criteria: any, session: any): Promise<any> {
  const response = await apiClient.execute({
    service: "pmbook",
    operation: "generateIntelligenceReport",
    data: criteria,
    app: "pmbook"
  }, session);

  return response?.data;
}