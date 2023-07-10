import { redirect } from '@remix-run/node';
import { logoutUser } from '../session.server';

export async function loader({ request }) {
  console.log(request.method);
  if (request.method === 'GET') throw redirect('/');

  return null;
}

export async function action({ request }) {
  await logoutUser(request);
  return null;
}

const LogoutPage = () => {
  return null;
};

export default LogoutPage;
