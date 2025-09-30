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
  const [sessionStatus, setSessionStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
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
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar variant="sidebar" className="shrink-0">
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
          <PageRouter href={currentHash} />
        </main>
      </div>
    </SidebarProvider>
  );
}
