export declare const config: {
    slug: string;
    appName: string;
    version: string;
    identityPoolId: string;
    agentId: string;
    agentAliasId: string;
    description: string;
    requiredGroups: string[];
    menu: {
        id: string;
        label: string;
        icon: string;
        order: number;
        description: string;
        children: ({
            id: string;
            label: string;
            href: string;
            icon: string;
            order: number;
            description: string;
            requiredGroups?: undefined;
        } | {
            id: string;
            label: string;
            href: string;
            icon: string;
            order: number;
            description: string;
            requiredGroups: string[];
        })[];
    }[];
    platform: {
        deployment: {
            dev: string;
            staging: string;
            production: string;
        };
    };
};
export declare const slug: string, description: string, menu: {
    id: string;
    label: string;
    icon: string;
    order: number;
    description: string;
    children: ({
        id: string;
        label: string;
        href: string;
        icon: string;
        order: number;
        description: string;
        requiredGroups?: undefined;
    } | {
        id: string;
        label: string;
        href: string;
        icon: string;
        order: number;
        description: string;
        requiredGroups: string[];
    })[];
}[], appName: string, version: string, identityPoolId: string, agentId: string, agentAliasId: string, platform: {
    deployment: {
        dev: string;
        staging: string;
        production: string;
    };
}, requiredGroups: string[];
export default config;
