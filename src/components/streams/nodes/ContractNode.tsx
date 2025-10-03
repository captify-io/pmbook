"use client";

import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, Badge } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import type { Contract } from "../../../types";

export function ContractNode({ data }: NodeProps) {
  const { contract } = data as { contract: Contract };

  const fundingPercentage = (contract.fundedValue / contract.totalValue) * 100;

  return (
    <>
      <Card className="w-[280px] shadow-lg border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-950">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <DynamicIcon name="file-text" className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-mono text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                  {contract.contractNumber}
                </p>
                <Badge variant="default" className="text-xs">
                  {contract.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                {contract.name}
              </h3>

              {/* Financial Summary */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-medium">
                    ${(contract.totalValue / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Funded:</span>
                  <span className="font-medium text-green-600">
                    ${(contract.fundedValue / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-indigo-500 h-1.5 rounded-full"
                    style={{ width: `${fundingPercentage}%` }}
                  />
                </div>
              </div>

              {/* Team */}
              <div className="mt-2 pt-2 border-t border-indigo-200 dark:border-indigo-800">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <DynamicIcon name="user" className="h-3 w-3" />
                  <span className="truncate">{contract.programManager}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Output handle - connects to CLINs */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-indigo-500"
      />
    </>
  );
}
