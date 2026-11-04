import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type OrganizationRow = Database['public']['Tables']['organizations']['Row'];

export const createOrganizationSchema = z.object({
  name_ar: z.string().min(3),
  name_fr: z.string().optional(),
  registration_number: z.string().min(3),
  category: z.string().min(2),
  commune: z.string().min(2),
  description: z.string().optional(),
});

export const CONSTANTINE_COMMUNES = [
  'constantine',
  'el_khroub',
  'ali_mendjeli',
  'ain_smara',
  'hamma_bouziane',
  'didouche_mourad',
  'zighoud_youcef',
] as const;

export const organizationsService = {
  async listOrganizations(): Promise<{
    data: OrganizationRow[];
    configured: boolean;
    error: string | null;
  }> {
    if (!supabase) {
      return { data: [], configured: false, error: null };
    }
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .order('created_at', { ascending: false });

    return {
      data: data ?? [],
      configured: true,
      error: error ? error.message : null,
    };
  },
};
