"use client";

import React from "react";

export default function TicketsPage(props: Record<string, string>) {
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold mb-4">Tickets</h1>
      <p className="text-muted-foreground mb-6">
        Central help/support area - filter by team, contract, or status
      </p>
      {/* Content will be built here */}
    </div>
  );
}
