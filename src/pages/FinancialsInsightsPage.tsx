"use client";

import React from "react";

export default function FinancialsInsightsPage(props: Record<string, string>) {
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold mb-4">Financial Insights</h1>
      <p className="text-muted-foreground mb-6">
        Burn rates, funding pool usage (overhead, G&A, M&H, profit)
      </p>
      {/* Content will be built here */}
    </div>
  );
}
