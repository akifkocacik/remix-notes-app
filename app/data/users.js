import fs from 'fs/promises';

export async function getStoredUsers() {
  const rawFileContent = await fs.readFile('users.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedUsers = data.users ?? [];
  return storedUsers;
}

export async function storeUsers(user) {
  const usersData = await getStoredUsers();
  const users = usersData.concat(user);

  return fs.writeFile('users.json', JSON.stringify({ users: users || [] }));
}

export async function findUser(username) {
  const users = await getStoredUsers();
  return users.find((user) => user.username === username);
}
