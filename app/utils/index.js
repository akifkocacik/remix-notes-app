import { redirect } from '@remix-run/node';
import { commitSession } from '../session.server';

export function unauthorizedRedirect(request) {
  const url = new URL(request.url);
  const redirectTo = url.pathname;
  const target = `/auth/login?redirectTo=${redirectTo}`;
  throw redirect(target);
}

export async function safeRedirect(redirectTo, session) {
  // if redirectTo is null, set it to "/";
  let target = redirectTo || '/';
  // if redirectTo doesn't start with "/" append "/" to the start
  if (!target.startsWith('/')) target = '/' + target;
  // then throw redirect
  throw redirect(target, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

// graphql`
//   searchType: "SALE",
//   propertyType: "Flat",
// `

// resolve(
//   {
//     searchType: db.rawQuery("select * from blabla where searchType = 'SALE'")
//   }
// )
