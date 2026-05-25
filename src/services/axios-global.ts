import axios from 'axios';
import type { AxiosInstance } from 'axios';

const SUPABASE_BASE_URL: string = 'https://hegoujbuhlhpxyvxnhma.supabase.co/rest/v1';
const SUPABASE_ANON_KEY: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZ291amJ1aGxocHh5dnhuaG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMjIxODIsImV4cCI6MjA5NDU5ODE4Mn0.w10gMWF2CCFLT4plMckNPTYC20F3yGuaMIaRwvZj77E";

// Create a custom axios instance with Supabase configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: SUPABASE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: any) => {
    if (!config || !config.headers) return config;

    // Add Prefer header for mutations that should return the created/updated record
    const method = (config.method || '').toLowerCase();
    if ((method === 'post' || method === 'patch' || method === 'put') && (config.data !== undefined)) {
      config.headers['Prefer'] = 'return=representation';

      // Wrap single objects in an array for Supabase when needed
      if (!Array.isArray(config.data)) {
        // Only wrap plain objects (not strings, numbers, FormData)
        if (typeof config.data === 'object' && !(config.data instanceof FormData)) {
          config.data = [config.data] as any;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Also set defaults on the default axios instance for backward compatibility
axios.defaults.baseURL = SUPABASE_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['apikey'] = SUPABASE_ANON_KEY;
axios.defaults.headers.common['Authorization'] = `Bearer ${SUPABASE_ANON_KEY}`;

export default axiosInstance;
export { axiosInstance };
