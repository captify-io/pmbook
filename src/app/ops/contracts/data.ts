import { apiClient } from "@captify-io/platform/lib/api";
import type { Contract, CDRL, Invoice, Milestone } from "../../../types";

export async function getActiveContracts(session: any): Promise<Contract[]> {
  const response = await apiClient.run({
    service: "platform.dynamodb",
    operation: "scan",
    table: "pmbook-Contract",
    data: {
      FilterExpression: "#status <> :status",
      ExpressionAttributeNames: {
        "#status": "status"
      },
      ExpressionAttributeValues: {
        ":status": "closed"
      }
    }
  });

  return (response as any)?.Items || [];
}

export async function getContractDetails(
  contractId: string,
  session: any
): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "getContractDetails",
    data: { contractId },
    app: "pmbook",
  });

  return response?.data;
}

export async function getContractMetrics(
  contractId: string,
  session: any
): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "getContractMetrics",
    data: { contractId },
    app: "pmbook",
  });

  return response?.data;
}

export async function calculateBurnRate(
  contractId: string,
  period: string = "month",
  session: any
): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "calculateBurnRate",
    data: { contractId, period },
    app: "pmbook",
  });

  return response?.data;
}

export async function generateInvoice(
  contractId: string,
  period: string,
  session: any
): Promise<Invoice> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "generateInvoice",
    data: { contractId, period },
    app: "pmbook",
  });

  return response?.data;
}

export async function submitCDRL(
  cdrlId: string,
  submission: any,
  session: any
): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "submitCDRL",
    data: { cdrlId, submission },
    app: "pmbook",
  });

  return response?.data;
}

export async function updateMilestoneProgress(
  milestoneId: string,
  progress: number,
  evidence?: any,
  session?: any
): Promise<any> {
  const response = await apiClient.run({
    service: "pmbook",
    operation: "updateMilestoneProgress",
    data: { milestoneId, progress, evidence },
    app: "pmbook",
  });

  return response?.data;
}
