"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@captify-io/platform/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";

function PerformancePage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Performance Metrics</h1>
          <p className="text-muted-foreground">
            Team metrics and utilization
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DynamicIcon name="trending-up" className="h-5 w-5" />
              Utilization Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Track team utilization rates and capacity planning.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DynamicIcon name="bar-chart" className="h-5 w-5" />
              Performance KPIs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Monitor key performance indicators and team productivity metrics.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PerformancePage;