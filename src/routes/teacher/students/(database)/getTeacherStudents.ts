import type { Database } from '$lib/types/database/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const getTeacherStudents = async (supabase: SupabaseClient<Database>, teacherId: string) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('assigned_students_tb')
    .select('*, students_tb(*)')
    .eq('teacher_id', teacherId);

  if (error) return null;
  return data;
};
