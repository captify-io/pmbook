"use client";

import { useState, useEffect, Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import { ClientCaptifyLayout } from "@captify-io/platform/components";
import { registeredApps } from "./pages";
import { menu as menuConfig } from "../config";
import "./globals.css";

interface CaptifyLayoutProps {
  children: React.ReactNode;
  params?: Promise<{ captify: string[] }> | { captify: string[] };
}

export default function CaptifyPageLayout({
  children,
  params,
}: CaptifyLayoutProps) {
  const [currentHash, setCurrentHash] = useState("home");
  const [PageComponent, setPageComponent] = useState<any>(null);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "home";
      setCurrentHash(hash);
      loadComponent(hash);
    };

    // Load initial component
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const loadComponent = async (hash: string) => {
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
    }
  };

  const handleMenuClick = (item: any) => {
    if (item.id) {
      // Set hash to trigger component change
      window.location.hash = item.id;
    }
  };

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ClientCaptifyLayout
            packageName="pmbook"
            menuItems={menuConfig}
            onMenuClick={handleMenuClick}
          >
            <div className="flex-1 p-6">
              {/* Test element to verify Tailwind is working */}
              <div className="bg-red-500 text-white p-4 mb-4 rounded">
                Tailwind Test: This should be red background with white text
              </div>
              {PageComponent ? (
                <Suspense fallback={<div className="text-blue-500">Loading...</div>}>
                  <PageComponent />
                </Suspense>
              ) : (
                <div className="text-green-500">Loading page...</div>
              )}
            </div>
            {children}
          </ClientCaptifyLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
