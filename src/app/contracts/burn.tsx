"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@captify-io/platform/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";

function BurnPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Burn Rate Analysis</h1>
          <p className="text-muted-foreground">
            Financial burn tracking and projections
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DynamicIcon name="flame" className="h-5 w-5" />
              Monthly Burn Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Track monthly spending patterns and burn rate trends.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DynamicIcon name="clock" className="h-5 w-5" />
              Runway Projections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Forecast how long current funding will last at current burn rates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BurnPage;