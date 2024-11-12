import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addReminderSchema } from './components/AddReminder/schema';

export const load: PageServerLoad = async () => {
  return {
    addReminderForm: await superValidate(zod(addReminderSchema))
  };
};

export const actions: Actions = {
  addReminderEvent: async ({ request }) => {
    const form = await superValidate(request, zod(addReminderSchema));

    if (!form.valid) return fail(400, { form });

    return { success: true };
  },

  deleteReminderEvent: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
  }
};
