import { fail } from '@sveltejs/kit';
import { getTeacherStudents } from '../(database)/getTeacherStudents';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  return {
    getTeacherStudents: getTeacherStudents(supabase, url.searchParams.get('user_id') as string)
  };
};

export const actions: Actions = {
  removeStudentEvent: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const studentId = formData.get('studentId') as string;

    const { error } = await supabase
      .from('assigned_students_tb')
      .delete()
      .eq('student_id', studentId);

    if (error) {
      return fail(401, { msg: error.message });
    }

    return { msg: 'Student removed successfully' };
  }
};
