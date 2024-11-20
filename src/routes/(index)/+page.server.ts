import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { forgotPwdSchema, loginSchema } from './components/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    loginForm: await superValidate(zod(loginSchema)),
    forgotPwdForm: await superValidate(zod(forgotPwdSchema))
  };
};

export const actions: Actions = {
  loginEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(loginSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabase.auth.signInWithPassword(form.data);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Login successful' };
  },

  forgotPwdEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(forgotPwdSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabase.auth.resetPasswordForEmail(form.data.email);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Password reset email sent' };
  }
};
