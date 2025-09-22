"use client";

import React, { Suspense, useMemo } from "react";
import { pageRegistry } from "../app";

// Page router component props
export interface PageRouterProps {
  href: string;
  fallback?: React.ReactNode;
}

// Main page router component
const PageRouter: React.FC<PageRouterProps> = ({ href, fallback }) => {
  const PageComponent = useMemo(() => {
    const pageImport = pageRegistry[href];
    if (!pageImport) {
      return () => React.createElement("div", null, `Page not found: ${href}`);
    }

    return React.lazy(pageImport);
  }, [href]);

  return React.createElement(
    Suspense,
    { fallback: fallback || null },
    React.createElement(PageComponent)
  );
};

export default PageRouter;