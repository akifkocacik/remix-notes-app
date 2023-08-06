import { createUser } from '../services/user.service';
import { registerUser } from '../session.server';
import { useActionData } from '@remix-run/react';

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');
  const user = { username, password };
  try {
    await createUser(user);

    await registerUser(request, username);
  } catch (e) {
    return {
      error: {
        message: 'Username already exists',
      },
    };
  }

  return null;
}

const RegisterPage = () => {
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
      <h1>Register</h1>
      <div>
        <form method="post">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <br />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <br />
          <button type="submit">Button</button>
        </form>
      </div>
      {JSON.stringify(data?.error)}
    </div>
  );
};

export default RegisterPage;
