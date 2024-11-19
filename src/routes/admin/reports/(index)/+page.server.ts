import { getReports } from '../(database)/getReports';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  return {
    getReports: getReports(supabase)
  };
};

export const actions: Actions = {};
