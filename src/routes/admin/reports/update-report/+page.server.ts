import { redirect } from '@sveltejs/kit';
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
