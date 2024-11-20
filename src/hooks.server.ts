import { i18n } from '$lib/i18n';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { PRIVATE_SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

  event.locals.supabaseAdmin = createServerClient(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        getAll: () => event.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            event.cookies.set(name, value, { ...options, path: '/' });
          });
        }
      }
    }
  );

  event.locals.safeGetSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    if (!session) {
      return { session: null, user: null };
    }

    const {
      data: { user },
      error
    } = await event.locals.supabase.auth.getUser();
    if (error) {
      return { session: null, user: null };
    }

    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;
  const path = event.url.pathname;

  if (!user && path.startsWith('/admin')) redirect(303, '/');
  if (!user && path.startsWith('/teacher')) redirect(303, '/');
  if (!user && path.startsWith('/student')) redirect(303, '/');

  if (user && path === '/') {
    const { role } = user.user_metadata;
    if (role === 'admin') redirect(303, '/admin');
    if (role === 'teacher') redirect(303, '/teacher');
    if (role === 'student') redirect(303, '/student');
  }

  if (user && path.startsWith('/admin')) {
    const { role } = user.user_metadata;
    if (role !== 'admin') redirect(303, '/');
  }

  if (user && path.startsWith('/teacher')) {
    const { role } = user.user_metadata;
    if (role !== 'teacher') redirect(303, '/');
  }

  if (user && path.startsWith('/student')) {
    const { role } = user.user_metadata;
    if (role !== 'student') redirect(303, '/');
  }

  return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard, i18n.handle());
