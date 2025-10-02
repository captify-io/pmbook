"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";

function MyTasksPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-muted-foreground">
            Personal work queue and assignments
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DynamicIcon name="check-square" className="h-5 w-5" />
            Task Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your assigned tasks and work items will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyTasksPage;