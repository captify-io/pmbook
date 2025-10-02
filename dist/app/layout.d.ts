import React from "react";
import "./globals.css";
interface CaptifyPageLayoutProps {
    children: React.ReactNode;
    params?: Promise<{}>;
}
export default function CaptifyPageLayout({ children, params, }: CaptifyPageLayoutProps): React.JSX.Element;
export {};
