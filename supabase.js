import { createClient } from "@supabase/supabase-js";
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseURL, supabaseAnonKey)
//This code imports the createClient, creates a Supabase client instance using the SupabaseURL and anonymous key from env variables, and export the client instance.