"use client";

import React from "react";
import { Card, CardContent, Badge } from "@captify-io/platform/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import type { CLIN, Objective, Outcome } from "../../types";

interface BudgetFlowDiagramProps {
  clins: CLIN[];
  objectives: Objective[];
  outcomes?: Outcome[];
}

/**
 * BUDGET FLOW DIAGRAM
 *
 * Visual representation of money flow:
 * CLINs → Objectives → Outcomes → Teams
 *
 * Simple SVG-based flow diagram showing:
 * - Width of bars = budget amount
 * - Colors = status/health
 * - Connections show allocations
 */

export function BudgetFlowDiagram({
  clins,
  objectives,
  outcomes = [],
}: BudgetFlowDiagramProps) {
  // Calculate max values for scaling
  const maxCLIN = Math.max(...clins.map((c) => c.totalValue), 1);
  const maxObjective = Math.max(...objectives.map((o) => o.totalBudget), 1);

  const getBarHeight = (value: number, max: number) => {
    return Math.max((value / max) * 100, 5); // Min 5px height
  };

  const getStatusColor = (burnRate: number) => {
    if (burnRate > 80) return "bg-red-500";
    if (burnRate > 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      {/* Simplified Flow View */}
      <div className="grid grid-cols-3 gap-6">
        {/* Column 1: CLINs */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <DynamicIcon name="dollar-sign" className="h-4 w-4" />
            CLINs (Funding)
          </h4>
          <div className="space-y-2">
            {clins.map((clin) => {
              const burnRate =
                clin.totalValue > 0
                  ? (clin.burnedValue / clin.totalValue) * 100
                  : 0;
              const height = getBarHeight(clin.totalValue, maxCLIN);

              return (
                <div
                  key={clin.id}
                  className="relative group cursor-pointer"
                  style={{ minHeight: `${height}px` }}
                >
                  <div
                    className={`w-full rounded-md p-3 ${getStatusColor(burnRate)} bg-opacity-20 border border-current transition-all hover:shadow-md`}
                    style={{ minHeight: `${height}px` }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-semibold">
                          {clin.clinNumber}
                        </span>
                        <p className="text-xs mt-1 line-clamp-1">{clin.title}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {clin.type}
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs font-medium">
                      ${(clin.totalValue / 1000).toFixed(0)}k
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute left-0 top-full mt-1 w-64 bg-popover border rounded-md p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span className="font-medium">
                          ${clin.totalValue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Obligated:</span>
                        <span>${clin.obligatedValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Burned:</span>
                        <span className="text-red-600">
                          ${clin.burnedValue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Burn Rate:</span>
                        <span>{burnRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Objectives */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <DynamicIcon name="target" className="h-4 w-4" />
            Objectives (Strategic)
          </h4>
          <div className="space-y-2">
            {objectives.map((obj) => {
              const utilizationRate =
                obj.totalBudget > 0
                  ? (obj.allocatedBudget / obj.totalBudget) * 100
                  : 0;
              const height = getBarHeight(obj.totalBudget, maxObjective);

              return (
                <div
                  key={obj.id}
                  className="relative group cursor-pointer"
                  style={{ minHeight: `${height}px` }}
                >
                  <div
                    className={`w-full rounded-md p-3 border transition-all hover:shadow-md ${
                      obj.status === "active"
                        ? "bg-blue-500 bg-opacity-10 border-blue-500"
                        : "bg-muted border-muted-foreground"
                    }`}
                    style={{ minHeight: `${height}px` }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-xs font-semibold line-clamp-2">
                          {obj.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {obj.functionalArea}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-xs font-medium">
                      ${(obj.totalBudget / 1000).toFixed(0)}k
                    </div>

                    {/* Mini progress bar */}
                    <div className="mt-2 w-full bg-muted rounded-full h-1">
                      <div
                        className="bg-blue-600 h-1 rounded-full"
                        style={{ width: `${utilizationRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute left-0 top-full mt-1 w-64 bg-popover border rounded-md p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    <div className="space-y-1 text-xs">
                      <div className="font-medium mb-1">{obj.title}</div>
                      <div className="flex justify-between">
                        <span>Total Budget:</span>
                        <span className="font-medium">
                          ${obj.totalBudget.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Allocated to Outcomes:</span>
                        <span>${obj.allocatedBudget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Remaining:</span>
                        <span className="text-green-600">
                          ${obj.remainingBudget.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Owner:</span>
                        <span>{obj.owner}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Priority:</span>
                        <Badge variant="outline" className="text-xs">
                          {obj.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Outcomes/Teams */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <DynamicIcon name="check-circle" className="h-4 w-4" />
            Outcomes (Deliverables)
          </h4>
          {outcomes.length > 0 ? (
            <div className="space-y-2">
              {outcomes.slice(0, 5).map((outcome) => (
                <Card key={outcome.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-xs font-semibold line-clamp-2">
                          {outcome.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {outcome.ownerTeam}
                        </p>
                      </div>
                      <Badge
                        variant={
                          outcome.status === "complete"
                            ? "default"
                            : outcome.status === "blocked"
                            ? "destructive"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {outcome.percentComplete}%
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs font-medium">
                      ${(outcome.allocatedBudget / 1000).toFixed(0)}k
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <DynamicIcon
                name="inbox"
                className="h-12 w-12 mx-auto mb-2 opacity-50"
              />
              <p className="text-sm">No outcomes yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">
                ${clins.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Total Contract Value</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                ${clins.reduce((sum, c) => sum + c.obligatedValue, 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Obligated</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                ${clins.reduce((sum, c) => sum + c.burnedValue, 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Burned</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{objectives.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Active Objectives</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
