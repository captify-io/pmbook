"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@captify-io/platform/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";

function PoolsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Funding Pools</h1>
          <p className="text-muted-foreground">
            Operations, materials, and profit allocation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DynamicIcon name="pie-chart" className="h-5 w-5" />
              Operations Pool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Funding allocated for operational activities and labor.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DynamicIcon name="package" className="h-5 w-5" />
              Materials Pool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Budget for materials, equipment, and other direct costs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DynamicIcon name="trending-up" className="h-5 w-5" />
              Profit Pool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Profit margin and fee allocation from contracts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PoolsPage;