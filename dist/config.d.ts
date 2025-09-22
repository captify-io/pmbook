export declare const config: {
    slug: string;
    appName: string;
    version: string;
    identityPoolId: string;
    agentId: string;
    agentAliasId: string;
    description: string;
    menu: ({
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
    platform: {
        deployment: {
            dev: string;
            staging: string;
            production: string;
        };
    };
};
export declare const slug: string, description: string, menu: ({
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
})[], appName: string, version: string, identityPoolId: string, agentId: string, agentAliasId: string, platform: {
    deployment: {
        dev: string;
        staging: string;
        production: string;
    };
};
export default config;
