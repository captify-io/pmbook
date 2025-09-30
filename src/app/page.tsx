"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@captify-io/platform/components/ui";

function WorkDashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Work</h1>
          <p className="text-muted-foreground">Focus on value delivery</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to PMBook</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your work dashboard is ready. Start by navigating to Contracts or other sections.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default WorkDashboardPage;
