import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserInfo } from '../(database)/getUserInfo';
import { updateReportSchema } from './schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  const user_id = url.searchParams.get('user_id');
  if (!user_id) redirect(303, '/admin/reports');

  return {
    updateUserInfoForm: await superValidate(zod(updateReportSchema)),
    getUserInfo: getUserInfo(supabase, user_id)
  };
};

export const actions: Actions = {
  updateScheduleEvent: async ({ request, locals: { supabaseAdmin } }) => {
    const form = await superValidate(request, zod(updateReportSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabaseAdmin.auth.admin.updateUserById(form.data.user_id, {
      user_metadata: {
        sections: form.data.sections,
        subjects: form.data.subjects
      }
    });

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Report updated successfully' };
  }
};
