import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://cbhhulbrnlkinlkvsejx.supabase.co"

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaGh1bGJybmxraW5sa3ZzZWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwODQ3NjcsImV4cCI6MjA4NjY2MDc2N30.dDmMthx9Brrx3E0QyR1oTWfGoLo-bG_z6hSPJmF2V3E"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
