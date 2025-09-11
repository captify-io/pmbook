import { captifyFetch, apiConfig } from './api-config';

// Custom Captify API client for your instance
export class CaptifyClient {
  
  // Generic GET method
  async get<T>(endpoint: string): Promise<T> {
    const response = await captifyFetch(endpoint, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
  
  // Generic POST method
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await captifyFetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
  
  // Generic PUT method
  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await captifyFetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
  
  // Generic DELETE method
  async delete<T>(endpoint: string): Promise<T> {
    const response = await captifyFetch(endpoint, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
  
  // Specific methods for common operations
  async getContracts() {
    return this.get('/contracts');
  }
  
  async getPerformanceMetrics() {
    return this.get('/performance');
  }
  
  async getInsights() {
    return this.get('/insights');
  }
  
  async getPeople() {
    return this.get('/people');
  }
  
  async getTickets() {
    return this.get('/tickets');
  }
  
  // Health check for the configured instance
  async healthCheck() {
    try {
      const response = await captifyFetch('/health', {
        method: 'GET',
      });
      
      return {
        status: response.ok ? 'healthy' : 'unhealthy',
        instance: apiConfig.instanceName,
        baseURL: apiConfig.baseURL,
      };
    } catch (error) {
      return {
        status: 'error',
        instance: apiConfig.instanceName,
        baseURL: apiConfig.baseURL,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Export singleton instance
export const captifyClient = new CaptifyClient();
export default captifyClient;