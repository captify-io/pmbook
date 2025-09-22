import React from "react";
export interface PageRouterProps {
    href: string;
    fallback?: React.ReactNode;
}
declare const PageRouter: React.FC<PageRouterProps>;
export default PageRouter;
