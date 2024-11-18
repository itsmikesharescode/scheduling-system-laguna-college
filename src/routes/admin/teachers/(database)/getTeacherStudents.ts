import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/types/database/database.types';

export const getTeacherStudents = async (supabase: SupabaseClient<Database>, userId: string) => {
  const { data, error } = await supabase
    .from('students_tb')
    .select('*')
    .eq('teacher_id', userId)
    .order('created_at', { ascending: true });

  if (error) return null;
  return data;
};
