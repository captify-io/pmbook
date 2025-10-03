"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { apiClient } from "@captify-io/core";
import { ContractNode } from "./nodes/ContractNode";
import { CLINNode } from "./nodes/CLINNode";
import { ObjectiveNode } from "./nodes/ObjectiveNode";
import { OutcomeNode } from "./nodes/OutcomeNode";
import { ContractDialog } from "./dialogs/ContractDialog";
import { TaskOrderDialog } from "./dialogs/TaskOrderDialog";
import { CLINDialog } from "./dialogs/CLINDialog";
import { OutcomeWizard } from "../contracts/OutcomeWizard";
import { TaskDialog } from "./dialogs/TaskDialog";
import { Button, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import type { Contract, TaskOrder, CLIN, CLINObjective, Outcome, CLINTask } from "../../types";

interface StreamsFlowProps {
  contract: Contract | undefined;
  contracts: Contract[];
  onUpdate: () => void;
  onSelectContract: (id: string) => void;
}

const nodeTypes: NodeTypes = {
  contract: ContractNode,
  clin: CLINNode,
  objective: ObjectiveNode,
  outcome: OutcomeNode,
};

/**
 * STREAMS FLOW - Visual execution management
 *
 * Layout: Contract → CLINs → Objectives → Outcomes
 * Each node is clickable for editing
 * Connections show budget flow and dependencies
 */
export function StreamsFlow({ contract, contracts, onUpdate, onSelectContract }: StreamsFlowProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const [clins, setCLINs] = useState<CLIN[]>([]);
  const [objectives, setObjectives] = useState<CLINObjective[]>([]);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [showContractDialog, setShowContractDialog] = useState(false);
  const [showTaskOrderDialog, setShowTaskOrderDialog] = useState(false);
  const [showCLINDialog, setShowCLINDialog] = useState(false);
  const [showOutcomeDialog, setShowOutcomeDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [selectedTaskOrder, setSelectedTaskOrder] = useState<string | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [taskOrders, setTaskOrders] = useState<TaskOrder[]>([]);
  const [tasks, setTasks] = useState<CLINTask[]>([]);

  // Load all data for the contract
  useEffect(() => {
    if (contract?.id) {
      loadStreamData();
    } else {
      setLoading(false);
    }
  }, [contract?.id, selectedTaskOrder]);

  const loadStreamData = async () => {
    if (!contract?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Load Task Orders
      const taskOrdersResponse = await apiClient.run({
        service: "platform.dynamodb",
        operation: "query",
        table: "pmbook-TaskOrder",
        data: {
          IndexName: "contractId-index",
          KeyConditionExpression: "contractId = :contractId",
          ExpressionAttributeValues: {
            ":contractId": contract.id,
          },
        },
      });

      const taskOrdersData = (taskOrdersResponse as any).Items || [];
      setTaskOrders(taskOrdersData);

      // Load CLINs
      const clinsResponse = await apiClient.run({
        service: "platform.dynamodb",
        operation: "query",
        table: "pmbook-CLIN",
        data: {
          IndexName: "contractId-index",
          KeyConditionExpression: "contractId = :contractId",
          ExpressionAttributeValues: {
            ":contractId": contract.id,
          },
        },
      });

      let clinsData = (clinsResponse as any).Items || [];

      // Filter CLINs by task order if selected
      if (selectedTaskOrder) {
        clinsData = clinsData.filter((clin: CLIN) =>
          clin.taskOrderId === selectedTaskOrder
        );
      }

      setCLINs(clinsData);

      // Load Objectives
      const objectivesResponse = await apiClient.run({
        service: "platform.dynamodb",
        operation: "query",
        table: "pmbook-Objective",
        data: {
          IndexName: "contractId-index",
          KeyConditionExpression: "contractId = :contractId",
          ExpressionAttributeValues: {
            ":contractId": contract.id,
          },
        },
      });

      let objectivesData = (objectivesResponse as any).Items || [];

      // Filter objectives by CLINs if task order is selected
      if (selectedTaskOrder) {
        const clinIds = clinsData.map((c: CLIN) => c.id);
        objectivesData = objectivesData.filter((obj: CLINObjective) =>
          obj.clinIds.some((clinId: string) => clinIds.includes(clinId))
        );
      }

      setObjectives(objectivesData);

      // Load Outcomes
      const outcomesResponse = await apiClient.run({
        service: "platform.dynamodb",
        operation: "query",
        table: "pmbook-Outcome",
        data: {
          IndexName: "contractId-index",
          KeyConditionExpression: "contractId = :contractId",
          ExpressionAttributeValues: {
            ":contractId": contract.id,
          },
        },
      });

      let outcomesData = (outcomesResponse as any).Items || [];

      // Filter outcomes by objectives if task order is selected
      if (selectedTaskOrder) {
        const objectiveIds = objectivesData.map((obj: CLINObjective) => obj.id);
        outcomesData = outcomesData.filter((outcome: Outcome) =>
          objectiveIds.includes(outcome.objectiveId)
        );
      }

      setOutcomes(outcomesData);

      // Load Tasks
      const tasksResponse = await apiClient.run({
        service: "platform.dynamodb",
        operation: "query",
        table: "pmbook-Task",
        data: {
          IndexName: "contractId-index",
          KeyConditionExpression: "contractId = :contractId",
          ExpressionAttributeValues: {
            ":contractId": contract.id,
          },
        },
      });

      let tasksData = (tasksResponse as any).Items || [];

      // Filter tasks by outcomes if task order is selected
      if (selectedTaskOrder) {
        const outcomeIds = outcomesData.map((outcome: Outcome) => outcome.id);
        tasksData = tasksData.filter((task: CLINTask) =>
          outcomeIds.includes(task.outcomeId)
        );
      }

      setTasks(tasksData);

      // Build the flow
      buildFlowNodes(clinsData, objectivesData, outcomesData);
    } catch (error) {
      console.error("Failed to load stream data:", error);
    } finally {
      setLoading(false);
    }
  };

  const buildFlowNodes = (
    clinsData: CLIN[],
    objectivesData: CLINObjective[],
    outcomesData: Outcome[]
  ) => {
    if (!contract) return;

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    // Contract node (root)
    newNodes.push({
      id: `contract-${contract.id}`,
      type: "contract",
      position: { x: 50, y: 200 },
      data: { contract },
    });

    // CLIN nodes
    const clinSpacing = 150;
    clinsData.forEach((clin, index) => {
      newNodes.push({
        id: `clin-${clin.id}`,
        type: "clin",
        position: { x: 400, y: index * clinSpacing + 50 },
        data: { clin, onUpdate: loadStreamData },
      });

      // Edge from contract to CLIN
      newEdges.push({
        id: `contract-to-clin-${clin.id}`,
        source: `contract-${contract.id}`,
        target: `clin-${clin.id}`,
        animated: clin.status === "active",
        style: { stroke: "#888", strokeWidth: 2 },
      });
    });

    // Objective nodes
    const objectiveSpacing = 180;
    let objectiveYOffset = 0;
    objectivesData.forEach((objective) => {
      newNodes.push({
        id: `objective-${objective.id}`,
        type: "objective",
        position: { x: 750, y: objectiveYOffset },
        data: { objective, onUpdate: loadStreamData },
      });

      // Connect to CLINs
      objective.clinIds.forEach((clinId) => {
        newEdges.push({
          id: `clin-to-objective-${clinId}-${objective.id}`,
          source: `clin-${clinId}`,
          target: `objective-${objective.id}`,
          animated: objective.status === "active",
          style: { stroke: "#10b981", strokeWidth: 2 },
          label: `$${(objective.totalBudget / 1000).toFixed(0)}K`,
        });
      });

      objectiveYOffset += objectiveSpacing;
    });

    // Outcome nodes
    const outcomeSpacing = 140;
    const outcomesByObjective = outcomesData.reduce((acc, outcome) => {
      if (!acc[outcome.objectiveId]) acc[outcome.objectiveId] = [];
      acc[outcome.objectiveId].push(outcome);
      return acc;
    }, {} as Record<string, Outcome[]>);

    objectivesData.forEach((objective, objIndex) => {
      const relatedOutcomes = outcomesByObjective[objective.id] || [];

      relatedOutcomes.forEach((outcome, outcomeIndex) => {
        const yPosition = objIndex * objectiveSpacing + outcomeIndex * outcomeSpacing;

        newNodes.push({
          id: `outcome-${outcome.id}`,
          type: "outcome",
          position: { x: 1150, y: yPosition },
          data: { outcome, onUpdate: loadStreamData },
        });

        // Connect to objective
        newEdges.push({
          id: `objective-to-outcome-${objective.id}-${outcome.id}`,
          source: `objective-${objective.id}`,
          target: `outcome-${outcome.id}`,
          animated: outcome.status === "in-progress",
          style: {
            stroke:
              outcome.status === "complete"
                ? "#10b981"
                : outcome.status === "blocked"
                ? "#ef4444"
                : "#3b82f6",
            strokeWidth: 2,
          },
          label: `$${(outcome.allocatedBudget / 1000).toFixed(0)}K`,
        });
      });
    });

    setNodes(newNodes as any);
    setEdges(newEdges as any);
  };

  // Handle new connections between nodes
  const onConnect = useCallback(
    async (params: Edge | Connection) => {
      const sourceType = params.source?.split('-')[0];
      const targetType = params.target?.split('-')[0];

      // Validate connection types
      const validConnections: Record<string, string[]> = {
        'contract': ['clin'],
        'clin': ['objective'],
        'objective': ['outcome'],
      };

      if (!sourceType || !targetType || !validConnections[sourceType]?.includes(targetType)) {
        console.warn('Invalid connection type');
        return;
      }

      // For CLIN → Objective connections, add the CLIN to the objective's clinIds
      if (sourceType === 'clin' && targetType === 'objective') {
        const clinId = params.source?.replace('clin-', '');
        const objectiveId = params.target?.replace('objective-', '');
        const objective = objectives.find(o => o.id === objectiveId);

        if (objective && clinId && !objective.clinIds.includes(clinId)) {
          try {
            // Update objective to include this CLIN
            await apiClient.run({
              service: "platform.dynamodb",
              operation: "update",
              table: "pmbook-Objective",
              data: {
                Key: { id: objectiveId },
                UpdateExpression: "ADD clinIds :clinId SET updatedAt = :now",
                ExpressionAttributeValues: {
                  ":clinId": new Set([clinId]),
                  ":now": new Date().toISOString(),
                },
              },
            });

            // Reload data
            loadStreamData();
          } catch (error) {
            console.error('Failed to connect CLIN to objective:', error);
          }
        }
      }

      // Add edge visually
      setEdges((eds) => addEdge(params, eds) as any);
    },
    [objectives, setEdges]
  );

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <DynamicIcon name="loader-2" className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case "contract":
                return "#6366f1";
              case "clin":
                return "#8b5cf6";
              case "objective":
                return "#3b82f6";
              case "outcome":
                return "#10b981";
              default:
                return "#94a3b8";
            }
          }}
        />
      </ReactFlow>

      {/* Horizontal Toolbar */}
      <div className="absolute top-0 left-0 right-0 bg-background border-b shadow-sm p-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Select Contract */}
          <Select
            value={contract?.id || ""}
            onValueChange={(value) => onSelectContract(value)}
          >
            <SelectTrigger className="w-[200px] h-9">
              <SelectValue placeholder="Select Contract" />
            </SelectTrigger>
            <SelectContent>
              {contracts.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.contractNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Add Contract */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowContractDialog(true)}
          >
            <DynamicIcon name="plus" className="h-4 w-4 mr-1" />
            Contract
          </Button>

          <div className="h-6 w-px bg-border mx-1" />

          {/* Select Task Order */}
          <div className="flex items-center gap-1">
            <Select
              value={selectedTaskOrder || ""}
              onValueChange={(value) => setSelectedTaskOrder(value)}
              disabled={!contract}
            >
              <SelectTrigger className="w-[200px] h-9">
                <SelectValue placeholder="All Task Orders" />
              </SelectTrigger>
              <SelectContent>
                {taskOrders.map((to) => (
                  <SelectItem key={to.id} value={to.id}>
                    {to.taskOrderNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTaskOrder && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedTaskOrder(null)}
                className="h-9 w-9 p-0"
              >
                <DynamicIcon name="x" className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Add Task Order */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowTaskOrderDialog(true)}
            disabled={!contract}
          >
            <DynamicIcon name="plus" className="h-4 w-4 mr-1" />
            Task Order
          </Button>

          <div className="h-6 w-px bg-border mx-1" />

          {/* Add CLIN */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowCLINDialog(true)}
            disabled={!contract}
          >
            <DynamicIcon name="plus" className="h-4 w-4 mr-1" />
            CLIN
          </Button>

          {/* Add Outcome */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (contract && clins.length > 0) {
                // Create a temporary outcome object for the dialog
                setSelectedOutcome({
                  id: `temp-${Date.now()}`,
                  objectiveId: "",
                  contractId: contract.id,
                  title: "",
                  description: "",
                  allocatedBudget: 0,
                  burnedBudget: 0,
                  ownerTeam: "",
                  teamLead: "",
                  status: "not-started",
                  percentComplete: 0,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                });
                setShowOutcomeDialog(true);
              }
            }}
            disabled={!contract || clins.length === 0}
          >
            <DynamicIcon name="plus" className="h-4 w-4 mr-1" />
            Outcome
          </Button>

          {/* Add Task */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (outcomes.length > 0) {
                setSelectedOutcome(outcomes[0]);
                setShowTaskDialog(true);
              }
            }}
            disabled={!contract || outcomes.length === 0}
          >
            <DynamicIcon name="plus" className="h-4 w-4 mr-1" />
            Task
          </Button>

          <div className="flex-1" />

          {/* Refresh */}
          <Button
            size="sm"
            variant="ghost"
            onClick={loadStreamData}
          >
            <DynamicIcon name="refresh-cw" className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <ContractDialog
        open={showContractDialog}
        onClose={() => setShowContractDialog(false)}
        onSuccess={onUpdate}
      />

      {contract && (
        <>
          <TaskOrderDialog
            open={showTaskOrderDialog}
            onClose={() => setShowTaskOrderDialog(false)}
            contractId={contract.id}
            onSuccess={loadStreamData}
          />

          <CLINDialog
            open={showCLINDialog}
            onClose={() => setShowCLINDialog(false)}
            contractId={contract.id}
            taskOrderId={selectedTaskOrder || undefined}
            onSuccess={loadStreamData}
          />

          {selectedOutcome && (
            <>
              <OutcomeWizard
                open={showOutcomeDialog}
                onClose={() => {
                  setShowOutcomeDialog(false);
                  setSelectedOutcome(null);
                }}
                objective={{
                  id: `obj-${Date.now()}`,
                  contractId: contract?.id || "",
                  clinIds: clins.map(c => c.id),
                  title: "Objective",
                  description: "",
                  totalBudget: 0,
                  allocatedBudget: 0,
                  remainingBudget: 0,
                  owner: "current-user",
                  status: "planning",
                  priority: "medium",
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }}
                userRole="pm"
                currentUser="current-user"
                onSuccess={loadStreamData}
              />

              <TaskDialog
                open={showTaskDialog}
                onClose={() => {
                  setShowTaskDialog(false);
                  setSelectedOutcome(null);
                }}
                outcomeId={selectedOutcome.id}
                onSuccess={loadStreamData}
              />
            </>
          )}
        </>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background border rounded-lg p-3 shadow-lg">
        <p className="text-xs font-semibold mb-2">Flow Legend</p>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-indigo-500" />
            <span>Contract</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-violet-500" />
            <span>CLIN</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span>Objective</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span>Outcome</span>
          </div>
        </div>
      </div>
    </div>
  );
}
