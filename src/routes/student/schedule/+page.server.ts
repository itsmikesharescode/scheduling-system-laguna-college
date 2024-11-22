import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { reportIssueSchema } from './components/schema';
import { fail } from '@sveltejs/kit';
import type { User } from '@supabase/supabase-js';
import { generateReferenceId } from '$lib';

export const load: PageServerLoad = async () => {
  return {
    reportIssueForm: await superValidate(zod(reportIssueSchema))
  };
};

export const actions: Actions = {
  reportIssueEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(reportIssueSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabase.from('reports_tb').insert([
      {
        reference_id: generateReferenceId(),
        user_id: form.data.user_id,
        reporter_id: form.data.reporter_id,
        status: 'pending',
        message: form.data.msg
      }
    ]);

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Report submitted.' };
  }
};
