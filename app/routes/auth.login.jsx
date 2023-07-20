import { redirect } from '@remix-run/node';
import { findUser } from '../data/users';
import { getCurrentUser, loginUser } from '../session.server';
import { useActionData } from '@remix-run/react';

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');
  const userInDb = await findUser(username);
  if (!userInDb) {
    return {
      error: {
        message: 'Username not found',
      },
      fields: {
        username,
        password,
      },
    };
  }

  if (userInDb.password !== password) {
    return {
      error: {
        message: 'Wrong password.',
      },
      fields: {
        username,
        password,
      },
    };
  }

  return await loginUser(request, userInDb.username);
}
export async function loader({ request }) {
  const user = await getCurrentUser(request);

  if (user) {
    throw redirect('/');
  }
  return null;
}

const LoginPage = () => {
  const data = useActionData();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>Login</h1>
      <div>
        <form method="post">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            defaultValue={data?.fields?.username}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            defaultValue={data?.fields?.password}
          />
          <br />
          <button type="submit">Button</button>
        </form>
      </div>
      {JSON.stringify(data?.error)}
    </div>
  );
};

export default LoginPage;
