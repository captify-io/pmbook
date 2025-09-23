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
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@captify-io/platform/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
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
            <SidebarMenu>
              {menu.map((section) => (
                <SidebarMenuItem key={section.id}>
                  <SidebarMenuButton tooltip={section.description}>
                    <DynamicIcon name={section.icon} className="h-4 w-4" />
                    <span>{section.label}</span>
                  </SidebarMenuButton>
                  {section.children && (
                    <SidebarMenuSub>
                      {section.children.map((item) => (
                        <SidebarMenuSubItem key={item.id}>
                          <SidebarMenuSubButton
                            onClick={() => handleMenuClick(item.id)}
                            isActive={currentHash === item.id}
                            tooltip={item.description}
                          >
                            <DynamicIcon name={item.icon} className="h-4 w-4" />
                            <span>{item.label}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
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
