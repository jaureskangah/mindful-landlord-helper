// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jhjhzwbvmkurwfohjxlu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impoamh6d2J2bWt1cndmb2hqeGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NDYyNjEsImV4cCI6MjA1MTIyMjI2MX0.lJVT21ew0ZZrx9QFVfOfUFWUnuD7Ts4bbYv-SlOJfEQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);