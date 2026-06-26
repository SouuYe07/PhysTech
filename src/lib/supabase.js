import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jorcwurrvmftjamwwwxe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcmN3dXJydm1mdGphbXd3d3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzOTc3MTYsImV4cCI6MjA5Nzk3MzcxNn0.5MyswB8jEMWWhFHKQYqYZsdXl-MrKXWSnfBLScwa7aU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getSessionChannel = (sessionId) => 
    supabase.channel(`session:${sessionId}`);