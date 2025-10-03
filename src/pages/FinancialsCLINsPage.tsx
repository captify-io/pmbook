"use client";

import React from "react";

export default function FinancialsCLINsPage(props: Record<string, string>) {
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold mb-4">CLINs</h1>
      <p className="text-muted-foreground mb-6">
        CLIN allocations: Contract → CLIN → Outcome → Task → Team → Ticket → Individual
      </p>
      {/* Content will be built here */}
    </div>
  );
}
