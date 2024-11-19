import type { Database } from '$lib/types/database/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const getReports = async (supabase: SupabaseClient<Database>) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('reports_tb')
    .select('*, users_tb(*)')
    .order('created_at', { ascending: true });

  if (error) return null;
  return data;
};
