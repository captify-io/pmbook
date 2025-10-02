"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@captify-io/platform/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Button,
  Progress,
} from "@captify-io/platform/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import type { Contract, CLIN, Objective } from "../../../types";

/**
 * CONTRACT DETAIL PAGE
 *
 * Simple, visual overview:
 * - Contract health at a glance
 * - CLINs as funding pools (visual budget bars)
 * - Quick actions (add CLIN, create objective)
 * - Tabs for: CLINs, Objectives, Reports
 */

export default function ContractDetailPage() {
  const params = useParams();
  const contractId = params.id as string;

  const [contract, setContract] = useState<Contract | null>(null);
  const [clins, setCLINs] = useState<CLIN[]>([]);
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContractData();
  }, [contractId]);

  const loadContractData = async () => {
    try {
      const [contractData, clinsData, objectivesData] = await Promise.all([
        apiClient.run({
          service: "platform.dynamodb",
          operation: "get",
          table: "pmbook-Contract",
          data: { Key: { id: contractId } }
        }),
        apiClient.run({
          service: "platform.dynamodb",
          operation: "scan",
          table: "pmbook-CLIN",
          data: {
            FilterExpression: "contractId = :contractId",
            ExpressionAttributeValues: { ":contractId": contractId }
          }
        }),
        apiClient.run({
          service: "platform.dynamodb",
          operation: "scan",
          table: "pmbook-Objective",
          data: {
            FilterExpression: "contractId = :contractId",
            ExpressionAttributeValues: { ":contractId": contractId }
          }
        })
      ]);

      setContract((contractData as any)?.Item);
      setCLINs((clinsData as any)?.Items || []);
      setObjectives((objectivesData as any)?.Items || []);
    } catch (error) {
      console.error("Failed to load contract:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <DynamicIcon name="loader-2" className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!contract) {
    return <div>Contract not found</div>;
  }

  // Calculate totals
  const totalCLINValue = clins.reduce((sum, clin) => sum + clin.totalValue, 0);
  const totalBurned = clins.reduce((sum, clin) => sum + clin.burnedValue, 0);
  const burnRate = totalCLINValue > 0 ? (totalBurned / totalCLINValue) * 100 : 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{contract.contractNumber}</h1>
          <p className="text-muted-foreground mt-1">{contract.title}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <DynamicIcon name="file-text" className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalCLINValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Burned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              ${totalBurned.toLocaleString()}
            </div>
            <Progress value={burnRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">CLINs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clins.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {clins.filter(c => c.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{objectives.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {objectives.filter(o => o.status === 'active').length} active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="clins" className="space-y-4">
        <TabsList>
          <TabsTrigger value="clins">CLINs</TabsTrigger>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
          <TabsTrigger value="flow">Budget Flow</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="clins">
          <CLINsView clins={clins} contractId={contractId} onRefresh={loadContractData} />
        </TabsContent>

        <TabsContent value="objectives">
          <ObjectivesView objectives={objectives} clins={clins} contractId={contractId} onRefresh={loadContractData} />
        </TabsContent>

        <TabsContent value="flow">
          <BudgetFlowView clins={clins} objectives={objectives} />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsView contractId={contractId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sub-components for each tab
function CLINsView({ clins, contractId, onRefresh }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Contract Line Items</h3>
        <Button size="sm">
          <DynamicIcon name="plus" className="h-4 w-4 mr-2" />
          Add CLIN
        </Button>
      </div>

      {clins.map((clin: CLIN) => (
        <Card key={clin.id} className="hover:border-primary transition-colors cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold">{clin.clinNumber}</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded">
                    {clin.type}
                  </span>
                </div>
                <p className="text-sm mt-1">{clin.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(clin.periodStart).toLocaleDateString()} - {new Date(clin.periodEnd).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold">
                  ${clin.totalValue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  ${clin.burnedValue.toLocaleString()} burned
                </div>
                <Progress
                  value={(clin.burnedValue / clin.totalValue) * 100}
                  className="mt-2 w-32"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {clins.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <DynamicIcon name="inbox" className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No CLINs yet. Add one to start tracking funding.</p>
        </div>
      )}
    </div>
  );
}

function ObjectivesView({ objectives, clins, contractId, onRefresh }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Strategic Objectives</h3>
        <Button size="sm">
          <DynamicIcon name="target" className="h-4 w-4 mr-2" />
          Add Objective
        </Button>
      </div>

      {objectives.map((obj: Objective) => (
        <Card key={obj.id} className="hover:border-primary transition-colors cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{obj.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    obj.priority === 'critical' ? 'bg-red-100 text-red-700' :
                    obj.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    'bg-secondary'
                  }`}>
                    {obj.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{obj.description}</p>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-muted-foreground">Owner: {obj.owner}</span>
                  <span className="text-muted-foreground">• {obj.functionalArea}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold">
                  ${obj.totalBudget.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  ${obj.remainingBudget.toLocaleString()} available
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {objectives.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <DynamicIcon name="target" className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No objectives defined yet.</p>
        </div>
      )}
    </div>
  );
}

function BudgetFlowView({ clins, objectives }: any) {
  return (
    <div className="p-6 bg-muted/30 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Budget Flow Visualization</h3>
      <p className="text-sm text-muted-foreground">
        Visual Sankey diagram showing: CLINs → Objectives → Outcomes → Teams
      </p>
      <div className="mt-4 p-12 border-2 border-dashed rounded-lg text-center text-muted-foreground">
        Coming soon: Interactive budget flow diagram
      </div>
    </div>
  );
}

function ReportsView({ contractId }: any) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Monthly CLIN Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Auto-generated reports showing cost, schedule, performance, and risk.
          </p>
          <Button>
            <DynamicIcon name="file-text" className="h-4 w-4 mr-2" />
            Generate Current Month Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
