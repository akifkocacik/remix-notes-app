import { createCookieSessionStorage, redirect } from '@remix-run/node'; // or cloudflare/deno
import { safeRedirect } from './utils';

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the same CookieOptions to create one
    cookie: {
      name: '__session',
      secrets: ['r3m1xr0ck5'],
      sameSite: 'lax',
    },
  });

export async function registerUser(request, username) {
  const session = await getSession(request.headers.get('Cookie'));
  session.set('username', username);
  throw redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function getCurrentUser(request) {
  const session = await getSession(request.headers.get('Cookie'));
  const userSession = session.get('username');
  return userSession || null;
}

export async function loginUser(request, username) {
  let params = new URL(request.url).searchParams;
  let redirectTo = params.get('redirectTo');
  const session = await getSession(request.headers.get('Cookie'));
  session.set('username', username);
  await safeRedirect(redirectTo, session);
}

export async function logoutUser(request) {
  const session = await getSession(request.headers.get('Cookie'));
  session.set('username');
  throw redirect('/auth/login', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}
