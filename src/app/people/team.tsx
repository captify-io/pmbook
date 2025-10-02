"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";

function TeamPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground">
            Team allocation and rates
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DynamicIcon name="user-check" className="h-5 w-5" />
            Team Roster
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            View team members, their allocations, rates, and assignments to value streams.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default TeamPage;