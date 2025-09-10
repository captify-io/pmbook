import { apiClient } from "@captify-io/platform/api";

export async function getServiceCatalog(session: any): Promise<any[]> {
  const response = await apiClient.query({
    service: "pmbook",
    operation: "getServiceCatalog",
    app: "pmbook"
  }, session);

  return response?.data || [];
}

export async function getServiceRequests(status?: string, session?: any): Promise<any[]> {
  const response = await apiClient.query({
    service: "pmbook",
    operation: "getServiceRequests",
    data: { status },
    app: "pmbook"
  }, session);

  return response?.data || [];
}

export async function submitServiceRequest(request: any, session: any): Promise<any> {
  const response = await apiClient.execute({
    service: "pmbook",
    operation: "submitServiceRequest",
    data: request,
    app: "pmbook"
  }, session);

  return response?.data;
}

export async function approveServiceRequest(requestId: string, session: any): Promise<any> {
  const response = await apiClient.execute({
    service: "pmbook",
    operation: "approveServiceRequest",
    data: { requestId },
    app: "pmbook"
  }, session);

  return response?.data;
}