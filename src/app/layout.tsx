"use client";

import React, { useCallback, useMemo, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  CaptifyProvider,
  CaptifyLayout,
} from "@captify-io/core/components";
import { SignOnPage } from "@captify-io/core";
import { config } from "../config";
import "./globals.css";

// Suppress next-auth client errors when platform is offline
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const errorMessage = args[0]?.toString() || "";
    // Suppress specific next-auth client session errors only
    if (
      (errorMessage.includes("ClientSessionError") && errorMessage.includes("authjs.dev")) ||
      (errorMessage.includes("Cannot read properties of null") && errorMessage.includes("'message'"))
    ) {
      return; // Silently ignore platform offline auth errors
    }
    originalError.apply(console, args);
  };
}

interface CaptifyPageLayoutProps {
  children: React.ReactNode;
  params?: Promise<{}>;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Memoize the config to prevent unnecessary re-renders
  const memoizedConfig = useMemo(() => config, []);

  // Convert menu item ID to Next.js path - memoized to prevent recreation
  const handleNavigate = useCallback((id: string) => {
    // Find the menu item to get its href
    const findMenuItem = (items: any[]): string | undefined => {
      for (const item of items) {
        if (item.id === id && item.href) return item.href;
        if (item.children) {
          const found = findMenuItem(item.children);
          if (found) return found;
        }
      }
    };

    const href = findMenuItem(config.menu);
    if (href) {
      router.push(href);
    }
  }, [router]);

  // Add error parameter to URL when no session (must be before any early returns)
  useEffect(() => {
    if (status === "unauthenticated" || (!session?.user && status !== "loading")) {
      const params = new URLSearchParams(window.location.search);
      if (!params.has("error")) {
        // Check if session response included an error code
        const errorCode = (session as any)?.error || (status === "unauthenticated" ? "401" : "500");
        params.set("error", errorCode);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, [status, session]);

  // If loading, show nothing (brief flash only)
  if (status === "loading") {
    return null;
  }

  // If no session, show the sign-in page
  if (status === "unauthenticated" || !session?.user) {
    return <SignOnPage appName={config.appName} />;
  }

  return (
    <CaptifyProvider session={session}>
      <CaptifyLayout
        config={memoizedConfig}
        session={session}
        onNavigate={handleNavigate}
      >
        {children}
      </CaptifyLayout>
    </CaptifyProvider>
  );
}

export default function CaptifyPageLayout({
  children,
  params,
}: CaptifyPageLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider
          refetchInterval={0}
          refetchOnWindowFocus={false}
        >
          <LayoutContent>{children}</LayoutContent>
        </SessionProvider>
      </body>
    </html>
  );
}
