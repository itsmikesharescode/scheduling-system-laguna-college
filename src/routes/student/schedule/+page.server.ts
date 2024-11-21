import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { reportIssueSchema } from './components/schema';
import { fail } from '@sveltejs/kit';
import type { User } from '@supabase/supabase-js';

export const load: PageServerLoad = async () => {
  return {
    reportIssueForm: await superValidate(zod(reportIssueSchema))
  };
};

export const actions: Actions = {
  reportIssueEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(reportIssueSchema));

    if (!form.valid) return fail(400, { form });

    const userData = JSON.parse(form.data.userObj) as User;

    const { error } = await supabase.from('reports_list_tb').insert([
      {
        user_id: userData.id,
        msg: form.data.msg
      }
    ]);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Report submitted.' };
  }
};
