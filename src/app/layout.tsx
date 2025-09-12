"use client";

import React, { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { HashContext } from "./hooks/useHashContext";
import "./globals.css";

interface CaptifyLayoutProps {
  children: React.ReactNode;
  params?: Promise<{}>;
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
            {children}
          </HashContext.Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
