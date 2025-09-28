/**
 * @captify/pmbook/services - Server-side exports
 *
 * Contains configuration and any true server-side services for the pmbook application.
 * Client-side data functions are located in data.ts files next to their respective pages.
 */

import { Contract } from "../types/contract";

// Export configuration for platform discovery (re-export from main config)
export { config } from "../config";

// Export types
export type * from "../types";

// Simple in-memory storage for demo (replace with real database)
const contracts: Contract[] = [];
let nextId = 1;

// PMBook service implementation
class PMBookService {
  async get(endpoint: string) {
    if (endpoint === '/captify-pmbook-Contract') {
      return contracts;
    }

    const contractId = this.extractIdFromEndpoint(endpoint);
    if (contractId) {
      const contract = contracts.find(c => c.id === contractId);
      if (!contract) {
        throw new Error('Contract not found');
      }
      return contract;
    }

    throw new Error('Endpoint not found');
  }

  async post(endpoint: string, data: any) {
    if (endpoint === '/captify-pmbook-Contract') {
      const contract: Contract = {
        ...data,
        id: nextId.toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      nextId++;
      contracts.push(contract);
      return contract;
    }

    throw new Error('Endpoint not found');
  }

  async put(endpoint: string, data: any) {
    const contractId = this.extractIdFromEndpoint(endpoint);
    if (contractId) {
      const index = contracts.findIndex(c => c.id === contractId);
      if (index === -1) {
        throw new Error('Contract not found');
      }

      contracts[index] = {
        ...contracts[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      return contracts[index];
    }

    throw new Error('Endpoint not found');
  }

  async delete(endpoint: string) {
    const contractId = this.extractIdFromEndpoint(endpoint);
    if (contractId) {
      const index = contracts.findIndex(c => c.id === contractId);
      if (index === -1) {
        throw new Error('Contract not found');
      }

      const deleted = contracts.splice(index, 1)[0];
      return deleted;
    }

    throw new Error('Endpoint not found');
  }

  private extractIdFromEndpoint(endpoint: string): string | null {
    const match = endpoint.match(/\/captify-pmbook-Contract\/(.+)$/);
    return match ? match[1] : null;
  }
}

// Export singleton instance
const pmBookService = new PMBookService();
export default pmBookService;

// Export services in the expected captify format
export const services = {
  use(serviceName: string) {
    switch (serviceName) {
      case 'contracts':
        return {
          execute: async (body: any, credentials?: any, session?: any) => {
            try {
              const { operation, endpoint, data } = body;

              switch (operation) {
                case 'get':
                  const result = await pmBookService.get(endpoint);
                  return { success: true, data: result };

                case 'post':
                  const created = await pmBookService.post(endpoint, data);
                  return { success: true, data: created };

                case 'put':
                  const updated = await pmBookService.put(endpoint, data);
                  return { success: true, data: updated };

                case 'delete':
                  const deleted = await pmBookService.delete(endpoint);
                  return { success: true, data: deleted };

                default:
                  return { success: false, error: `Unsupported operation: ${operation}` };
              }
            } catch (error) {
              return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
              };
            }
          }
        };

      default:
        return null;
    }
  }
};
