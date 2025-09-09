var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/services/contract.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
async function execute(request, credentials, session) {
  if (!credentials) {
    return { success: false, error: "AWS credentials required" };
  }
  const client = new DynamoDBClient({
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken
    }
  });
  const docClient = DynamoDBDocumentClient.from(client);
  const schema = request.schema || "captify";
  try {
    switch (request.operation) {
      case "getActiveContracts": {
        const response = await docClient.send(
          new QueryCommand({
            TableName: `${schema}-pmbook-Contract`,
            IndexName: "status-index",
            KeyConditionExpression: "#status = :active",
            ExpressionAttributeNames: {
              "#status": "status"
            },
            ExpressionAttributeValues: {
              ":active": "active"
            }
          })
        );
        return { success: true, data: response.Items || [] };
      }
      case "getContractDetails": {
        const { contractId } = request.data || {};
        if (!contractId) {
          return { success: false, error: "Contract ID required" };
        }
        const contractResponse = await docClient.send(
          new QueryCommand({
            TableName: `${schema}-pmbook-Contract`,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
              ":id": contractId
            }
          })
        );
        if (!contractResponse.Items || contractResponse.Items.length === 0) {
          return { success: false, error: "Contract not found" };
        }
        const contract = contractResponse.Items[0];
        const cdrlsResponse = await docClient.send(
          new QueryCommand({
            TableName: `${schema}-pmbook-CDRL`,
            IndexName: "contract-index",
            KeyConditionExpression: "contractId = :contractId",
            ExpressionAttributeValues: {
              ":contractId": contractId
            }
          })
        );
        const milestonesResponse = await docClient.send(
          new QueryCommand({
            TableName: `${schema}-pmbook-Milestone`,
            IndexName: "contract-index",
            KeyConditionExpression: "contractId = :contractId",
            ExpressionAttributeValues: {
              ":contractId": contractId
            }
          })
        );
        return {
          success: true,
          data: {
            ...contract,
            cdrls: cdrlsResponse.Items || [],
            milestones: milestonesResponse.Items || []
          }
        };
      }
      case "calculateBurnRate": {
        const { contractId, period = "month" } = request.data || {};
        if (!contractId) {
          return { success: false, error: "Contract ID required" };
        }
        const contractResult = await execute(
          {
            service: request.service,
            operation: "getContractDetails",
            data: { contractId },
            schema: request.schema
          },
          credentials,
          session
        );
        if (!contractResult.success) {
          return contractResult;
        }
        const contract = contractResult.data;
        const invoicesResponse = await docClient.send(
          new QueryCommand({
            TableName: `${schema}-pmbook-Invoice`,
            IndexName: "contract-index",
            KeyConditionExpression: "contractId = :contractId",
            ExpressionAttributeValues: {
              ":contractId": contractId
            }
          })
        );
        const invoices = invoicesResponse.Items || [];
        const now = /* @__PURE__ */ new Date();
        const startDate = new Date(contract.startDate);
        const monthsElapsed = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth()) + 1;
        const totalBilled = invoices.reduce(
          (sum, inv) => sum + (inv.amount || 0),
          0
        );
        const monthlyBurn = totalBilled / monthsElapsed;
        const remainingValue = (contract.totalValue || 0) - totalBilled;
        const runwayMonths = remainingValue / monthlyBurn;
        return {
          success: true,
          data: {
            contractId,
            totalValue: contract.totalValue || 0,
            totalBilled,
            remainingValue,
            monthlyBurn,
            runwayMonths,
            burnPercentage: totalBilled / (contract.totalValue || 1) * 100,
            isOnTrack: Math.abs(
              totalBilled - (contract.totalValue || 0) / (contract.durationMonths || 12) * monthsElapsed
            ) / (contract.totalValue || 1) < 0.15
          }
        };
      }
      case "generateInvoice": {
        const { contractId, period } = request.data || {};
        if (!contractId || !period) {
          return { success: false, error: "Contract ID and period required" };
        }
        const contractResult = await execute(
          {
            service: request.service,
            operation: "getContractDetails",
            data: { contractId },
            schema: request.schema
          },
          credentials,
          session
        );
        if (!contractResult.success) {
          return contractResult;
        }
        const contract = contractResult.data;
        const invoice = {
          id: generateInvoiceNumber(contract.number || contract.id, period),
          contractId,
          period,
          laborAmount: 5e4,
          // Would calculate from work items
          odcAmount: 5e3,
          // Would calculate from expenses
          amount: 55e3,
          status: "draft",
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          lineItems: [
            { description: "Labor costs", amount: 5e4 },
            { description: "ODC costs", amount: 5e3 }
          ]
        };
        await docClient.send(
          new PutCommand({
            TableName: `${schema}-pmbook-Invoice`,
            Item: invoice
          })
        );
        return { success: true, data: invoice };
      }
      case "submitCDRL": {
        const { cdrlId, submission } = request.data || {};
        if (!cdrlId || !submission) {
          return {
            success: false,
            error: "CDRL ID and submission data required"
          };
        }
        const cdrlResponse = await docClient.send(
          new QueryCommand({
            TableName: `${schema}-pmbook-CDRL`,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
              ":id": cdrlId
            }
          })
        );
        if (!cdrlResponse.Items || cdrlResponse.Items.length === 0) {
          return { success: false, error: "CDRL not found" };
        }
        await docClient.send(
          new UpdateCommand({
            TableName: `${schema}-pmbook-CDRL`,
            Key: { id: cdrlId },
            UpdateExpression: "SET submissions = list_append(if_not_exists(submissions, :empty), :submission), lastSubmission = :date, #status = :status",
            ExpressionAttributeNames: {
              "#status": "status"
            },
            ExpressionAttributeValues: {
              ":empty": [],
              ":submission": [
                {
                  ...submission,
                  submittedAt: (/* @__PURE__ */ new Date()).toISOString()
                }
              ],
              ":date": (/* @__PURE__ */ new Date()).toISOString(),
              ":status": "submitted"
            }
          })
        );
        return { success: true, data: { cdrlId, submitted: true } };
      }
      case "getContractMetrics": {
        const { contractId } = request.data || {};
        if (!contractId) {
          return { success: false, error: "Contract ID required" };
        }
        const burnResult = await execute(
          {
            service: request.service,
            operation: "calculateBurnRate",
            data: { contractId },
            schema: request.schema
          },
          credentials,
          session
        );
        if (!burnResult.success) {
          return burnResult;
        }
        const burnRate = burnResult.data;
        const metrics = {
          contractValue: burnRate.totalValue,
          burnRate: burnRate.monthlyBurn,
          runway: burnRate.runwayMonths,
          cdrlCompliance: 85,
          // Would calculate from actual CDRLs
          milestoneProgress: 60,
          // Would calculate from actual milestones
          profitMargin: 15,
          // Would calculate from costs
          riskScore: burnRate.isOnTrack ? 20 : 60,
          customerSatisfaction: 4.2
          // Would get from feedback
        };
        return { success: true, data: metrics };
      }
      case "updateMilestoneProgress": {
        const { milestoneId, progress, evidence } = request.data || {};
        if (!milestoneId || progress === void 0) {
          return {
            success: false,
            error: "Milestone ID and progress required"
          };
        }
        await docClient.send(
          new UpdateCommand({
            TableName: `${schema}-pmbook-Milestone`,
            Key: { id: milestoneId },
            UpdateExpression: "SET progress = :progress, evidence = list_append(if_not_exists(evidence, :empty), :evidence), updatedAt = :now",
            ExpressionAttributeValues: {
              ":progress": progress,
              ":empty": [],
              ":evidence": [
                evidence || { updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
              ],
              ":now": (/* @__PURE__ */ new Date()).toISOString()
            }
          })
        );
        if (progress >= 100) {
          await docClient.send(
            new UpdateCommand({
              TableName: `${schema}-pmbook-Milestone`,
              Key: { id: milestoneId },
              UpdateExpression: "SET #status = :completed, completedAt = :now",
              ExpressionAttributeNames: {
                "#status": "status"
              },
              ExpressionAttributeValues: {
                ":completed": "completed",
                ":now": (/* @__PURE__ */ new Date()).toISOString()
              }
            })
          );
        }
        return {
          success: true,
          data: { milestoneId, progress, completed: progress >= 100 }
        };
      }
      default:
        return {
          success: false,
          error: `Unknown operation: ${request.operation}`
        };
    }
  } catch (error) {
    console.error(`Error in contractService.${request.operation}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}
__name(execute, "execute");
function generateInvoiceNumber(contractNumber, period) {
  const periodDate = new Date(period);
  const year = periodDate.getFullYear();
  const month = String(periodDate.getMonth() + 1).padStart(2, "0");
  return `${contractNumber}-${year}${month}-INV`;
}
__name(generateInvoiceNumber, "generateInvoiceNumber");
var contractService = {
  execute
};

// src/services/intelligence.ts
import { DynamoDBClient as DynamoDBClient2 } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient as DynamoDBDocumentClient2,
  PutCommand as PutCommand2
} from "@aws-sdk/lib-dynamodb";
async function execute2(request, credentials, session) {
  if (!credentials) {
    return { success: false, error: "AWS credentials required" };
  }
  const client = new DynamoDBClient2({
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken
    }
  });
  const docClient = DynamoDBDocumentClient2.from(client);
  const schema = request.schema || "captify";
  try {
    switch (request.operation) {
      case "getInsights": {
        const insights = [
          {
            id: `${Date.now()}-1`,
            category: "performance",
            type: "positive",
            title: "Revenue Growth Detected",
            description: "Revenue growing at 5% month-over-month",
            confidence: 0.9,
            impact: "high",
            generatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: `${Date.now()}-2`,
            category: "risk",
            type: "warning",
            title: "Contract Risk Identified",
            description: "Contract X burn rate exceeding plan",
            confidence: 0.7,
            impact: "high",
            generatedAt: (/* @__PURE__ */ new Date()).toISOString()
          }
        ];
        return { success: true, data: insights };
      }
      case "generatePredictions": {
        const { horizon = 90 } = request.data || {};
        const predictions = [
          {
            id: `${Date.now()}-pred-1`,
            type: "revenue",
            metric: "Monthly Revenue",
            currentValue: 5e5,
            predictedValue: 525e3,
            confidence: 0.85,
            horizon,
            factors: [
              "Contract pipeline",
              "Seasonal patterns",
              "Team capacity"
            ],
            generatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: `${Date.now()}-pred-2`,
            type: "utilization",
            metric: "Team Utilization",
            currentValue: 76,
            predictedValue: 78,
            confidence: 0.8,
            horizon,
            factors: ["Work queue", "Team size", "Project timelines"],
            generatedAt: (/* @__PURE__ */ new Date()).toISOString()
          }
        ];
        return { success: true, data: predictions };
      }
      case "getRecommendations": {
        const recommendations = [
          {
            id: `${Date.now()}-rec-1`,
            category: "resource",
            priority: "medium",
            title: "Underutilized Resources",
            description: "Team utilization is below optimal levels",
            action: "Consider pursuing additional contracts or reallocating resources",
            impact: "Could improve revenue by 15-20%",
            effort: "medium",
            confidence: 0.8
          },
          {
            id: `${Date.now()}-rec-2`,
            category: "strategic",
            priority: "high",
            title: "Strategic Misalignment",
            description: "Daily work not aligned with strategic objectives",
            action: "Reprioritize work queue to focus on strategic initiatives",
            impact: "Improve value delivery by 25%",
            effort: "low",
            confidence: 0.85
          }
        ];
        return { success: true, data: recommendations };
      }
      case "createAlert": {
        const { alert } = request.data || {};
        if (!alert) {
          return { success: false, error: "Alert data required" };
        }
        const newAlert = {
          ...alert,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          status: "active",
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          acknowledged: false
        };
        await docClient.send(
          new PutCommand2({
            TableName: `${schema}-pmbook-IntelligenceAlert`,
            Item: newAlert
          })
        );
        return { success: true, data: newAlert };
      }
      case "processQuery": {
        const { query } = request.data || {};
        if (!query) {
          return { success: false, error: "Query required" };
        }
        const response = {
          query,
          intent: "status",
          entities: {},
          response: "Overall business health is good. Revenue on track, utilization at 76%.",
          confidence: 0.85,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        };
        return { success: true, data: response };
      }
      default:
        return {
          success: false,
          error: `Unknown operation: ${request.operation}`
        };
    }
  } catch (error) {
    console.error(`Error in intelligenceService.${request.operation}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}
__name(execute2, "execute");
var intelligenceService = {
  execute: execute2
};

// src/services/performance.ts
import { DynamoDBClient as DynamoDBClient3 } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient as DynamoDBDocumentClient3,
  PutCommand as PutCommand3
} from "@aws-sdk/lib-dynamodb";
async function execute3(request, credentials, session) {
  if (!credentials) {
    return { success: false, error: "AWS credentials required" };
  }
  const client = new DynamoDBClient3({
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken
    }
  });
  const docClient = DynamoDBDocumentClient3.from(client);
  const schema = request.schema || "captify";
  try {
    switch (request.operation) {
      case "getBusinessHealth": {
        const businessHealth = {
          id: "current",
          overallScore: 82,
          financial: {
            revenue: 5e5,
            costs: 4e5,
            profit: 1e5,
            profitMargin: 20,
            cashFlow: 25e4,
            burnRate: 13333,
            runway: 18.75,
            backlog: 2e6,
            win_rate: 35,
            arDays: 45
          },
          employee: {
            headcount: 25,
            utilization: 76,
            satisfaction: 4.2,
            retention: 92,
            productivity: 85,
            valuePerEmployee: 2e4,
            turnover: 8,
            engagementScore: 78
          },
          operational: {
            deliveryOnTime: 92,
            qualityScore: 88,
            customerSatisfaction: 4.3,
            slaCompliance: 95
          },
          strategic: { alignmentScore: 75 },
          risks: [],
          recommendations: [],
          lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
        };
        return { success: true, data: businessHealth };
      }
      case "calculateBurnAnalysis": {
        const { period = "month" } = request.data || {};
        return {
          success: true,
          data: {
            period,
            revenue: 5e5,
            directCosts: 28e4,
            indirectCosts: 12e4,
            totalCosts: 4e5,
            profit: 1e5,
            efficiency: 80
          }
        };
      }
      case "recordSatisfaction": {
        const { employeeId, metrics } = request.data || {};
        if (!employeeId || !metrics) {
          return { success: false, error: "Employee ID and metrics required" };
        }
        const satisfaction = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          employeeId,
          ...metrics,
          recordedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        await docClient.send(
          new PutCommand3({
            TableName: `${schema}-pmbook-EmployeeSatisfaction`,
            Item: satisfaction
          })
        );
        return { success: true, data: satisfaction };
      }
      default:
        return {
          success: false,
          error: `Unknown operation: ${request.operation}`
        };
    }
  } catch (error) {
    console.error(`Error in performanceService.${request.operation}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}
__name(execute3, "execute");
var performanceService = {
  execute: execute3
};

// src/services/service.ts
import { DynamoDBClient as DynamoDBClient4 } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient as DynamoDBDocumentClient4,
  QueryCommand as QueryCommand4,
  PutCommand as PutCommand4,
  UpdateCommand as UpdateCommand2
} from "@aws-sdk/lib-dynamodb";
async function execute4(request, credentials, session) {
  if (!credentials) {
    return { success: false, error: "AWS credentials required" };
  }
  const client = new DynamoDBClient4({
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken
    }
  });
  const docClient = DynamoDBDocumentClient4.from(client);
  const schema = request.schema || "captify";
  try {
    switch (request.operation) {
      case "getServiceAreas": {
        const response = await docClient.send(
          new QueryCommand4({
            TableName: `${schema}-pmbook-ServiceArea`
          })
        );
        return { success: true, data: response.Items || [] };
      }
      case "createTicket": {
        const { ticket } = request.data || {};
        if (!ticket) {
          return { success: false, error: "Ticket data required" };
        }
        const newTicket = {
          ...ticket,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          status: "open",
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          history: [
            {
              action: "created",
              by: ticket.requester,
              at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ]
        };
        await docClient.send(
          new PutCommand4({
            TableName: `${schema}-pmbook-ServiceTicket`,
            Item: newTicket
          })
        );
        return { success: true, data: newTicket };
      }
      case "claimTicket": {
        const { ticketId, userId } = request.data || {};
        if (!ticketId || !userId) {
          return { success: false, error: "Ticket ID and user ID required" };
        }
        await docClient.send(
          new UpdateCommand2({
            TableName: `${schema}-pmbook-ServiceTicket`,
            Key: { id: ticketId },
            UpdateExpression: "SET #status = :assigned, assignee = :userId, assignedAt = :now, history = list_append(history, :history)",
            ExpressionAttributeNames: {
              "#status": "status"
            },
            ExpressionAttributeValues: {
              ":assigned": "assigned",
              ":userId": userId,
              ":now": (/* @__PURE__ */ new Date()).toISOString(),
              ":history": [
                {
                  action: "claimed",
                  by: userId,
                  at: (/* @__PURE__ */ new Date()).toISOString()
                }
              ]
            }
          })
        );
        return { success: true, data: { ticketId, claimed: true } };
      }
      case "getServiceMetrics": {
        const { serviceAreaId } = request.data || {};
        const params = {
          TableName: `${schema}-pmbook-ServiceTicket`
        };
        if (serviceAreaId) {
          params.IndexName = "serviceArea-index";
          params.KeyConditionExpression = "serviceArea = :serviceAreaId";
          params.ExpressionAttributeValues = {
            ":serviceAreaId": serviceAreaId
          };
        }
        const response = await docClient.send(new QueryCommand4(params));
        const tickets = response.Items || [];
        const completed = tickets.filter((t) => t.status === "resolved");
        const avgServiceTime = completed.length > 0 ? completed.reduce((sum, t) => sum + (t.serviceTime || 0), 0) / completed.length : 0;
        const metrics = {
          totalTickets: tickets.length,
          openTickets: tickets.filter((t) => t.status === "open").length,
          assignedTickets: tickets.filter((t) => t.status === "assigned").length,
          inProgressTickets: tickets.filter((t) => t.status === "in-progress").length,
          resolvedTickets: completed.length,
          avgResolutionTime: avgServiceTime,
          slaCompliance: 92,
          satisfaction: 4.2,
          topPerformers: [],
          bountyPool: tickets.filter((t) => t.bounty && t.status === "open").reduce((sum, t) => sum + (t.bounty || 0), 0)
        };
        return { success: true, data: metrics };
      }
      default:
        return {
          success: false,
          error: `Unknown operation: ${request.operation}`
        };
    }
  } catch (error) {
    console.error(
      `Error in serviceMarketplaceService.${request.operation}:`,
      error
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}
__name(execute4, "execute");
var serviceMarketplaceService = {
  execute: execute4
};

// src/services/strategic.ts
import { DynamoDBClient as DynamoDBClient5 } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient as DynamoDBDocumentClient5,
  QueryCommand as QueryCommand5,
  PutCommand as PutCommand5,
  UpdateCommand as UpdateCommand3,
  BatchGetCommand as BatchGetCommand2
} from "@aws-sdk/lib-dynamodb";
async function execute5(request, credentials, session) {
  if (!credentials) {
    return { success: false, error: "AWS credentials required" };
  }
  const client = new DynamoDBClient5({
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken
    }
  });
  const docClient = DynamoDBDocumentClient5.from(client);
  const schema = request.schema || "captify";
  try {
    switch (request.operation) {
      case "getObjectivesHierarchy": {
        const { level } = request.data || {};
        const params = {
          TableName: `${schema}-pmbook-StrategicObjective`
        };
        if (level) {
          params.FilterExpression = "#level = :level";
          params.ExpressionAttributeNames = { "#level": "level" };
          params.ExpressionAttributeValues = { ":level": level };
        }
        const response = await docClient.send(new QueryCommand5(params));
        const objectives = response.Items || [];
        const hierarchy = buildObjectiveHierarchy(
          objectives
        );
        return { success: true, data: hierarchy };
      }
      case "getAlignedCapabilities": {
        const { objectiveIds } = request.data || {};
        if (!objectiveIds || objectiveIds.length === 0) {
          return { success: true, data: [] };
        }
        const response = await docClient.send(
          new BatchGetCommand2({
            RequestItems: {
              [`${schema}-pmbook-Capability`]: {
                Keys: objectiveIds.map((id) => ({ id }))
              }
            }
          })
        );
        return {
          success: true,
          data: response.Responses?.[`${schema}-pmbook-Capability`] || []
        };
      }
      case "calculateAlignment": {
        const { userId, teamId } = request.data || {};
        const workItemsResult = await getWorkItems(
          docClient,
          schema,
          userId,
          teamId
        );
        const workItems = workItemsResult.Items || [];
        const capabilityIds = [
          ...new Set(workItems.map((w) => w.capability))
        ];
        const capabilitiesResult = await getCapabilities(
          docClient,
          schema,
          capabilityIds
        );
        const capabilities = capabilitiesResult || [];
        const totalHours = workItems.reduce(
          (sum, w) => sum + (w.actualHours || 0),
          0
        );
        const strategicHours = workItems.filter((w) => {
          const cap = capabilities.find((c) => c.id === w.capability);
          return cap && (cap.strategicWeight || 0) > 7;
        }).reduce((sum, w) => sum + (w.actualHours || 0), 0);
        return {
          success: true,
          data: {
            alignmentScore: totalHours > 0 ? strategicHours / totalHours * 100 : 0,
            totalHours,
            strategicHours,
            workBreakdown: categorizeWork(workItems, capabilities)
          }
        };
      }
      case "submitGroundTruth": {
        const { feedback } = request.data || {};
        if (!feedback) {
          return { success: false, error: "Feedback data required" };
        }
        const groundTruth = {
          ...feedback,
          id: generateId(),
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          status: "active"
        };
        await docClient.send(
          new PutCommand5({
            TableName: `${schema}-pmbook-GroundTruth`,
            Item: groundTruth
          })
        );
        if (feedback.escalationNeeded) {
          console.log("Escalating ground truth:", groundTruth.id);
        }
        return { success: true, data: groundTruth };
      }
      case "getRisksAndBlockers": {
        const { level } = request.data || {};
        const risksParams = {
          TableName: `${schema}-pmbook-Risk`
        };
        if (level) {
          risksParams.FilterExpression = "#impact = :level";
          risksParams.ExpressionAttributeNames = { "#impact": "impact" };
          risksParams.ExpressionAttributeValues = { ":level": level };
        }
        const risks = await docClient.send(new QueryCommand5(risksParams));
        const groundTruth = await docClient.send(
          new QueryCommand5({
            TableName: `${schema}-pmbook-GroundTruth`,
            FilterExpression: "#type = :type AND attribute_not_exists(resolvedAt)",
            ExpressionAttributeNames: { "#type": "type" },
            ExpressionAttributeValues: { ":type": "blocker" }
          })
        );
        const risksData = risks.Items || [];
        const blockersData = groundTruth.Items || [];
        return {
          success: true,
          data: {
            risks: risksData,
            blockers: blockersData,
            summary: summarizeRisks(risksData, blockersData)
          }
        };
      }
      case "updateObjectiveProgress": {
        const { objectiveId, keyResultUpdates } = request.data || {};
        if (!objectiveId || !keyResultUpdates) {
          return {
            success: false,
            error: "Objective ID and key result updates required"
          };
        }
        for (const update of keyResultUpdates) {
          await docClient.send(
            new UpdateCommand3({
              TableName: `${schema}-pmbook-KeyResult`,
              Key: { id: update.id },
              UpdateExpression: "SET #current = :current, #status = :status, lastUpdated = :now",
              ExpressionAttributeNames: {
                "#current": "current",
                "#status": "status"
              },
              ExpressionAttributeValues: {
                ":current": update.current,
                ":status": calculateKeyResultStatus(update),
                ":now": (/* @__PURE__ */ new Date()).toISOString()
              }
            })
          );
        }
        const metrics = calculateObjectiveMetrics();
        await docClient.send(
          new UpdateCommand3({
            TableName: `${schema}-pmbook-StrategicObjective`,
            Key: { id: objectiveId },
            UpdateExpression: "SET metrics = :metrics, updatedAt = :now",
            ExpressionAttributeValues: {
              ":metrics": metrics,
              ":now": (/* @__PURE__ */ new Date()).toISOString()
            }
          })
        );
        return { success: true, data: { metrics } };
      }
      case "getStrategicRecommendations": {
        const alignmentResult = await execute5(
          {
            service: request.service,
            operation: "calculateAlignment",
            data: {},
            schema: request.schema
          },
          credentials,
          session
        );
        const risksResult = await execute5(
          {
            service: request.service,
            operation: "getRisksAndBlockers",
            data: {},
            schema: request.schema
          },
          credentials,
          session
        );
        const objectivesResult = await execute5(
          {
            service: request.service,
            operation: "getObjectivesHierarchy",
            data: {},
            schema: request.schema
          },
          credentials,
          session
        );
        if (!alignmentResult.success || !risksResult.success || !objectivesResult.success) {
          return {
            success: false,
            error: "Failed to gather data for recommendations"
          };
        }
        const alignment = alignmentResult.data;
        const risks = risksResult.data;
        const objectives = objectivesResult.data;
        const recommendations = [];
        if (alignment.alignmentScore < 70) {
          recommendations.push({
            type: "alignment",
            priority: "high",
            message: `Only ${alignment.alignmentScore.toFixed(
              0
            )}% of work is strategically aligned`,
            action: "Review work queue prioritization"
          });
        }
        const criticalRisks = risks.risks.filter(
          (r) => r.impact === "critical"
        );
        if (criticalRisks.length > 0) {
          recommendations.push({
            type: "risk",
            priority: "critical",
            message: `${criticalRisks.length} critical risks identified`,
            action: "Immediate risk mitigation required"
          });
        }
        const atRiskObjectives = objectives.filter(
          (o) => o.status === "at-risk"
        );
        if (atRiskObjectives.length > 0) {
          recommendations.push({
            type: "objective",
            priority: "high",
            message: `${atRiskObjectives.length} strategic objectives at risk`,
            action: "Review resource allocation and timeline"
          });
        }
        return { success: true, data: recommendations };
      }
      default:
        return {
          success: false,
          error: `Unknown operation: ${request.operation}`
        };
    }
  } catch (error) {
    console.error(`Error in strategicService.${request.operation}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}
__name(execute5, "execute");
function buildObjectiveHierarchy(objectives) {
  const map = /* @__PURE__ */ new Map();
  objectives.forEach((obj) => map.set(obj.id, { ...obj, children: [] }));
  const roots = [];
  for (const obj of objectives) {
    if (obj.parentObjective) {
      const parent = map.get(obj.parentObjective);
      if (parent) parent.children.push(map.get(obj.id));
    } else {
      roots.push(map.get(obj.id));
    }
  }
  return roots;
}
__name(buildObjectiveHierarchy, "buildObjectiveHierarchy");
async function getWorkItems(docClient, schema, userId, teamId) {
  const params = {
    TableName: `${schema}-pmbook-WorkItem`
  };
  if (userId) {
    params.FilterExpression = "assignee = :userId";
    params.ExpressionAttributeValues = { ":userId": userId };
  } else if (teamId) {
    params.FilterExpression = "#team = :teamId";
    params.ExpressionAttributeNames = { "#team": "team" };
    params.ExpressionAttributeValues = { ":teamId": teamId };
  }
  return await docClient.send(new QueryCommand5(params));
}
__name(getWorkItems, "getWorkItems");
async function getCapabilities(docClient, schema, ids) {
  if (ids.length === 0) return [];
  const response = await docClient.send(
    new BatchGetCommand2({
      RequestItems: {
        [`${schema}-pmbook-Capability`]: {
          Keys: ids.map((id) => ({ id }))
        }
      }
    })
  );
  return response.Responses?.[`${schema}-pmbook-Capability`] || [];
}
__name(getCapabilities, "getCapabilities");
function categorizeWork(workItems, capabilities) {
  return {
    strategic: workItems.filter((w) => {
      const cap = capabilities.find((c) => c.id === w.capability);
      return cap && (cap.strategicWeight || 0) > 7;
    }).length,
    operational: workItems.filter((w) => {
      const cap = capabilities.find((c) => c.id === w.capability);
      return cap && (cap.strategicWeight || 0) >= 4 && (cap.strategicWeight || 0) <= 7;
    }).length,
    maintenance: workItems.filter((w) => {
      const cap = capabilities.find((c) => c.id === w.capability);
      return cap && (cap.strategicWeight || 0) < 4;
    }).length
  };
}
__name(categorizeWork, "categorizeWork");
function calculateKeyResultStatus(keyResult) {
  const progress = (keyResult.current || 0) / (keyResult.target || 1) * 100;
  const daysUntilDeadline = keyResult.deadline ? Math.floor(
    (new Date(keyResult.deadline).getTime() - Date.now()) / (1e3 * 60 * 60 * 24)
  ) : 30;
  if (progress >= 100) return "completed";
  if (progress >= 80 && daysUntilDeadline > 0) return "on-track";
  if (progress >= 60 && daysUntilDeadline > 7) return "at-risk";
  return "behind";
}
__name(calculateKeyResultStatus, "calculateKeyResultStatus");
function calculateObjectiveMetrics() {
  return {
    alignment: 85,
    completion: 62,
    velocity: 1.2,
    burnRate: 18500,
    teamFocus: 78,
    valueDelivered: 245e3,
    risksIdentified: 3,
    blockers: 1
  };
}
__name(calculateObjectiveMetrics, "calculateObjectiveMetrics");
function summarizeRisks(risks, blockers) {
  return {
    critical: risks?.filter((r) => r.impact === "critical").length || 0,
    high: risks?.filter((r) => r.impact === "high").length || 0,
    activeBlockers: blockers?.length || 0,
    totalRiskScore: calculateRiskScore(risks)
  };
}
__name(summarizeRisks, "summarizeRisks");
function calculateRiskScore(risks) {
  if (!risks) return 0;
  return risks.reduce((score, risk) => {
    const impactMap = { low: 1, medium: 2, high: 3, critical: 5 };
    const probabilityMap = { low: 1, medium: 2, high: 3 };
    const impactScore = impactMap[risk.impact] || 0;
    const probabilityScore = probabilityMap[risk.probability] || 0;
    return score + impactScore * probabilityScore;
  }, 0);
}
__name(calculateRiskScore, "calculateRiskScore");
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
__name(generateId, "generateId");
var strategicService = {
  execute: execute5
};

// src/services/work.ts
import { DynamoDBClient as DynamoDBClient6 } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient as DynamoDBDocumentClient6,
  QueryCommand as QueryCommand6,
  UpdateCommand as UpdateCommand4
} from "@aws-sdk/lib-dynamodb";
async function execute6(request, credentials, session) {
  if (!credentials) {
    return { success: false, error: "AWS credentials required" };
  }
  const client = new DynamoDBClient6({
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken
    }
  });
  const docClient = DynamoDBDocumentClient6.from(client);
  const schema = request.schema || "captify";
  try {
    switch (request.operation) {
      case "getUserWorkQueue": {
        const { userId } = request.data || {};
        if (!userId) {
          return { success: false, error: "User ID required" };
        }
        const response = await docClient.send(
          new QueryCommand6({
            TableName: `${schema}-pmbook-WorkItem`,
            IndexName: "assignee-index",
            KeyConditionExpression: "assignee = :userId",
            FilterExpression: "#status IN (:open, :inProgress)",
            ExpressionAttributeNames: {
              "#status": "status"
            },
            ExpressionAttributeValues: {
              ":userId": userId,
              ":open": "open",
              ":inProgress": "in-progress"
            }
          })
        );
        const items = response.Items || [];
        return {
          success: true,
          data: items.sort(
            (a, b) => (b.valueScore || 0) - (a.valueScore || 0)
          )
        };
      }
      case "startWork": {
        const { userId, workItemId } = request.data || {};
        if (!userId || !workItemId) {
          return { success: false, error: "User ID and work item ID required" };
        }
        const session2 = {
          startTime: (/* @__PURE__ */ new Date()).toISOString(),
          userId,
          active: true
        };
        await docClient.send(
          new UpdateCommand4({
            TableName: `${schema}-pmbook-WorkItem`,
            Key: { id: workItemId },
            UpdateExpression: "SET #status = :inProgress, sessions = list_append(if_not_exists(sessions, :empty), :session), currentSession = :session",
            ExpressionAttributeNames: {
              "#status": "status"
            },
            ExpressionAttributeValues: {
              ":inProgress": "in-progress",
              ":empty": [],
              ":session": [session2]
            }
          })
        );
        return { success: true, data: { sessionStarted: session2.startTime } };
      }
      case "completeWork": {
        const { workItemId, outcome } = request.data || {};
        if (!workItemId) {
          return { success: false, error: "Work item ID required" };
        }
        const completedAt = (/* @__PURE__ */ new Date()).toISOString();
        await docClient.send(
          new UpdateCommand4({
            TableName: `${schema}-pmbook-WorkItem`,
            Key: { id: workItemId },
            UpdateExpression: "SET #status = :completed, completedAt = :completedAt, outcome = :outcome, currentSession = :null",
            ExpressionAttributeNames: {
              "#status": "status"
            },
            ExpressionAttributeValues: {
              ":completed": "completed",
              ":completedAt": completedAt,
              ":outcome": outcome || {},
              ":null": null
            }
          })
        );
        return { success: true, data: { completed: true, completedAt } };
      }
      case "getTeamUtilization": {
        const { teamId, period = "week" } = request.data || {};
        if (!teamId) {
          return { success: false, error: "Team ID required" };
        }
        const response = await docClient.send(
          new QueryCommand6({
            TableName: `${schema}-pmbook-WorkItem`,
            IndexName: "team-index",
            KeyConditionExpression: "#team = :teamId",
            ExpressionAttributeNames: {
              "#team": "team"
            },
            ExpressionAttributeValues: {
              ":teamId": teamId
            }
          })
        );
        const items = response.Items || [];
        return {
          success: true,
          data: {
            totalHours: items.reduce(
              (sum, item) => sum + (item.actualHours || 0),
              0
            ),
            billableHours: items.filter((i) => i.billable).reduce(
              (sum, item) => sum + (item.actualHours || 0),
              0
            ),
            valueDelivered: items.reduce(
              (sum, item) => sum + (item.valueDelivered || 0),
              0
            ),
            itemsCompleted: items.filter((i) => i.status === "completed").length
          }
        };
      }
      default:
        return {
          success: false,
          error: `Unknown operation: ${request.operation}`
        };
    }
  } catch (error) {
    console.error(`Error in workService.${request.operation}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}
__name(execute6, "execute");
var workService = {
  execute: execute6
};

// src/services/index.ts
var services = {
  use: /* @__PURE__ */ __name((serviceName) => {
    switch (serviceName) {
      case "contract":
        return contractService;
      case "intelligence":
        return intelligenceService;
      case "performance":
        return performanceService;
      case "serviceMarketplace":
        return serviceMarketplaceService;
      case "strategic":
        return strategicService;
      case "work":
        return workService;
      default:
        throw new Error(`Unknown service: ${serviceName}`);
    }
  }, "use"),
  // Direct access to services
  contract: contractService,
  intelligence: intelligenceService,
  performance: performanceService,
  serviceMarketplace: serviceMarketplaceService,
  strategic: strategicService,
  work: workService
};
export {
  execute as contractExecute,
  contractService,
  execute2 as intelligenceExecute,
  intelligenceService,
  execute3 as performanceExecute,
  performanceService,
  execute4 as serviceExecute,
  serviceMarketplaceService,
  services,
  execute5 as strategicExecute,
  strategicService,
  execute6 as workExecute,
  workService
};
//# sourceMappingURL=services.mjs.map