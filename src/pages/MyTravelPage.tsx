"use client";

import React from "react";

export default function MyTravelPage(props: Record<string, string>) {
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold mb-4">My Travel</h1>
      <p className="text-muted-foreground mb-6">
        Business travel requests
      </p>
      {/* Content will be built here */}
    </div>
  );
}
