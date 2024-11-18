import { getTeacherStudents } from '../(database)/getTeacherStudents';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  return {
    getTeacherStudents: getTeacherStudents(supabase, url.searchParams.get('user_id') as string)
  };
};
