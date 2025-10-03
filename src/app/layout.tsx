"use client";

import React, { useCallback, useMemo, useEffect, memo, lazy, useRef } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import {
  CaptifyProvider,
  CaptifyLayout,
  HashRouter,
} from "@captify-io/core/components";
import { config } from "../config";
import "./globals.css";

// Lazy load all page components
const contentMap = {
  // Global pages
  insights: lazy(() => import("../app/page")),
  strategy: lazy(() => import("../pages/StrategyPage")),
  tickets: lazy(() => import("../pages/TicketsPage")),
  knowledge: lazy(() => import("../pages/KnowledgePage")),

  // My Work
  "my-tasks": lazy(() => import("../pages/MyTasksPage")),
  "my-leave": lazy(() => import("../pages/MyLeavePage")),
  "my-travel": lazy(() => import("../pages/MyTravelPage")),
  "my-wellness": lazy(() => import("../pages/MyWellnessPage")),
  "my-training": lazy(() => import("../pages/MyTrainingPage")),
  "my-ideas": lazy(() => import("../pages/MyIdeasPage")),

  // Operations
  "ops-contracts": lazy(() => import("../pages/OpsContractsPage")),
  "ops-streams": lazy(() => import("../pages/OpsStreamsPage")),
  "ops-people-teams": lazy(() => import("../pages/OpsPeopleTeamsPage")),
  "ops-people-performance": lazy(() => import("../pages/OpsPeoplePerformancePage")),

  // Financials
  "fin-insights": lazy(() => import("../pages/FinancialsInsightsPage")),
  "fin-clins": lazy(() => import("../pages/FinancialsCLINsPage")),
};

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

  // Memoize the config to prevent unnecessary re-renders
  const memoizedConfig = useMemo(() => config, []);

  // Capture session once when it becomes available - prevents re-renders on subsequent session changes
  const capturedSessionRef = useRef<typeof session>(null);

  // Initialize hash on first load if not present - ONLY ONCE
  useEffect(() => {
    if (!window.location.hash) {
      const defaultItem = config.menu.find((item: any) => item.isDefault);
      const fallback = defaultItem?.id || config.menu[0]?.id || 'insights';
      window.location.hash = fallback;
    }
  }, []); // Empty deps - only run once on mount

  // Clear the redirect flag when we have a session - ONLY ONCE
  useEffect(() => {
    if (session?.user) {
      sessionStorage.removeItem('auth-redirect-attempted');
    }
  }, []); // Empty deps - only run once on mount, ignore session changes

  // Capture session in ref after hooks
  if (session && !capturedSessionRef.current) {
    capturedSessionRef.current = session;
  }
  const capturedSession = capturedSessionRef.current || session;

  // If loading, show nothing (brief flash only)
  if (status === "loading") {
    return null;
  }

  // If no session, redirect to platform for sign-in
  if (status === "unauthenticated" || !session?.user) {
    // Check if we've already tried to redirect (prevent infinite loop if platform is offline)
    const hasRedirected = sessionStorage.getItem('auth-redirect-attempted');

    if (!hasRedirected) {
      // Mark that we've attempted redirect
      sessionStorage.setItem('auth-redirect-attempted', 'true');

      // Redirect to platform sign-in page with full callback URL preserved
      const captifyUrl = process.env.NEXT_PUBLIC_CAPTIFY_URL!;
      const callbackUrl = encodeURIComponent(window.location.href);

      // Redirect to platform's NextAuth signin with callbackUrl
      // This ensures the callback is preserved through the auth flow
      window.location.href = `${captifyUrl}/api/auth/signin?callbackUrl=${callbackUrl}`;
      return null; // Show nothing while redirecting
    }

    // If we've already tried to redirect, show an error message instead
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center max-w-md p-6">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-muted-foreground mb-6">
            Unable to connect to the authentication server. Please check that the Captify platform is running.
          </p>
          <button
            onClick={() => {
              sessionStorage.removeItem('auth-redirect-attempted');
              window.location.reload();
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Use the CAPTURED session - prevents re-renders when session updates
  return (
    <CaptifyProvider session={capturedSession}>
      <CaptifyLayout
        config={memoizedConfig}
        session={capturedSession}
      >
        <HashRouter contentMap={contentMap} defaultPage="insights" />
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
          refetchWhenOffline={false}
        >
          <LayoutContent>{children}</LayoutContent>
        </SessionProvider>
      </body>
    </html>
  );
}
