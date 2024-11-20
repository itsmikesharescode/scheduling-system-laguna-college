import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

export const getDashboardCounts = async (supabase: SupabaseClient) => {
  const { data, error } = (await supabase.rpc('get_dashboard_counts')) as PostgrestSingleResponse<{
    student_count: number;
    teacher_count: number;
    report_count: number;
  }>;

  if (error) return null;
  return data;
};
