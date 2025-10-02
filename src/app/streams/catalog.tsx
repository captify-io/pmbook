"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";

function ServiceCatalogPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Service Catalog</h1>
          <p className="text-muted-foreground">
            Services offered by each stream
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DynamicIcon name="book-open" className="h-5 w-5" />
            Available Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Browse and request services from functional teams with SLA and time tracking.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ServiceCatalogPage;