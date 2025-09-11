declare const config: {
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
declare const slug: string;
declare const description: string;
declare const menu: ({
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
declare const appName: string;
declare const version: string;
declare const identityPoolId: string;
declare const agentId: string;
declare const agentAliasId: string;
declare const platform: {
    deployment: {
        dev: string;
        staging: string;
        production: string;
    };
};

export { agentAliasId, agentId, appName, config, config as default, description, identityPoolId, menu, platform, slug, version };
