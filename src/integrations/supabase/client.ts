// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zisqhptitbivfegzrana.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inppc3FocHRpdGJpdmZlZ3pyYW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3ODg1MjcsImV4cCI6MjA1MTM2NDUyN30.Wp0fdzQrvxUXHBq436XvTRVf-pMDxU-Ed4vKG2qKXGE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);