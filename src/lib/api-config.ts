// Custom API configuration for Captify instance
export const apiConfig = {
  baseURL: process.env.CAPTIFY_API_URL || 'http://localhost:3000/api',
  accessCode: process.env.CAPTIFY_ACCESS_CODE || '',
  accessKey: process.env.CAPTIFY_ACCESS_KEY || '',
  instanceName: process.env.CAPTIFY_INSTANCE_NAME || 'pmbook',
  
  // Headers to include with API requests
  getHeaders: () => ({
    'Content-Type': 'application/json',
    'X-Access-Code': process.env.CAPTIFY_ACCESS_CODE || '',
    'X-Access-Key': process.env.CAPTIFY_ACCESS_KEY || '',
    'X-Instance': process.env.CAPTIFY_INSTANCE_NAME || 'pmbook',
  }),
  
  // Complete API endpoint builder
  getEndpoint: (path: string) => {
    const baseURL = process.env.CAPTIFY_API_URL || 'http://localhost:3000/api';
    return `${baseURL}${path.startsWith('/') ? path : `/${path}`}`;
  },
};

// Custom fetch wrapper that includes auth headers
export const captifyFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = apiConfig.getEndpoint(endpoint);
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...apiConfig.getHeaders(),
      ...options.headers,
    },
  };
  
  return fetch(url, config);
};

export default apiConfig;