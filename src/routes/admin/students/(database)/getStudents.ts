import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/types/database/database.types';

export const getStudents = async (supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from('students_tb')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) return null;
  return data;
};
