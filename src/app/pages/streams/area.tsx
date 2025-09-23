"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@captify-io/platform/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";

function FunctionalAreasPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Functional Areas</h1>
          <p className="text-muted-foreground">
            DevOps, DataOps, Operations teams
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DynamicIcon name="server" className="h-5 w-5" />
              DevOps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Development operations and infrastructure automation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DynamicIcon name="database" className="h-5 w-5" />
              DataOps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Data operations, analytics, and data pipeline management.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DynamicIcon name="settings" className="h-5 w-5" />
              Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Business operations and process management.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FunctionalAreasPage;