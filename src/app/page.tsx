"use client";

import React, { useEffect } from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel
} from "@captify-io/platform/components/ui";
import { useHashContext } from "./hooks/useHashContext";
import { PageRouter } from "../components";
import { menu } from "../config";

export default function HomePage() {
  const { currentHash } = useHashContext();

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

  const handleMenuClick = (itemId: string) => {
    window.location.hash = itemId;
  };

  // Custom fallback with enhanced loading UI
  const customFallback = (
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
          <PageRouter href={currentHash} fallback={customFallback} />
        </main>
      </div>
    </SidebarProvider>
  );
}
