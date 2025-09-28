"use client";

import React, { useEffect, useState } from "react";
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
  const [sessionData, setSessionData] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session and display the results
    async function checkSession() {
      try {
        setLoading(true);
        const response = await fetch('/api/auth/session', {
          credentials: 'include',
        });

        console.log('Session response status:', response.status);

        if (!response.ok) {
          setSessionError(`Session request failed with status: ${response.status}`);
          setLoading(false);
          return;
        }

        const session = await response.json();
        console.log('Session data:', session);
        setSessionData(session);
        setLoading(false);
      } catch (error) {
        console.error('Session check error:', error);
        setSessionError(error.message);
        setLoading(false);
      }
    }

    checkSession();
  }, []);

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


  // Show session debug info
  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Loading Session...</h1>
      </div>
    );
  }

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
                    <DynamicIcon name={section.icon as any} className="h-4 w-4" />
                    <span>{section.label}</span>
                  </SidebarMenuButton>
                  {section.children && (
                    <SidebarMenuSub>
                      {section.children.map((item) => (
                        <SidebarMenuSubItem key={item.id}>
                          <SidebarMenuSubButton
                            onClick={() => handleMenuClick(item.id)}
                            isActive={currentHash === item.id}
                          >
                            <DynamicIcon name={item.icon as any} className="h-4 w-4" />
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
          <div className="mb-6 p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-bold mb-2">Session Debug Info:</h2>
            {sessionError ? (
              <div className="text-red-600">
                <strong>Session Error:</strong> {sessionError}
              </div>
            ) : (
              <pre className="text-sm bg-white p-2 rounded overflow-auto">
                {JSON.stringify(sessionData, null, 2)}
              </pre>
            )}
          </div>
          <PageRouter href={currentHash} />
        </main>
      </div>
    </SidebarProvider>
  );
}
