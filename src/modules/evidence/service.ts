import { env } from '@/lib/env';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type EvidenceRecordRow = Database['public']['Tables']['evidence_records']['Row'];

export const evidenceService = {
  getTargetBucket() {
    return env.VITE_SUPABASE_EVIDENCE_BUCKET;
  },

  async listEvidenceRecords(): Promise<{
    data: EvidenceRecordRow[];
    configured: boolean;
    error: string | null;
  }> {
    if (!supabase) {
      return { data: [], configured: false, error: null };
    }
    const { data, error } = await supabase
      .from('evidence_records')
      .select('*')
      .order('created_at', { ascending: false });

    return {
      data: data ?? [],
      configured: true,
      error: error ? error.message : null,
    };
  },
};
