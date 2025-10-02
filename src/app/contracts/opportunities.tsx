"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";

function OpportunitiesPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Opportunities</h1>
          <p className="text-muted-foreground">
            New business and proposals
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DynamicIcon name="target" className="h-5 w-5" />
            Business Development
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Track new opportunities, proposals, and business development activities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default OpportunitiesPage;