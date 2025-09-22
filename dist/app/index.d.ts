/**
 * @captify/pmbook - App Module
 *
 * Dynamically generates page registry from config.json menu structure
 * for automatic discovery by the Captify platform.
 */
import { ComponentType } from "react";
export type NextPageComponent = ComponentType<any>;
export type PageImport = () => Promise<{
    default: NextPageComponent;
}>;
export type PageRegistry = Record<string, PageImport>;
export declare const pageRegistry: PageRegistry;
export declare const menuConfiguration: ({
    id: string;
    label: string;
    icon: string;
    order: number;
    description: string;
    group: string;
    role: string;
    children: {
        id: string;
        label: string;
        href: string;
        icon: string;
        description: string;
    }[];
} | {
    id: string;
    label: string;
    icon: string;
    order: number;
    description: string;
    children: {
        id: string;
        label: string;
        href: string;
        icon: string;
        description: string;
    }[];
    group?: undefined;
    role?: undefined;
})[];
export { config, slug, description } from "../config";
export { registeredApps } from "./pages";
