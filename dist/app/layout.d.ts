import React from "react";
import "./globals.css";
interface CaptifyLayoutProps {
    children: React.ReactNode;
    params?: Promise<{}>;
}
export default function CaptifyPageLayout({ children, params, }: CaptifyLayoutProps): React.JSX.Element;
export {};
