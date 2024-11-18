import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/types/database/database.types';

export const getTeachers = async (supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from('teachers_tb')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) return null;
  return data;
};
