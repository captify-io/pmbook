"use client";

import React from "react";

export default function KnowledgePage(props: Record<string, string>) {
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold mb-4">Knowledge Base</h1>
      <p className="text-muted-foreground mb-6">
        SOPs, FAQs, self-help resources (searchable, tied to tickets)
      </p>
      {/* Content will be built here */}
    </div>
  );
}
