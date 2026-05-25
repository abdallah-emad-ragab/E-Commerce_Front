import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hegoujbuhlhpxyvxnhma.supabase.co';
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZ291amJ1aGxocHh5dnhuaG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMjIxODIsImV4cCI6MjA5NDU5ODE4Mn0.w10gMWF2CCFLT4plMckNPTYC20F3yGuaMIaRwvZj77E";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
