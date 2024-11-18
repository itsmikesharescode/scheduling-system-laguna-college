import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/types/database/database.types';

type Students = Database['public']['Tables']['students_tb']['Row'];
export const getAssignableStudents = async (
  supabase: SupabaseClient | undefined,
  userId: string
) => {
  if (!supabase) return null;

  const { data, error } = (await supabase.rpc('admin_get_assignable_students', {
    teacher_id: userId
  })) as PostgrestSingleResponse<Students[]>;

  if (error) return null;
  return data;
};
