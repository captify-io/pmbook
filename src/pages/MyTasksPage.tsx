"use client";

import React from "react";

export default function MyTasksPage(props: Record<string, string>) {
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold mb-4">My Tasks</h1>
      <p className="text-muted-foreground mb-6">
        Daily work, issues, tickets assigned - task updates = time reporting
      </p>
      {/* Content will be built here */}
    </div>
  );
}
