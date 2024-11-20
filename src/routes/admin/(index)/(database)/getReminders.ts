import type { Database } from '$lib/types/database/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const getReminders = async (supabase: SupabaseClient<Database>, user_id: string) => {
  if (!supabase) return null;

  const { data, error } = await supabase.from('reminders_tb').select('*').eq('user_id', user_id);

  if (error) return null;
  return data;
};
