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
          <PageRouter href={currentHash} />
        </main>
      </div>
    </SidebarProvider>
  );
}
