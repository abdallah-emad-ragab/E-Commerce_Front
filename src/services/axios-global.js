import axios from 'axios';

const SUPABASE_BASE_URL = 'https://hegoujbuhlhpxyvxnhma.supabase.co/rest/v1';
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZ291amJ1aGxocHh5dnhuaG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMjIxODIsImV4cCI6MjA5NDU5ODE4Mn0.w10gMWF2CCFLT4plMckNPTYC20F3yGuaMIaRwvZj77E";

// Create a custom axios instance with Supabase configuration
const axiosInstance = axios.create({
    baseURL: SUPABASE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add Prefer header for mutations that should return the created/updated record
        if ((config.method === 'post' || config.method === 'patch' || config.method === 'put') && config.data) {
            config.headers['Prefer'] = 'return=representation';
            
            // Wrap single objects in an array for Supabase
            if (!Array.isArray(config.data)) {
                config.data = [config.data];
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors consistently
        if (error.response) {
            // Server responded with error status
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            // Request made but no response
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