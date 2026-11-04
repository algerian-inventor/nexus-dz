import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type VerificationAuditRow = Database['public']['Tables']['verification_audits']['Row'];

export const verificationService = {
  async listVerificationAudits(): Promise<{
    data: VerificationAuditRow[];
    configured: boolean;
    error: string | null;
  }> {
    if (!supabase) {
      return { data: [], configured: false, error: null };
    }
    const { data, error } = await supabase
      .from('verification_audits')
      .select('*')
      .order('reviewed_at', { ascending: false });

    return {
      data: data ?? [],
      configured: true,
      error: error ? error.message : null,
    };
  },
};
