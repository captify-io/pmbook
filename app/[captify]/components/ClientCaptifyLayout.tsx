"use client";

import { ReactNode } from "react";

interface ClientCaptifyLayoutProps {
  packageName: string;
  children: ReactNode;
}

export function ClientCaptifyLayout({ 
  packageName, 
  children 
}: ClientCaptifyLayoutProps) {
  // Temporary implementation while we determine the correct import path
  // This creates a simple layout structure
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Captify Platform - {packageName}
              </h1>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}