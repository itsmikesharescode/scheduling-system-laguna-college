import { fail } from '@sveltejs/kit';
import { getReports } from '../(database)/getReports';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
  return {
    getReports: getReports(supabase, user?.id ?? '')
  };
};

export const actions: Actions = {
  deleteReportEvent: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const { error } = await supabase.from('reports_tb').delete().eq('id', Number(id));

    if (error) return fail(401, { msg: error.message });
    return { msg: 'Report deleted successfully' };
  }
};
