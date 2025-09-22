export declare const apiConfig: {
    baseURL: string;
    accessCode: string;
    accessKey: string;
    instanceName: string;
    getHeaders: () => {
        'Content-Type': string;
        'X-Access-Code': string;
        'X-Access-Key': string;
        'X-Instance': string;
    };
    getEndpoint: (path: string) => string;
};
export declare const captifyFetch: (endpoint: string, options?: RequestInit) => Promise<Response>;
export default apiConfig;
