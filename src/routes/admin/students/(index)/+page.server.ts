import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from '../../../(index)/$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addStudentSchema } from './components/AddStudent/schema';
import { fail } from '@sveltejs/kit';
import { updateStudentSchema } from './components/UpdateStudent/schema';
import { getStudents } from '../(database)/getStudents';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  /* const { data, error } = await supabase.auth.signInWithPassword({
    email: 'localadmin@gmail.com',
    password: '12345678'
  });

  console.log(data, error?.message); */

  return {
    addStudentForm: await superValidate(zod(addStudentSchema)),
    updateStudentForm: await superValidate(zod(updateStudentSchema)),
    streamStudents: getStudents(supabase)
  };
};

export const actions: Actions = {
  addStudentEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const form = await superValidate(request, zod(addStudentSchema));

    if (!form.valid) return fail(400, { form });

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: form.data.email,
      password: form.data.password,
      email_confirm: true,
      user_metadata: {
        role: 'student',
        studentId: form.data.studentId,
        email: form.data.email,
        firstName: form.data.firstName,
        middleName: form.data.middleName,
        lastName: form.data.lastName,
        gender: form.data.gender,
        yearLevel: form.data.yearLevel,
        course: form.data.course,
        sections: form.data.sections,
        subjects: form.data.subjects
      }
    });

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Student account created.' };
  },

  updateStudentEvent: async ({ request, locals: { supabaseAdmin } }) => {
    const form = await superValidate(request, zod(updateStudentSchema));
    if (!form.valid) return fail(400, { form });

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(form.data.userId, {
      email: form.data.email,
      password: form.data.password,
      user_metadata: {
        fullName: `${form.data.lastName}, ${form.data.firstName}, ${form.data.middleName}`,
        ...form.data
      }
    });

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Student account updated.' };
  },

  deleteStudentEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const formData = await request.formData();
    const userId = formData.get('userId') as string;

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) return fail(401, { msg: error.message });

    return { msg: 'Student account deleted.' };
  }
};
