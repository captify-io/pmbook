/**
 * @captify/pmbook/services - Server-side exports
 *
 * Contains configuration and any true server-side services for the pmbook application.
 * Client-side data functions are located in data.ts files next to their respective pages.
 */
import { Contract } from "../types/contract";
export { config } from "../config";
export type * from "../types";
declare class PMBookService {
    get(endpoint: string): Promise<Contract | Contract[]>;
    post(endpoint: string, data: any): Promise<Contract>;
    put(endpoint: string, data: any): Promise<Contract>;
    delete(endpoint: string): Promise<Contract>;
    private extractIdFromEndpoint;
}
declare const pmBookService: PMBookService;
export default pmBookService;
export declare const services: {
    use(serviceName: string): {
        execute: (body: any, credentials?: any, session?: any) => Promise<{
            success: boolean;
            data: Contract | Contract[];
            error?: undefined;
        } | {
            success: boolean;
            error: string;
            data?: undefined;
        }>;
    } | null;
};
