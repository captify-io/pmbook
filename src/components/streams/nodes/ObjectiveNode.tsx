"use client";

import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, Badge } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import type { CLINObjective } from "../../../types";

export function ObjectiveNode({ data }: NodeProps) {
  const { objective, onUpdate } = data as { objective: CLINObjective; onUpdate: () => void };
  const [isHovered, setIsHovered] = useState(false);

  const allocationPercent =
    objective.totalBudget > 0
      ? (objective.allocatedBudget / objective.totalBudget) * 100
      : 0;

  const statusColors = {
    planning: "bg-gray-500",
    active: "bg-green-500",
    complete: "bg-blue-500",
    "on-hold": "bg-yellow-500",
  };

  const priorityColors = {
    critical: "text-red-600",
    high: "text-orange-600",
    medium: "text-blue-600",
    low: "text-gray-600",
  };

  return (
    <>
      {/* Input handle - connects from CLINs */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-500"
      />

      <Card
        className="w-[280px] shadow-md border-2 border-blue-500 bg-blue-50 dark:bg-blue-950 cursor-pointer transition-all hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          // TODO: Open Objective edit dialog
          console.log("Edit Objective:", objective.id);
        }}
      >
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <div className="p-1.5 bg-blue-500 rounded">
              <DynamicIcon name="target" className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge
                  variant="default"
                  className={`text-xs ${statusColors[objective.status]}`}
                >
                  {objective.status}
                </Badge>
                <span
                  className={`text-xs font-semibold ${
                    priorityColors[objective.priority]
                  }`}
                >
                  {objective.priority}
                </span>
              </div>
              <h4 className="font-semibold text-sm line-clamp-2 mb-2">
                {objective.title}
              </h4>

              {objective.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {objective.description}
                </p>
              )}

              {/* Budget Allocation */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Budget:</span>
                  <span className="font-medium">
                    ${(objective.totalBudget / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Allocated:</span>
                  <span className="font-medium text-orange-600">
                    ${(objective.allocatedBudget / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining:</span>
                  <span className="font-medium text-green-600">
                    ${(objective.remainingBudget / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${allocationPercent}%` }}
                  />
                </div>
              </div>

              {/* Owner */}
              <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DynamicIcon name="user" className="h-3 w-3" />
                    <span className="truncate">{objective.owner}</span>
                  </div>
                  {objective.functionalArea && (
                    <Badge variant="outline" className="text-xs">
                      {objective.functionalArea}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {isHovered && (
            <div className="mt-2 pt-2 border-t border-blue-300 dark:border-blue-700 flex items-center justify-center gap-1 text-xs text-blue-600 dark:text-blue-400">
              <DynamicIcon name="edit" className="h-3 w-3" />
              <span>Click to edit</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Output handle - connects to Outcomes */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-500"
      />
    </>
  );
}
