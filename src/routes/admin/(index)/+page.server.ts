import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addReminderSchema } from './components/AddReminder/schema';
import { getReminders } from './(database)/getReminders';
import { getDashboardCounts } from './(database)/getDashboardCounts';

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
  return {
    addReminderForm: await superValidate(zod(addReminderSchema)),
    getReminders: getReminders(supabase, user?.id ?? ''),
    getDashboardCounts: getDashboardCounts(supabase)
  };
};

export const actions: Actions = {
  addReminderEvent: async ({ request, locals: { supabase, user } }) => {
    const form = await superValidate(request, zod(addReminderSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabase.from('reminders_tb').insert([
      {
        user_id: user?.id,
        title: form.data.title,
        time: form.data.time
      }
    ]);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Reminder added successfully' };
  },

  deleteReminderEvent: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const userId = formData.get('userId') as string;

    const { error } = await supabase
      .from('reminders_tb')
      .delete()
      .match({ id: Number(id), user_id: userId });

    if (error) return fail(401, { msg: error.message });
    return { msg: 'Reminder deleted successfully' };
  }
};
