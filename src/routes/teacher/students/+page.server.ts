import { getTeacherStudents } from './(database)/getTeacherStudents';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
  return {
    getTeacherStudents: getTeacherStudents(supabase, user?.id ?? '')
  };
};
