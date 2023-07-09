import { storeUsers } from '../data/users';
import { registerUser } from '../session.server';

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');
  const user = { username, password };
  storeUsers(user);
  console.log(username, password);
  await registerUser(request, username);

  return null;
}

const RegisterPage = () => {
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
    </div>
  );
};

export default RegisterPage;
