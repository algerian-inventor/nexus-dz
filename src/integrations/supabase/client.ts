import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env, isSupabaseConfigured } from '@/lib/env';
import type { Database } from './types';

/**
 * NEXUS DZ Supabase Client
 *
 * Returns a strongly-typed Supabase client ONLY when valid environment credentials
 * are provided in `.env.local`. Never invents or hardcodes fake credentials.
 */
export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export function getSupabaseStatus() {
  return {
    configured: isSupabaseConfigured,
    urlProvided: Boolean(env.VITE_SUPABASE_URL),
    anonKeyProvided: Boolean(env.VITE_SUPABASE_ANON_KEY),
    targetWilaya: env.VITE_APP_DEFAULT_WILAYA,
    buckets: {
      evidence: env.VITE_SUPABASE_EVIDENCE_BUCKET,
      organizationDocs: env.VITE_SUPABASE_ORG_DOCS_BUCKET,
      avatars: env.VITE_SUPABASE_AVATARS_BUCKET,
    },
  };
}
