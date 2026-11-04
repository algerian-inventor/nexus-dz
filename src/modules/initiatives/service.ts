import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type InitiativeRow = Database['public']['Tables']['initiatives']['Row'];
export type TaskRow = Database['public']['Tables']['tasks']['Row'];

export const createInitiativeSchema = z.object({
  title: z.string().min(5),
  summary: z.string().min(10),
  category: z.string().min(2),
  commune: z.string().min(2),
  target_volunteers: z.number().int().min(1),
  target_beneficiaries: z.number().int().min(0),
});

export const initiativesService = {
  async listInitiatives(): Promise<{
    data: InitiativeRow[];
    configured: boolean;
    error: string | null;
  }> {
    if (!supabase) {
      return { data: [], configured: false, error: null };
    }
    const { data, error } = await supabase
      .from('initiatives')
      .select('*')
      .order('created_at', { ascending: false });

    return {
      data: data ?? [],
      configured: true,
      error: error ? error.message : null,
    };
  },

  async listTasks(): Promise<{
    data: TaskRow[];
    configured: boolean;
    error: string | null;
  }> {
    if (!supabase) {
      return { data: [], configured: false, error: null };
    }
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    return {
      data: data ?? [],
      configured: true,
      error: error ? error.message : null,
    };
  },
};
