export declare function getServiceCatalog(session: any): Promise<any[]>;
export declare function getServiceRequests(status?: string, session?: any): Promise<any[]>;
export declare function submitServiceRequest(request: any, session: any): Promise<any>;
export declare function approveServiceRequest(requestId: string, session: any): Promise<any>;
