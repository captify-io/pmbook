import { ComponentType } from 'react';
export { default as config, description, slug } from '../configEntry.cjs';

declare const registeredApps: Record<string, () => Promise<{
    default: any;
}>>;

/**
 * @captify/pmbook - App Module
 *
 * Dynamically generates page registry from config.json menu structure
 * for automatic discovery by the Captify platform.
 */

type NextPageComponent = ComponentType<any>;
type PageImport = () => Promise<{
    default: NextPageComponent;
}>;
type PageRegistry = Record<string, PageImport>;
declare const pageRegistry: PageRegistry;
declare const menuConfiguration: ({
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

export { type NextPageComponent, type PageImport, type PageRegistry, menuConfiguration, pageRegistry, registeredApps };
