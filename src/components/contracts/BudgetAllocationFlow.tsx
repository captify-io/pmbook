"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Progress } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import { apiClient } from "@captify-io/core";
import type { CLIN, Objective } from "../../types";

interface BudgetAllocationFlowProps {
  contractId: string;
  clins: CLIN[];
  objective: Objective;
  onComplete: () => void;
}

/**
 * BUDGET ALLOCATION FLOW
 *
 * Visual interface for allocating CLIN budgets to objectives:
 * - Shows available budget per CLIN
 * - Allows PM to allocate amounts
 * - Real-time validation (can't over-allocate)
 * - Visual feedback with progress bars
 * - Auto-suggest equal distribution
 */

export function BudgetAllocationFlow({
  contractId,
  clins,
  objective,
  onComplete,
}: BudgetAllocationFlowProps) {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);

  // Calculate available budget per CLIN
  const availableBudget = clins.reduce((acc, clin) => {
    acc[clin.id] = clin.fundedValue - clin.obligatedValue;
    return acc;
  }, {} as Record<string, number>);

  const totalAllocated = Object.values(allocations).reduce((sum, val) => sum + val, 0);
  const hasErrors = Object.entries(allocations).some(
    ([clinId, amount]) => amount > availableBudget[clinId]
  );

  // Auto-distribute budget equally across active CLINs
  const autoDistribute = (targetAmount: number) => {
    const activeCLINs = clins.filter(
      (c) => c.status === "active" && availableBudget[c.id] > 0
    );

    if (activeCLINs.length === 0) return;

    const perCLIN = targetAmount / activeCLINs.length;
    const suggested = activeCLINs.reduce((acc, clin) => {
      acc[clin.id] = Math.min(perCLIN, availableBudget[clin.id]);
      return acc;
    }, {} as Record<string, number>);

    setAllocations(suggested);
  };

  // Save allocations to DynamoDB
  const saveAllocations = async () => {
    setSaving(true);
    try {
      // Create allocation records
      const allocationPromises = Object.entries(allocations)
        .filter(([_, amount]) => amount > 0)
        .map(([clinId, amount]) =>
          apiClient.run({
            service: "platform.dynamodb",
            operation: "put",
            table: "pmbook-CLINAllocation",
            data: {
              Item: {
                id: `${clinId}-${objective.id}`,
                clinId,
                objectiveId: objective.id,
                amount,
                allocatedAt: new Date().toISOString(),
                allocatedBy: "current-user", // TODO: Get from session
              },
            },
          })
        );

      // Update CLIN obligated values
      const clinUpdatePromises = Object.entries(allocations)
        .filter(([_, amount]) => amount > 0)
        .map(([clinId, amount]) => {
          const clin = clins.find((c) => c.id === clinId);
          if (!clin) return Promise.resolve();

          return apiClient.run({
            service: "platform.dynamodb",
            operation: "update",
            table: "pmbook-CLIN",
            data: {
              Key: { id: clinId },
              UpdateExpression: "SET obligatedValue = obligatedValue + :amount, updatedAt = :now",
              ExpressionAttributeValues: {
                ":amount": amount,
                ":now": new Date().toISOString(),
              },
            },
          });
        });

      // Update objective budget
      await apiClient.run({
        service: "platform.dynamodb",
        operation: "update",
        table: "pmbook-Objective",
        data: {
          Key: { id: objective.id },
          UpdateExpression: "SET totalBudget = :total, updatedAt = :now",
          ExpressionAttributeValues: {
            ":total": totalAllocated,
            ":now": new Date().toISOString(),
          },
        },
      });

      await Promise.all([...allocationPromises, ...clinUpdatePromises]);
      onComplete();
    } catch (error) {
      console.error("Failed to save allocations:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">Allocate Budget to Objective</h3>
          <p className="text-sm text-muted-foreground">
            {objective.title}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => autoDistribute(500000)} // Default $500k
          >
            <DynamicIcon name="wand-2" className="h-4 w-4 mr-2" />
            Auto-Distribute
          </Button>
        </div>
      </div>

      {/* CLIN Allocation Cards */}
      <div className="grid gap-4">
        {clins
          .filter((c) => c.status === "active")
          .map((clin) => {
            const allocated = allocations[clin.id] || 0;
            const available = availableBudget[clin.id];
            const percentage = available > 0 ? (allocated / available) * 100 : 0;
            const isOverAllocated = allocated > available;

            return (
              <Card key={clin.id} className={isOverAllocated ? "border-red-500" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* CLIN Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono font-semibold">{clin.clinNumber}</span>
                        <span className="text-sm text-muted-foreground">{clin.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{clin.title}</p>

                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Available:</span>
                          <span className="font-medium">
                            ${available.toLocaleString()}
                          </span>
                        </div>
                        <Progress
                          value={percentage}
                          className="h-1"
                        />
                      </div>
                    </div>

                    {/* Allocation Input */}
                    <div className="w-48">
                      <Label className="text-xs text-muted-foreground">Allocate Amount</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm">$</span>
                        <Input
                          type="number"
                          value={allocated || ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                            setAllocations({
                              ...allocations,
                              [clin.id]: parseFloat(e.target.value) || 0,
                            })
                          }
                          className={isOverAllocated ? "border-red-500" : ""}
                          placeholder="0"
                        />
                      </div>
                      {isOverAllocated && (
                        <p className="text-xs text-red-600 mt-1">
                          Exceeds available by ${(allocated - available).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>

      {/* Summary */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Budget Allocated</p>
              <p className="text-3xl font-bold mt-1">
                ${totalAllocated.toLocaleString()}
              </p>
            </div>

            <Button
              onClick={saveAllocations}
              disabled={hasErrors || totalAllocated === 0 || saving}
              size="lg"
            >
              {saving ? (
                <>
                  <DynamicIcon name="loader-2" className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <DynamicIcon name="check" className="h-4 w-4 mr-2" />
                  Confirm Allocation
                </>
              )}
            </Button>
          </div>

          {hasErrors && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
              <DynamicIcon name="alert-triangle" className="h-4 w-4 text-red-600 mt-0.5" />
              <p className="text-sm text-red-700">
                Cannot allocate more than available budget. Please adjust amounts.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Visual Flow Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Budget Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(allocations)
              .filter(([_, amount]) => amount > 0)
              .map(([clinId, amount]) => {
                const clin = clins.find((c) => c.id === clinId);
                return (
                  <div key={clinId} className="flex items-center gap-3 text-sm">
                    <span className="font-mono text-muted-foreground">
                      {clin?.clinNumber}
                    </span>
                    <DynamicIcon name="arrow-right" className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">${amount.toLocaleString()}</span>
                    <DynamicIcon name="arrow-right" className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{objective.title}</span>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
