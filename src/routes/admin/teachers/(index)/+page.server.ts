import { fail, superValidate } from 'sveltekit-superforms';
import { addTeacherSchema } from './components/AddTeacher/schema';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { updateTeacherSchema } from './components/UpdateTeacher/schema';

export const load: PageServerLoad = async () => {
  return {
    addTeacherForm: await superValidate(zod(addTeacherSchema)),
    updateTeacherForm: await superValidate(zod(updateTeacherSchema))
  };
};

export const actions: Actions = {
  addTeacherEvent: async ({ request }) => {
    const form = await superValidate(request, zod(addTeacherSchema));
    if (!form.valid) return fail(400, { form });

    console.log(form.data);

    return { form };
  },
  updateTeacherEvent: async ({ request }) => {
    const form = await superValidate(request, zod(updateTeacherSchema));
    if (!form.valid) return fail(400, { form });

    console.log(form.data);

    return { form };
  }
};
