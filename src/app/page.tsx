"use client";

import React, { useState, useEffect, Suspense } from "react";
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel
} from "@captify-io/platform/components";
import { useHashContext } from "./hooks/useHashContext";
import { registeredApps } from "./pages";
import { menu } from "../config";

export default function HomePage() {
  const { currentHash } = useHashContext();
  const [PageComponent, setPageComponent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to home hash if no hash is present
    if (!window.location.hash) {
      window.location.hash = "home";
    }
  }, []);

  // Debug: Log menu structure
  useEffect(() => {
    console.log('Menu structure:', JSON.stringify(menu, null, 2));
  }, []);

  useEffect(() => {
    loadComponent(currentHash);
  }, [currentHash]);

  const loadComponent = async (hash: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (registeredApps[hash]) {
        const { default: Component } = await registeredApps[hash]();
        setPageComponent(() => Component);
      } else {
        // Fallback to home if hash not found
        const { default: Component } = await registeredApps.home();
        setPageComponent(() => Component);
      }
    } catch (error) {
      console.error(`Failed to load component for hash: ${hash}`, error);
      setError(`Failed to load page: ${hash}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuClick = (itemId: string) => {
    window.location.hash = itemId;
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg border border-red-200">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <p className="text-red-700 font-medium mb-2">Error Loading Page</p>
            <p className="text-gray-600 text-sm">{error}</p>
            <button 
              onClick={() => window.location.hash = "home"}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    if (isLoading || !PageComponent) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg border">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">Loading {currentHash}...</p>
            <div className="mt-4 space-y-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full animate-pulse w-3/4"></div>
              </div>
              <p className="text-sm text-gray-500">Loading components...</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      }>
        <PageComponent />
      </Suspense>
    );
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar variant="sidebar" className="shrink-0">
          <SidebarContent>
            {menu.map((section) => (
              <SidebarGroup key={section.id}>
                <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                <SidebarMenu>
                  {section.children?.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        onClick={() => handleMenuClick(item.id)}
                        isActive={currentHash === item.id}
                      >
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
}
