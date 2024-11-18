import { fail, superValidate } from 'sveltekit-superforms';
import { addTeacherSchema } from './components/AddTeacher/schema';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { updateTeacherSchema } from './components/UpdateTeacher/schema';
import { getTeachers } from '../(database)/getTeachers';
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  return {
    addTeacherForm: await superValidate(zod(addTeacherSchema)),
    updateTeacherForm: await superValidate(zod(updateTeacherSchema)),
    getTeachers: getTeachers(supabase)
  };
};

export const actions: Actions = {
  addTeacherEvent: async ({ request, locals: { supabaseAdmin } }) => {
    const form = await superValidate(request, zod(addTeacherSchema));
    if (!form.valid) return fail(400, { form });

    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: form.data.email,
      password: form.data.password,
      email_confirm: true,
      user_metadata: {
        role: 'teacher',
        ...form.data
      }
    });

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Teacher account created successfully' };
  },
  updateTeacherEvent: async ({ request, locals: { supabaseAdmin } }) => {
    const form = await superValidate(request, zod(updateTeacherSchema));
    if (!form.valid) return fail(400, { form });
    const { error } = await supabaseAdmin.auth.admin.updateUserById(form.data.userId, {
      email: form.data.email,
      user_metadata: {
        role: 'teacher',
        ...form.data
      }
    });

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Teacher account updated successfully' };
  },

  deleteTeacherEvent: async ({ request, locals: { supabaseAdmin } }) => {
    const formData = await request.formData();
    const userId = formData.get('userId') as string;

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) return fail(401, { msg: error.message });

    return { msg: 'Teacher account deleted successfully' };
  }
};
