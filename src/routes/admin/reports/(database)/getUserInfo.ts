import type { Database } from '$lib/types/database/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const getUserInfo = async (supabase: SupabaseClient<Database>, params: string) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('users_tb')
    .select('*')
    .eq('user_id', params)
    .single();

  if (error) return null;
  return data;
};
