"use client";

import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, Badge } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import type { CLIN } from "../../../types";

export function CLINNode({ data }: NodeProps) {
  const { clin, onUpdate } = data as { clin: CLIN; onUpdate: () => void };
  const [isHovered, setIsHovered] = useState(false);

  const availableBudget = clin.fundedValue - clin.obligatedValue;
  const utilizationPercent = (clin.obligatedValue / clin.fundedValue) * 100;

  return (
    <>
      {/* Input handle - connects from Contract */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-violet-500"
      />

      <Card
        className="w-[260px] shadow-md border-2 border-violet-500 bg-violet-50 dark:bg-violet-950 cursor-pointer transition-all hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          // TODO: Open CLIN edit dialog
          console.log("Edit CLIN:", clin.id);
        }}
      >
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <div className="p-1.5 bg-violet-500 rounded">
              <DynamicIcon name="list-ordered" className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-mono text-xs font-bold text-violet-700 dark:text-violet-300">
                  CLIN {clin.clinNumber}
                </p>
                <Badge
                  variant={clin.status === "active" ? "default" : "outline"}
                  className="text-xs"
                >
                  {clin.type}
                </Badge>
              </div>
              <h4 className="font-semibold text-xs line-clamp-1 mb-2">
                {clin.title}
              </h4>

              {/* Financial */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Funded:</span>
                  <span className="font-medium">
                    ${(clin.fundedValue / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Obligated:</span>
                  <span className="font-medium text-orange-600">
                    ${(clin.obligatedValue / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available:</span>
                  <span className="font-medium text-green-600">
                    ${(availableBudget / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-violet-500 h-1.5 rounded-full"
                    style={{ width: `${utilizationPercent}%` }}
                  />
                </div>
              </div>

              {/* Period */}
              <div className="mt-2 pt-2 border-t border-violet-200 dark:border-violet-800">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <DynamicIcon name="calendar" className="h-3 w-3" />
                  <span>
                    {new Date(clin.periodStart).toLocaleDateString("en-US", {
                      month: "short",
                      year: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(clin.periodEnd).toLocaleDateString("en-US", {
                      month: "short",
                      year: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {isHovered && (
            <div className="mt-2 pt-2 border-t border-violet-300 dark:border-violet-700 flex items-center justify-center gap-1 text-xs text-violet-600 dark:text-violet-400">
              <DynamicIcon name="edit" className="h-3 w-3" />
              <span>Click to edit</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Output handle - connects to Objectives */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-violet-500"
      />
    </>
  );
}
