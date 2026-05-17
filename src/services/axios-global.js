import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:8000';

axios.defaults.baseURL = 'https://hegoujbuhlhpxyvxnhma.supabase.co/rest/v1';

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZ291amJ1aGxocHh5dnhuaG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMjIxODIsImV4cCI6MjA5NDU5ODE4Mn0.w10gMWF2CCFLT4plMckNPTYC20F3yGuaMIaRwvZj77E";

axios.defaults.headers.common['apikey'] = SUPABASE_ANON_KEY;
axios.defaults.headers.common['Authorization'] = `Bearer ${SUPABASE_ANON_KEY}`;

axios.interceptors.request.use((config) => {
    if ((config.method === 'post' || config.method === 'patch') && config.data && !Array.isArray(config.data)) {
        config.data = [config.data];
        config.headers['Prefer'] = 'return=representation';
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});