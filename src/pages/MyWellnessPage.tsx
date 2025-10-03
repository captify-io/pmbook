"use client";

import React from "react";

export default function MyWellnessPage(props: Record<string, string>) {
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold mb-4">My Wellness</h1>
      <p className="text-muted-foreground mb-6">
        Surveys, wellbeing resources
      </p>
      {/* Content will be built here */}
    </div>
  );
}
