import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
   * Creates a Supabase client for server-side usage.
   * Uses @supabase/supabase-js directly (no Edge Runtime issues).
   */
export function createClient() {
    return createSupabaseClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        )
}
