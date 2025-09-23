"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@captify-io/platform/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";

function ActiveContractsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Active Contracts</h1>
          <p className="text-muted-foreground">
            Current contracts and funding pools
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DynamicIcon name="circle-check" className="h-5 w-5" />
            Contract Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Active contracts, CLINs, and funding pools will be displayed here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ActiveContractsPage;