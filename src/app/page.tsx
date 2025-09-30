"use client";

import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset,
} from "@captify-io/platform/components/ui";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@captify-io/platform/components/ui";
import { Button } from "@captify-io/platform/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import { ChevronDown, ChevronLeft, ChevronRight, Bot } from "lucide-react";
import { useHashContext } from "./hooks/useHashContext";
import { PageRouter } from "../components";
import { menu, agentId, agentAliasId, appName } from "../config";

export default function HomePage() {
  const { currentHash } = useHashContext();
  const [sessionStatus, setSessionStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const [agentPanelOpen, setAgentPanelOpen] = useState(false);
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    // Redirect to home hash if no hash is present
    if (!window.location.hash) {
      window.location.hash = "home";
    }
  }, []);

  // Check session status in dev mode
  useEffect(() => {
    if (!isDev) return;

    async function checkSession() {
      try {
        const response = await fetch('/api/auth/session', {
          credentials: 'include',
        });

        if (response.ok) {
          const session = await response.json();
          setSessionStatus(session ? 'authenticated' : 'unauthenticated');
        } else {
          setSessionStatus('unauthenticated');
        }
      } catch (error) {
        console.error('Session check error:', error);
        setSessionStatus('unauthenticated');
      }
    }

    checkSession();
  }, [isDev]);

  // Auto-redirect to auth flow when unauthenticated
  useEffect(() => {
    if (isDev && sessionStatus === 'unauthenticated') {
      const nextAuthUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'http://localhost:3000';
      const callbackUrl = encodeURIComponent(window.location.href);
      window.location.href = `${nextAuthUrl}/api/auth/signin?callbackUrl=${callbackUrl}`;
    }
  }, [isDev, sessionStatus]);

  const handleMenuClick = (itemId: string) => {
    window.location.hash = itemId;
  };

  const handleLogin = () => {
    window.location.href = `http://localhost:3000?callbackUrl=${encodeURIComponent(window.location.href)}`;
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-full w-full overflow-hidden">
        {/* Left Sidebar with Menu */}
        <Sidebar collapsible="icon" className="relative">
          <SidebarContent>
            {isDev && sessionStatus === 'unauthenticated' && (
              <div className="bg-blue-600 text-white p-2 m-2 rounded text-center">
                <button
                  onClick={handleLogin}
                  className="text-white hover:underline text-sm"
                >
                  Session Expired - Login
                </button>
              </div>
            )}
            <SidebarMenu>
              {menu.map((section) => {
                const hasChildren = section.children && section.children.length > 0;

                if (hasChildren) {
                  return (
                    <Collapsible key={section.id} defaultOpen={true} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2 min-w-0">
                              <DynamicIcon name={section.icon as any} className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{section.label}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {section.children!.map((item) => (
                              <SidebarMenuSubItem key={item.id}>
                                <SidebarMenuSubButton
                                  onClick={() => handleMenuClick(item.id)}
                                  isActive={currentHash === item.id}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <DynamicIcon name={item.icon as any} className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{item.label}</span>
                                  </div>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={section.id}>
                    <SidebarMenuButton onClick={() => handleMenuClick(section.id)}>
                      <DynamicIcon name={section.icon as any} className="h-4 w-4" />
                      <span>{section.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset className="flex-1 overflow-auto">
          <main className="p-4">
            <PageRouter href={currentHash} />
          </main>
        </SidebarInset>

        {/* Agent Panel Toggle Button */}
        <Button
          variant="outline"
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 p-0 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 z-[200]"
          onClick={() => setAgentPanelOpen(!agentPanelOpen)}
          title={agentPanelOpen ? "Close AI assistant" : "Open AI assistant"}
        >
          {agentPanelOpen ? (
            <ChevronRight className="h-8 w-8" />
          ) : (
            <Bot className="h-8 w-8" />
          )}
        </Button>
      </div>
    </SidebarProvider>
  );
}
