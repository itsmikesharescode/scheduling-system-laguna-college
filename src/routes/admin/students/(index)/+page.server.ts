import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from '../../../(index)/$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addStudentSchema } from './components/AddStudent/schema';
import { fail } from '@sveltejs/kit';
import { updateStudentSchema } from './components/UpdateStudent/schema';

export const load: PageServerLoad = async () => {
  return {
    addStudentForm: await superValidate(zod(addStudentSchema)),
    updateStudentForm: await superValidate(zod(updateStudentSchema))
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
        fullName: `${form.data.lastName}, ${form.data.firstName} ${form.data.middleName}`,
        gender: form.data.gender,
        password: form.data.password,
        yearLevel: form.data.yearLevel,
        course: form.data.course,
        sections: form.data.sections,
        subjects: form.data.subjects
      }
    });

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Student account created.' };
  },

  updateStudentEvent: async ({ request }) => {
    const form = await superValidate(request, zod(updateStudentSchema));
    if (!form.valid) return fail(400, { form });
  }
};
