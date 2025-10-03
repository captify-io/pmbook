"use client";

import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, Badge, Progress } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import type { Outcome } from "../../../types";

export function OutcomeNode({ data }: NodeProps) {
  const { outcome, onUpdate } = data as { outcome: Outcome; onUpdate: () => void };
  const [isHovered, setIsHovered] = useState(false);

  const burnPercent =
    outcome.allocatedBudget > 0
      ? (outcome.burnedBudget / outcome.allocatedBudget) * 100
      : 0;

  const statusConfig = {
    "not-started": {
      color: "bg-gray-500",
      icon: "circle",
      label: "Not Started",
    },
    "in-progress": {
      color: "bg-blue-500",
      icon: "play-circle",
      label: "In Progress",
    },
    blocked: {
      color: "bg-red-500",
      icon: "alert-circle",
      label: "Blocked",
    },
    complete: {
      color: "bg-green-500",
      icon: "check-circle",
      label: "Complete",
    },
    cancelled: {
      color: "bg-gray-400",
      icon: "x-circle",
      label: "Cancelled",
    },
  };

  const config = statusConfig[outcome.status];

  return (
    <>
      {/* Input handle - connects from Objectives */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-green-500"
      />

      <Card
        className="w-[300px] shadow-md border-2 border-green-500 bg-green-50 dark:bg-green-950 cursor-pointer transition-all hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          // TODO: Open Outcome edit dialog
          console.log("Edit Outcome:", outcome.id);
        }}
      >
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <div className={`p-1.5 ${config.color} rounded`}>
              <DynamicIcon name={config.icon as any} className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="default" className={`text-xs ${config.color}`}>
                  {config.label}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {outcome.percentComplete}% complete
                </span>
              </div>
              <h4 className="font-semibold text-sm line-clamp-2 mb-2">
                {outcome.title}
              </h4>

              {outcome.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {outcome.description}
                </p>
              )}

              {/* Progress */}
              <div className="mb-2">
                <Progress value={outcome.percentComplete} className="h-1.5" />
              </div>

              {/* Budget */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="font-medium">
                    ${(outcome.allocatedBudget / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Burned:</span>
                  <span className="font-medium text-orange-600">
                    ${(outcome.burnedBudget / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      burnPercent > 90 ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${burnPercent}%` }}
                  />
                </div>
              </div>

              {/* Team & Target Date */}
              <div className="mt-2 pt-2 border-t border-green-200 dark:border-green-800 space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <DynamicIcon name="users" className="h-3 w-3" />
                  <span className="truncate">{outcome.ownerTeam}</span>
                </div>
                {outcome.teamLead && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <DynamicIcon name="user" className="h-3 w-3" />
                    <span className="truncate">{outcome.teamLead}</span>
                  </div>
                )}
                {outcome.targetDate && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <DynamicIcon name="calendar" className="h-3 w-3" />
                    <span>
                      Due:{" "}
                      {new Date(outcome.targetDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Deliverables */}
              {outcome.deliverables && outcome.deliverables.length > 0 && (
                <div className="mt-2 pt-2 border-t border-green-200 dark:border-green-800">
                  <p className="text-xs font-semibold mb-1">Deliverables:</p>
                  <div className="space-y-0.5">
                    {outcome.deliverables.slice(0, 2).map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <DynamicIcon name="check-square" className="h-3 w-3" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                    {outcome.deliverables.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{outcome.deliverables.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {isHovered && (
            <div className="mt-2 pt-2 border-t border-green-300 dark:border-green-700">
              <div className="flex items-center justify-center gap-1 text-xs text-green-600 dark:text-green-400">
                <DynamicIcon name="edit" className="h-3 w-3" />
                <span>Click to add tasks</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Output handle - could connect to Tasks in the future */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-green-500"
      />
    </>
  );
}
