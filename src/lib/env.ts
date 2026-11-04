import { z } from 'zod';

const envSchema = z.object({
  VITE_APP_NAME: z.string().default('NEXUS DZ'),
  VITE_APP_DEFAULT_LOCALE: z.enum(['ar', 'fr', 'en']).default('ar'),
  VITE_APP_DEFAULT_WILAYA: z.string().default('25 - Constantine'),
  VITE_SUPABASE_URL: z.string().optional().default(''),
  VITE_SUPABASE_ANON_KEY: z.string().optional().default(''),
  VITE_SUPABASE_EVIDENCE_BUCKET: z.string().default('initiative-evidence'),
  VITE_SUPABASE_ORG_DOCS_BUCKET: z.string().default('organization-documents'),
  VITE_SUPABASE_AVATARS_BUCKET: z.string().default('avatars'),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

export const env = parsedEnv.success
  ? parsedEnv.data
  : {
      VITE_APP_NAME: 'NEXUS DZ',
      VITE_APP_DEFAULT_LOCALE: 'ar' as const,
      VITE_APP_DEFAULT_WILAYA: '25 - Constantine',
      VITE_SUPABASE_URL: '',
      VITE_SUPABASE_ANON_KEY: '',
      VITE_SUPABASE_EVIDENCE_BUCKET: 'initiative-evidence',
      VITE_SUPABASE_ORG_DOCS_BUCKET: 'organization-documents',
      VITE_SUPABASE_AVATARS_BUCKET: 'avatars',
    };

export const isSupabaseConfigured = Boolean(
  env.VITE_SUPABASE_URL &&
  env.VITE_SUPABASE_URL.startsWith('http') &&
  env.VITE_SUPABASE_ANON_KEY &&
  env.VITE_SUPABASE_ANON_KEY.length > 20
);
