import { loginAuth } from 'services';

const login = async ({ set }, credentials) => {
  await loginAuth(credentials);
};

export default login;
