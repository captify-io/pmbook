"use client";

import React from "react";
import { Card, CardContent, Progress, Badge } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import type { CLIN } from "../../types";

interface CLINCardProps {
  clin: CLIN;
  onClick?: () => void;
  showAllocation?: boolean;
}

/**
 * CLIN CARD - Visual budget tracking
 *
 * Shows:
 * - CLIN number & type
 * - Total value vs burned
 * - Progress bar (visual burn rate)
 * - Status indicators
 * - Period of performance
 */

export function CLINCard({ clin, onClick, showAllocation = false }: CLINCardProps) {
  const burnRate = clin.totalValue > 0 ? (clin.burnedValue / clin.totalValue) * 100 : 0;
  const obligationRate = clin.totalValue > 0 ? (clin.obligatedValue / clin.totalValue) * 100 : 0;
  const availableValue = clin.fundedValue - clin.obligatedValue;

  // Determine status color
  const getStatusColor = () => {
    if (clin.status === 'closed') return 'bg-gray-100 text-gray-700';
    if (clin.status === 'fully-obligated') return 'bg-orange-100 text-orange-700';
    if (burnRate > 80) return 'bg-red-100 text-red-700';
    if (burnRate > 60) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  const getProgressColor = () => {
    if (burnRate > 80) return 'bg-red-500';
    if (burnRate > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card
      className={`hover:border-primary transition-colors ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono font-bold text-lg">{clin.clinNumber}</span>
              <Badge variant="outline" className="text-xs">
                {clin.type}
              </Badge>
              <Badge className={getStatusColor()}>
                {clin.status}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {clin.title}
            </p>

            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <DynamicIcon name="calendar" className="h-3 w-3" />
                <span>
                  {new Date(clin.periodStart).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -
                  {new Date(clin.periodEnd).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right ml-4">
            <div className="text-2xl font-bold">
              ${clin.totalValue.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              total value
            </div>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Funded:</span>
            <span className="font-medium">${clin.fundedValue.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Obligated:</span>
            <span className="font-medium text-orange-600">
              ${clin.obligatedValue.toLocaleString()}
            </span>
          </div>

          {showAllocation && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Available:</span>
              <span className="font-medium text-green-600">
                ${availableValue.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Burned:</span>
            <span className="font-medium text-red-600">
              ${clin.burnedValue.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Burn Rate</span>
            <span>{burnRate.toFixed(1)}%</span>
          </div>
          <Progress
            value={burnRate}
            className="h-2"
          />
        </div>

        {/* Warning Indicators */}
        {burnRate > 80 && clin.status === 'active' && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
            <DynamicIcon name="alert-triangle" className="h-4 w-4 text-red-600 mt-0.5" />
            <p className="text-xs text-red-700">
              High burn rate - {burnRate.toFixed(0)}% of total value spent
            </p>
          </div>
        )}

        {availableValue < 0 && (
          <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-md flex items-start gap-2">
            <DynamicIcon name="alert-circle" className="h-4 w-4 text-orange-600 mt-0.5" />
            <p className="text-xs text-orange-700">
              Over-obligated by ${Math.abs(availableValue).toLocaleString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
