export declare class CaptifyClient {
    get<T>(endpoint: string): Promise<T>;
    post<T>(endpoint: string, data: any): Promise<T>;
    put<T>(endpoint: string, data: any): Promise<T>;
    delete<T>(endpoint: string): Promise<T>;
    getContracts(): Promise<unknown>;
    getPerformanceMetrics(): Promise<unknown>;
    getInsights(): Promise<unknown>;
    getPeople(): Promise<unknown>;
    getTickets(): Promise<unknown>;
    healthCheck(): Promise<{
        status: string;
        instance: string;
        baseURL: string;
        error?: undefined;
    } | {
        status: string;
        instance: string;
        baseURL: string;
        error: string;
    }>;
}
export declare const captifyClient: CaptifyClient;
export default captifyClient;
