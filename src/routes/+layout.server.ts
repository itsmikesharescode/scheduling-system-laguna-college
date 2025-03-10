import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({
  locals: { safeGetSession, supabaseAdmin },
  cookies
}) => {
  const { session } = await safeGetSession();

  /* const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    '0d998a8d-c812-4a9f-8465-a337e25bb354',
    {
      user_metadata: {
        role: 'admin',
        firstname: 'Admin',
        lastname: 'Admin',
        email: 'localadmin@gmail.com'
      }
    }
  );

  console.log(data, error?.message); */

  return {
    session,
    cookies: cookies.getAll()
  };
};
