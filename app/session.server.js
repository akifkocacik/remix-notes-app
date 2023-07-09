import { createCookieSessionStorage, redirect } from '@remix-run/node'; // or cloudflare/deno

const { getSession, commitSession, destroySession } =
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
  return userSession;
}

export async function loginUser(request, username) {
  const session = await getSession(request.headers.get('Cookie'));
  session.set('username', username);
  throw redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}