import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/types/database/database.types';

export const getTeacherStudents = async (supabase: SupabaseClient<Database>, userId: string) => {
  const { data, error } = await supabase
    .from('assigned_students_tb')
    .select('*, students_tb(*)')
    .eq('teacher_id', userId);

  if (error) return null;
  return data;
};
