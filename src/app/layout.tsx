"use client";

import React, { useState, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { HashContext } from "./hooks/useHashContext";
import { TopNavigation } from "@captify-io/platform/components/navigation/TopNavigation";
import { FavoritesBar } from "@captify-io/platform/components/navigation/FavoritesBar";
import { appName } from "../config";
import "./globals.css";

interface CaptifyLayoutProps {
  children: React.ReactNode;
  params?: Promise<{}>;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNavigation
        session={session}
        currentApplication={{
          id: "pmbook",
          name: appName,
        }}
      />
      <FavoritesBar />
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default function CaptifyPageLayout({
  children,
  params,
}: CaptifyLayoutProps) {
  const [currentHash, setCurrentHash] = useState("home");

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "home";
      setCurrentHash(hash);
    };

    // Load initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <HashContext.Provider value={{ currentHash, setCurrentHash }}>
            <LayoutContent>{children}</LayoutContent>
          </HashContext.Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
