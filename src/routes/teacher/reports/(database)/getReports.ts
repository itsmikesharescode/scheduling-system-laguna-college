import type { Database } from '$lib/types/database/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const getReports = async (supabase: SupabaseClient<Database>, userId: string) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('reports_tb')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) return null;
  return data;
};
