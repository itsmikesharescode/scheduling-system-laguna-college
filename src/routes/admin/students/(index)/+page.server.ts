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
  addStudentEvent: async ({ request }) => {
    const form = await superValidate(request, zod(addStudentSchema));

    if (!form.valid) return fail(400, { form });
    console.log(form.data);
  },

  updateStudentEvent: async ({ request }) => {
    const form = await superValidate(request, zod(updateStudentSchema));
    if (!form.valid) return fail(400, { form });
  }
};
