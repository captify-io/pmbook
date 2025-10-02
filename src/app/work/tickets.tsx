"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";

function TeamTicketsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Tickets</h1>
          <p className="text-muted-foreground">
            Cross-stream collaboration requests
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DynamicIcon name="ticket" className="h-5 w-5" />
            Active Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Team collaboration tickets and cross-functional requests will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default TeamTicketsPage;