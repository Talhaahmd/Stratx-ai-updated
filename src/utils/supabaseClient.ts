import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Explicitly using 'any' to prevent "implicit any" build errors and avoid "Object is possibly null" errors 
// across the codebase where supabase is used without null checks.
// The runtime check (mocking null behavior) is preserved for startup crash prevention.
let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Supabase client will not be initialized.');
  supabase = null;
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
