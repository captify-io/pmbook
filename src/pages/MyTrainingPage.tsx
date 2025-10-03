"use client";

import React from "react";

export default function MyTrainingPage(props: Record<string, string>) {
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold mb-4">My Training</h1>
      <p className="text-muted-foreground mb-6">
        Courses and certifications
      </p>
      {/* Content will be built here */}
    </div>
  );
}
