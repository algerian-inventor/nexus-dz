import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type VolunteerProfileRow = Database['public']['Tables']['profiles']['Row'];

export const volunteersService = {
  async listVolunteers(): Promise<{
    data: VolunteerProfileRow[];
    configured: boolean;
    error: string | null;
  }> {
    if (!supabase) {
      return { data: [], configured: false, error: null };
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('verified_hours', { ascending: false });

    return {
      data: data ?? [],
      configured: true,
      error: error ? error.message : null,
    };
  },
};
