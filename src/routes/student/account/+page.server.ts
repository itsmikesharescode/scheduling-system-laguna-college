import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { updateEmailSchema, updateInfoSchema, updatePwdSchema } from './_components/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    updateInfoForm: await superValidate(zod(updateInfoSchema)),
    updateEmailForm: await superValidate(zod(updateEmailSchema)),
    updatePwdForm: await superValidate(zod(updatePwdSchema))
  };
};

export const actions: Actions = {
  updateInfoEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updateInfoSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabase.auth.updateUser({
      data: {
        fullname: form.data.fullname
      }
    });

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Information updated.' };
  },

  updateEmailEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updateEmailSchema));

    if (!form.valid) return fail(400, { form });
    const { error } = await supabase.auth.updateUser({
      email: form.data.email
    });

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: `We have sent a confirmation to ${form.data.email} kindly check.` };
  },

  updatePwdEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updatePwdSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabase.auth.updateUser({
      password: form.data.newPwd
    });

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Password updated.' };
  }
};
